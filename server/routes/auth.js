import express from 'express';
import AuthService from "../services/AuthService";
const router = express.Router();

router.post('/', function(req, res) {
  const { userName, password } = req.body;
  const { appToken } = res.locals;
  AuthService
      .login(userName, password, appToken)
      .then(userToken => {
        return res.send(userToken);
      })
      .catch(error => {
          const { status, data } = error.response;
          res.status(status).send(data);
      });
});

export default router;
