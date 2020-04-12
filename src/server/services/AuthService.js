import LoginClient from "../clients/LoginClient";
import redisClient from '../clients/RedisClient';
import UserService from "./UserService";

export default class AuthService {

    static async login(userName, password, appToken) {
        const userToken = await LoginClient.login(userName, password, appToken);
        const userData = await UserService.getAccount(userToken);
        await redisClient.set(`USER_${userToken}`, JSON.stringify(userData), ((err) => {
            if(err) {
                throw err;
            }
        }));
        return userToken;
    }
}
