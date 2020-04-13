import {expireAsync, getAsync, keysAsync, setAsync} from "../data/RedisClient";

export default class CacheService {

    static async getRestaurantsFromCache(point) {
        const restaurants = await getAsync(`RESTAURANTS_${point}`);
        return JSON.parse(restaurants);
    }

    static async setRestaurantsToCache(point, restaurants, ttl = 60) {
        await setAsync(`RESTAURANTS_${point}`, JSON.stringify(restaurants));
        await expireAsync(`RESTAURANTS_${point}`, ttl);
    }

    static async getLoggedInAccount(key) {
        const user = await getAsync(key);
        return JSON.parse(user);
    }

    static getLoggedInAccountKeys() {
        return keysAsync('USER_*');
    }
}
