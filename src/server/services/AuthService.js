import LoginClient from "../clients/LoginClient";
import redisClient from '../clients/RedisClient';
import UserService from "./UserService";

export default class AuthService {

    static async login(userName, password) {
        const userToken = await LoginClient.login(userName, password);
        const user = await UserService.getAccount(userToken);
        redisClient.set(`USER_${user.id}`, JSON.stringify({ userToken, ...user}), ((err) => {
            if(err) {
                throw err;
            }
            redisClient.expire(`USER_${user.id}`, 60 * 60 * 24, () => {
                if (err) {
                    throw (err);
                }
            });
        }));
        return userToken;
    }
}
