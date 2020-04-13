import express from 'express';
import MyAccountController from "../controllers/MyAccountController";
const router = express.Router();

router.get('/', MyAccountController.getMyAccount);

export default router;
