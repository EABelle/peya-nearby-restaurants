import redisClient, {expireAsync, hmsetAsync} from "../data/RedisClient";
import RestaurantsService from "../services/CacheService";

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


export const setRestaurantsTTL = (req, res, next) => {

    redisClient.get(`TTL_RESTAURANTS`, (err, ttl) => {
        if(err) {
            res.sendStatus(500);
        }
        res.locals.restaurantsTTL = Number(ttl);
        next();
    })
};

export const setRestaurantsToCache = async (req, res) => {
    const { sortBy, onlyOpen, offset, max } = req.query;
    try {
        await RestaurantsService
            .setRestaurantsToCache(req.query.point, res.locals.restaurants, res.locals.restaurantsTTL);
        const response = res.locals.restaurants;
        let { data } = response;
        if (sortBy === 'BEST_RANKING') {
            data = data.sort(compareRankings).reverse();
        }
        if (onlyOpen) {
            data = data.filter(({opened}) => opened === 1);
        }
        return res.status(200).send(data.slice(offset, offset + max));
    } catch(e) {
        return res.sendStatus(500);
    }
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
