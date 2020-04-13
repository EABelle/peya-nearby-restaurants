import LoginClient from "../httpClients/LoginClient";
import { expireAsync, setAsync } from '../data/RedisClient';
import AccountService from "./AccountService";

export default class LoginService {

    static async login(userName, password) {
        const userToken = await LoginClient.login(userName, password);
        const user = await AccountService.getAccount(userToken);
        await setAsync(`USER_${user.id}`, JSON.stringify({ userToken, ...user}));
        await expireAsync(`USER_${user.id}`, 60 * 60 * 24);
        return userToken;
    }
}
