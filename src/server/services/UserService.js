import UserClient from "../clients/UserClient";
import RedisClient from '../clients/RedisClient';
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

    static getLoggedInAccount(key) {
        return new Promise ((resolve, reject) =>
            RedisClient.get(key, async function(err, user) {
                if (err) {
                    reject(err);
                }
                resolve (JSON.parse(user));
            }));
    }

    static getLoggedInAccounts() {
        return new Promise ((resolve, reject) =>
            RedisClient.keys('USER_*', async function(err, keys) {
                if (err) {
                    reject(err);
                }
                const users = await Promise.all(keys.map( key => UserService.getLoggedInAccount(key)));
                resolve(users);
        }));
    }
}
