import { getAsync, setAsync } from '../data/RedisClient';
import AppTokenClient from "../httpClients/AppTokenClient";
import appClient from "../httpClients";

export const verifyAppToken = async (req, res, next) => {
    try {
        let appToken = await getAsync('APP_TOKEN');
        if (!appToken) {
            appToken = await AppTokenClient.getAppToken();
            setAsync('APP_TOKEN', appToken)
        }
        appClient.defaults.headers.Authorization = appToken;
        return next();
    } catch(e) {
        return res.error(e);
    }
};
