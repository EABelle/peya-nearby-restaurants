import RestaurantsClient from "../clients/RestaurantsClient";
import redisClient from "../clients/RedisClient";

const DEFAULT_FIELDS = 'id, name, topCategories, rating, logo, deliveryTimeMaxMinutes, link, coordinates';

export default class RestaurantsService {

    static getRestaurantsFromCache(point) {
        return new Promise((resolve, reject) => {
            redisClient.get(`RESTAURANTS_${point}`, (err, restaurants) => {
                if (err) {
                    reject(err);
                }
                resolve(JSON.parse(restaurants));
            })
        });
    }

    static setRestaurantsToCache(point, restaurants, ttl = 60) {
        return new Promise((resolve, reject) => {
            redisClient.set(`RESTAURANTS_${point}`, JSON.stringify(restaurants), (err) => {
                if (err) {
                    reject(err);
                }
                redisClient.expire(`RESTAURANTS_${point}`, ttl, () => {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            })
        });
    }

    static async getRestaurants({point, offset = 0, max = 20, country = 1, fields = DEFAULT_FIELDS}, restaurantsTTL) {
        const cachedRestaurants = await RestaurantsService.getRestaurantsFromCache(point);
        if(cachedRestaurants) {
            return cachedRestaurants;
        }
        const response = await RestaurantsClient.getRestaurants({
            point,
            offset,
            max,
            country,
            fields
        });

        const restaurants = response.data;
        await RestaurantsService.setRestaurantsToCache(point, restaurants, restaurantsTTL);
        return restaurants;
    }
}
