import UserClient from "../httpClients/UserClient";
import RedisClient from '../data/RedisClient';
import CacheService from "./CacheService";
export default class AccountService {

    static async getAccount(token) {
        try {
            const account = await UserClient.getAccount(token);
            return account.data;
        } catch(e) {
            if(e.data.code === 'INVALID_TOKEN' || e.status === 403) {
                RedisClient.remove(token, function(err) {
                    if(err) {
                        throw err;
                    }
                });
            }
            throw e;
        }
    }

    static async getLoggedInAccounts() {
        const keys = await CacheService.getLoggedInAccountKeys();
        return await Promise.all(keys.map( key => CacheService.getLoggedInAccount(key)));
    }
}
