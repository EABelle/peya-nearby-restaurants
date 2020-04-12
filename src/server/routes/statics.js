import express from 'express';
import UserService from "../services/UserService";
const router = express.Router();

router.get('/', function(req, res) {
  UserService.getLoggedInAccounts()
      .then(response => {
          return res.send(response.data);
      })
      .catch(() => {
          res.sendStatus(500);
      });
});

export default router;
