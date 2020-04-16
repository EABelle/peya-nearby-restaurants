import {getAsync} from "../data/RedisClient";
import appClient from "../httpClients";
import crypto from 'crypto';
import {generateGetUserKey} from "../utils";

const authMiddleware = async (req, res, next) => {
    try {
        const userKey = req.headers.authorization;
        const encryptedKey = crypto.createHmac('sha256', userKey).digest('hex');
        const user = await getAsync(await generateGetUserKey(encryptedKey));
        if(!user) {
            return res.sendStatus(401);
        }
        req.user = {...JSON.parse(user), userToken: req.headers.authorization};
        appClient.defaults.headers.Authorization = req.user.userToken;
        return next();
    } catch(e) {
        return res.error(e);
    }
};

export default authMiddleware;
