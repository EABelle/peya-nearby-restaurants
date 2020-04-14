import LoginClient from "../httpClients/LoginClient";
import { expireAsync, setAsync } from '../data/RedisClient';
import AccountService from "./AccountService";
import AppTokenClient from "../httpClients/AppTokenClient";
import appClient from "../httpClients";

export default class LoginService {

    static async login(userName, password) {
        appClient.defaults.headers.Authorization = await AppTokenClient.getAppToken();
        const userToken = await LoginClient.login(userName, password);
        const user = await AccountService.getAccount(userToken);
        await setAsync(`USER_${userToken}`, JSON.stringify({ userToken, ...user}));
        await expireAsync(`USER_${userToken}`, 60 * 60 * 24);
        return userToken;
    }
}
