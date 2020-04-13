import express from 'express';
import LoginController from "../controllers/LoginController";
const router = express.Router();

router.post('/', LoginController.login);

export default router;
