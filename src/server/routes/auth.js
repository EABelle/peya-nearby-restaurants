import express from 'express';
import AuthService from "../services/AuthService";
const router = express.Router();

router.post('/', function(req, res) {
  const { userName, password } = req.body;
  AuthService
      .login(userName, password)
      .then(userToken => {
        return res.send(userToken);
      })
      .catch(error => {
          const { status, data } = error.response;
          const { code } = data;
          res.status(code === 'USR_INVALID_CREDENTIALS' ? 401 : status).send(data);
      });
});

export default router;
