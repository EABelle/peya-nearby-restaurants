import express from 'express';
import UserService from "../services/UserService";
const router = express.Router();

router.get('/', function(req, res) {
  UserService.getAccount(req.cookies.py_auth_token)
      .then(response => {
          return res.send(response);
      })
      .catch(() => {
          res.sendStatus(403);
      });
});

export default router;