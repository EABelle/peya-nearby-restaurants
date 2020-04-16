import RestaurantsClient from "../httpClients/RestaurantsClient";
import CacheService from "./CacheService";
import {expireAsync, hmsetAsync} from "../data/RedisClient";

const DEFAULT_FIELDS = 'id, name, topCategories, rating, logo, deliveryTimeMaxMinutes, link, coordinates, opened';
const countries = { URUGUAY: 1 };


function compareRankings(a, b) {
    const ratingA = Number(a.rating);
    const ratingB = Number(b.rating);
    if (ratingA < ratingB){
        return -1;
    }
    if (ratingA > ratingB) {
        return 1;
    }
    return 0;
}

function handleResponse(response, query) {
    let { data } = response;
    if (query.sortBy === 'BEST_RANKING') {
        data = data.sort(compareRankings).reverse();
    }
    if (query.onlyOpen) {
        data = data.filter(({opened}) => opened === 1);
    }
    return data.slice(query.offset, query.offset + query.max);
}

export default class RestaurantsService {

    static async saveSearchToCache(params, ttl = 60 * 60) {
        await hmsetAsync(
            'SEARCH',
            params.point,
            JSON.stringify(params)
        );
        await expireAsync('SEARCH', ttl);
    }

    static async getRestaurants(params, token, cacheTTL) {

        const {
            point,
            offset = 0,
            country = countries.URUGUAY,
            fields = DEFAULT_FIELDS,
        } = params;

        await RestaurantsService.saveSearchToCache(params);
        const restaurantsFromCache = await CacheService.getRestaurantsFromCache(point);

        if (restaurantsFromCache) {
            return restaurantsFromCache;
        }

        const response = await RestaurantsClient.getRestaurants({
            point,
            offset,
            country,
            fields,
        }, token);

        const restaurants = response.data;
        await CacheService
            .setRestaurantsToCache(params.point, restaurants, cacheTTL);
        return handleResponse(restaurants, params);
    }
}
