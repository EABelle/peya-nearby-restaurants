import express from 'express';
import {getRestaurantsFromCache, setRestaurantsToCache, setRestaurantsSearchToCache} from "../middlewares/cache";
import RestaurantsController from "../controllers/RestaurantsController";
const router = express.Router();

router.get('/', setRestaurantsSearchToCache, getRestaurantsFromCache, RestaurantsController.getRestaurants, setRestaurantsToCache);

export default router;
