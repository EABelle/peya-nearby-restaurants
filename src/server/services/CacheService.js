import {expireAsync, getAsync, keysAsync, mgetAsync, setAsync} from "../data/RedisClient";
import crypto from "crypto";
import {generateGetUserKey, generateSetUserKey} from "../utils";

export default class CacheService {

    static async getRestaurantsFromCache(point) {
        const restaurants = await getAsync(`RESTAURANTS_${point}`);
        return JSON.parse(restaurants);
    }

    static async setRestaurantsToCache(point, restaurants, ttl = 60) {
        await setAsync(`RESTAURANTS_${point}`, JSON.stringify(restaurants));
        await expireAsync(`RESTAURANTS_${point}`, ttl);
    }

    static async getLoggedInAccounts() {
        const keys = await keysAsync('USER_*');
        const accounts = await mgetAsync(keys);
        return accounts.map(account => JSON.parse(account));
    }

    static async getUserFromCacheBySecret(token) {
        const encryptedToken = crypto.createHmac('sha256', token).digest('hex');
        const key = await generateGetUserKey(encryptedToken);
        return await getAsync(key);
    }

    static async getUserFromCacheById(userId) {
        const keys = await keysAsync(`*_${userId}`);
        if(!keys || !keys.length) {
            return null;
        }
        const key = keys[0];
        const user = await getAsync(key);
        return JSON.parse(user);
    }

    static async saveUserToCache(token, user) {
        const encryptedToken = crypto.createHmac('sha256', token).digest('hex');
        const userKey = generateSetUserKey(encryptedToken, user.id);
        await setAsync(userKey, JSON.stringify({userToken: token, ...user}));
        await expireAsync(userKey, 60 * 60 * 24);
    }
}
