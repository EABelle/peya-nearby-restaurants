import redisClient, {expireAsync, hmsetAsync} from "../data/RedisClient";
import RestaurantsService from "../services/CacheService";

export const setRestaurantsTTL = (req, res, next) => {

    redisClient.get(`TTL_RESTAURANTS`, (err, ttl) => {
        if(err) {
            res.sendStatus(500);
        }
        res.locals.restaurantsTTL = Number(ttl);
        next();
    })
};

export const setRestaurantsToCache = (req, res) => {
    return RestaurantsService
        .setRestaurantsToCache(req.query.point, res.locals.restaurants, res.locals.restaurantsTTL)
        .then(() => res.status(200).send([...res.locals.restaurants]))
        .catch(() => res.sendStatus(500));
};

export const setRestaurantsSearchToCache = async (req, res, next) => {
    try {
        await hmsetAsync(
            'SEARCH',
            req.query.point,
            JSON.stringify({ ...req.query, ttl: res.locals.restaurantsTTL })
        );
        await expireAsync('SEARCH', 60 * 60);
        return next();
    } catch (e) {
        return res.sendStatus(500);
    }
};

export const getRestaurantsFromCache = async (req, res, next) => {
    try {
        res.locals.restaurants = await RestaurantsService.getRestaurantsFromCache(req.query.point);
        return next();
    } catch (e) {
        return res.sendStatus(500);
    }
};
