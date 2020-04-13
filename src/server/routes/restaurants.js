import express from 'express';
import RestaurantsService from "../services/RestaurantsService";
import redisClient from "../clients/RedisClient";
const router = express.Router();

router.get('/', function(req, res) {
    const { point, offset, max, country, fields } = req.query;
      RestaurantsService.getRestaurants({
          point,
          offset,
          max,
          country,
          fields
      }, res.locals.restaurantsTTL)
          .then(response => {
              return res.send(response.data);
          })
          .catch(() => {
              res.sendStatus(500);
          });
});

router.put('/ttl', function(req, res) {

    const { ttl } = req.body;

    redisClient.set('TTL_RESTAURANTS', ttl, (err) => {
        if (err) {
            res.sendStatus(500);
        }
        res.send({ ttl });
    })
});

export default router;
