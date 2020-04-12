import redisClient from '../clients/RedisClient';
import AppTokenClient from "../clients/AppTokenClient";
import appClient from "../clients";

const getAppToken = () => new Promise((resolve, reject) =>
  redisClient.get('APP_TOKEN', (err, appToken) => {
    if (err || !appToken) {
      reject();
    }
      appClient.defaults.headers.Authorization = appToken;
      resolve(appToken);
  })
);

export const verifyAppToken = (req, res, next) => {

    return getAppToken()
        .then(() => {
            next();
        })
        .catch(() => {
            AppTokenClient.getAppToken()
                .then(appToken => {
                    appClient.defaults.headers.Authorization = appToken;
                    return redisClient.set('APP_TOKEN', appToken, ((err) => {
                    if(err) {
                        throw err;
                    }
                    next();
                }))})
                .catch((e) => {
                    res.error(e);
                });
        });
};
