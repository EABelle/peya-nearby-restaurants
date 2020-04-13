import UserClient from "../httpClients/UserClient";
import RedisClient, {getAsync, keysAsync} from '../data/RedisClient';
export default class UserService {

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

    static async getLoggedInAccount(key) {
        const user = await getAsync(key);
        return JSON.parse(user);
    }

    static async getLoggedInAccounts() {
        const keys = await keysAsync('USER_*');
        return await Promise.all(keys.map( key => UserService.getLoggedInAccount(key)));
    }
}
