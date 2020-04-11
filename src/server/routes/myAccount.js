import express from 'express';
import UserClient from "../clients/UserClient";
const router = express.Router();

router.get('/', function(req, res) {
  UserClient.getAccount(req.cookies.py_auth_token)
      .then(response => {
          return res.send(response.data);
      })
      .catch(() => {
          res.sendStatus(403);
      });
});

export default router;
