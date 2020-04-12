import redisClient from '../clients/RedisClient';
import AppTokenClient from "../clients/AppTokenClient";

const getAppToken = () => new Promise((resolve, reject) =>
  redisClient.get(`APP_${process.env.CLIENT_ID}`, (err, appToken) => {
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
                    res.error(e);
                });
        });
};
