import express from 'express';
import StatisticsController from "../controllers/StatisticsController";
const router = express.Router();

router.get('/', StatisticsController.getStatistics);

export default router;
