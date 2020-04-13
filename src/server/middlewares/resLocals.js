import redisClient from '../clients/RedisClient';

export const setRestaurantsTTL = (req, res, next) => {

    redisClient.get(`TTL_RESTAURANTS`, (err, ttl) => {
        res.locals.restaurantsTTL = Number(ttl);
        next();
    })
};