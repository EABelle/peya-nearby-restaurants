import express from 'express';
import RestaurantsService from "../services/RestaurantsService";
const router = express.Router();

router.get('/', function(req, res) {
    const { point, offset, max, country, fields } = req.query;
      RestaurantsService.getRestaurants(
          point,
          offset,
          max,
          country,
          fields
      )
          .then(response => {
              return res.send(response.data);
          })
          .catch(() => {
              res.sendStatus(500);
          });
});

export default router;
