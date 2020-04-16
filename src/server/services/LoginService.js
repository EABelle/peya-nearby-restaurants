import LoginClient from "../httpClients/LoginClient";
import {expireAsync, setAsync} from '../data/RedisClient';
import AccountService from "./AccountService";
import AppTokenClient from "../httpClients/AppTokenClient";
import crypto from 'crypto';
import {generateSetUserKey} from "../utils";
import CacheService from "./CacheService";

export default class LoginService {

    static async login(userName, password) {
        const appToken = await AppTokenClient.getAppToken();
        const userToken = await LoginClient.login(userName, password, appToken);
        const user = await AccountService.getAccount(userToken);
        const userFromCache = await CacheService.getUserFromCacheById(user.id);
        if (userFromCache) {
            console.log(userFromCache);
            return userFromCache.userToken;
        }
        await CacheService.saveUserToCache(userToken, user);
        return userToken;
    }
}
