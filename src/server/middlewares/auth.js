import {getAsync} from "../data/RedisClient";
import appClient from "../httpClients";
import crypto from 'crypto';
import {generateGetUserKey} from "../utils";

async function getUserFromCache(token) {
    const encryptedToken = crypto.createHmac('sha256', token).digest('hex');
    const key = await generateGetUserKey(encryptedToken);
    return await getAsync(key);
}

const authMiddleware = async (req, res, next) => {
    try {
        const user = await getUserFromCache(req.headers.authorization);
        if(!user) {
            return res.sendStatus(401);
        }
        req.user = {...JSON.parse(user), userToken: req.headers.authorization};
        appClient.defaults.headers.Authorization = req.user.userToken;
        return next();
    } catch(e) {
        return res.sendStatus(401);
    }
};

export default authMiddleware;
