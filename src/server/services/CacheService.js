import {expireAsync, getAsync, keysAsync, mgetAsync, setAsync} from "../data/RedisClient";

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
}
