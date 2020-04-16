import UserClient from "../httpClients/UserClient";
import CacheService from "./CacheService";
export default class AccountService {

    static async getAccount(token) {
        const account = await UserClient.getAccount(token);
        return account.data;
    }

    static async getLoggedInAccounts() {
        const sessions = await CacheService.getLoggedInAccounts();
        return sessions.map(({userToken, ...userData}) => userData);
    }
}
