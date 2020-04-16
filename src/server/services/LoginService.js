import LoginClient from "../httpClients/LoginClient";
import { expireAsync, setAsync } from '../data/RedisClient';
import AccountService from "./AccountService";
import AppTokenClient from "../httpClients/AppTokenClient";
import appClient from "../httpClients";
import crypto from 'crypto';
import {generateSetUserKey} from "../utils";

export default class LoginService {

    static async login(userName, password) {
        appClient.defaults.headers.Authorization = await AppTokenClient.getAppToken();
        const userToken = await LoginClient.login(userName, password);
        const user = await AccountService.getAccount(userToken);
        const encryptedToken = crypto.createHmac('sha256', userToken).digest('hex');
        const userKey = generateSetUserKey(encryptedToken, user.id);
        await setAsync(userKey, JSON.stringify(user));
        await expireAsync(userKey, 60 * 60 * 24);
        return userToken;
    }
}
