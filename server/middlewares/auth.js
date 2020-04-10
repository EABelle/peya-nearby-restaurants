import redisClient from '../clients/RedisClient';
import AppTokenClient from "../clients/AppTokenClient";
import UserClient from "../clients/UserClient";

const getAppToken = () => new Promise((resolve, reject) =>
  redisClient.get(`APP_${process.env.CLIENT_ID}`, (err, appToken) => {
    if (err || !appToken) {
      reject();
    }
    resolve(appToken);
  })
);

const getUserToken = (token) => new Promise((resolve, reject) =>
    redisClient.get(`USER_${token}`, (err, appToken) => {
        if (err || !appToken) {
            reject();
        }
        resolve(appToken);
    })
);

export const verifyAppToken = (req, res, next) => {
    return getAppToken()
        .then(token => {
            res.locals.appToken = token;
            next();
        })
        .catch(() => {
            AppTokenClient.getAppToken()
                .then(appToken => {
                    return redisClient.set(`APP_${process.env.CLIENT_ID}`, appToken, ((err) => {
                    if(err) {
                        throw err;
                    }
                    res.locals.appToken = appToken;
                    next();
                }))})
                .catch((e) => {
                    console.log(e);
                    res.error(e);
                });
        });
};

export const verifyUserToken = (req, res, next) => {
    UserClient.getAccount(req.cookies.py_auth_token)
        .then((data) => {
            next();
        })
        .catch(() => {
            res.sendStatus(403);
        });
};
