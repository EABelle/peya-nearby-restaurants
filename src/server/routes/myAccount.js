import express from 'express';
import UserService from "../services/UserService";
const router = express.Router();

router.get('/', function(req, res) {
  UserService.getAccount(req.cookies.py_auth_token)
      .then(response => {
          return res.send(response);
      })
      .catch((e) => {
          if (e.response && e.response.status) {
              return res.sendStatus(e.response.status);
          }
          return res.sendStatus(500);
      });
});

export default router;
