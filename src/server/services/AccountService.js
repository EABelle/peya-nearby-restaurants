import UserClient from "../httpClients/UserClient";
import CacheService from "./CacheService";
export default class AccountService {

    static async getAccount(token) {
        const account = await UserClient.getAccount(token);
        return account.data;
    }

    static async getLoggedInAccounts() {
        const keys = await CacheService.getLoggedInAccountKeys();
        return await Promise.all(keys.map( key => CacheService.getLoggedInAccount(key)));
    }
}
