import RestaurantsClient from "../httpClients/RestaurantsClient";
import { expireAsync, getAsync, hmsetAsync, setAsync } from "../data/RedisClient";

export default class RestaurantsService {

    static async getRestaurantsFromCache(point) {
        const restaurants = await getAsync(`RESTAURANTS_${point}`);
        return JSON.parse(restaurants);
    }

    static async setRestaurantsToCache(point, restaurants, ttl = 60) {
        await setAsync(`RESTAURANTS_${point}`, JSON.stringify(restaurants));
        await expireAsync(`RESTAURANTS_${point}`, ttl);
    }

    static async getRestaurants(params, restaurantsTTL) {
        await hmsetAsync(
            'SEARCH',
            params.point,
            JSON.stringify({ ...params, ttl: restaurantsTTL })
        );
        await expireAsync('SEARCH', 60 * 60);
        const cachedRestaurants = await RestaurantsService.getRestaurantsFromCache(params.point);
        if(cachedRestaurants) {
            return cachedRestaurants;
        }
        const response = await RestaurantsClient.getRestaurants(params);
        const restaurants = response.data;
        await RestaurantsService.setRestaurantsToCache(params.point, restaurants, restaurantsTTL);
        return restaurants;
    }
}
