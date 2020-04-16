import redisClient from "../data/RedisClient";


export const setRestaurantsTTL = (req, res, next) => {

    redisClient.get(`TTL_RESTAURANTS`, (err, ttl) => {
        if(err) {
            res.sendStatus(500);
        }
        req.restaurantsTTL = Number(ttl);
        next();
    })
};
