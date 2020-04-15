import express from 'express';
import RestaurantsController from "../controllers/RestaurantsController";
const router = express.Router();

router.get('/', RestaurantsController.getRestaurants);

export default router;
