import {getAsync} from "../data/RedisClient";

const authMiddleware = async (req, res, next) => {
    try {
        const user = await getAsync(`USER_${req.headers.authorization}`);
        req.user = JSON.parse(user);
        if(!req.user) {
            return res.sendStatus(401);
        }
        return next();
    } catch(e) {
        return res.error(e);
    }
};

export default authMiddleware;
