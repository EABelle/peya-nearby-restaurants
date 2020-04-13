import redisClient from "../data/RedisClient";
import router from "./RestaurantsRouter";

router.put('/ttl/restaurants', function(req, res) {

    const { ttl } = req.body;

    redisClient.set('TTL_RESTAURANTS', ttl, (err) => {
        if (err) {
            res.sendStatus(500);
        }
        res.send({ ttl });
    })
});

export default router;
