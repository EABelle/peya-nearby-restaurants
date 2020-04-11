import LoginClient from "../clients/LoginClient";
import redisClient from '../clients/RedisClient';
import UserClient from "../clients/UserClient";

export default class AuthService {

    static async login(userName, password, appToken) {
        const userToken = await LoginClient.login(userName, password, appToken);
        const userData = await UserClient.getAccount(userToken);
        await redisClient.set(`USER_${userData.id}`, userToken, ((err) => {
            if(err) {
                throw err;
            }
        }));
        return userToken;
    }
}
