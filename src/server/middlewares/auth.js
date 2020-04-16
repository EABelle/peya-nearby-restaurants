import CacheService from "../services/CacheService";

const authMiddleware = async (req, res, next) => {
    try {
        const user = await CacheService.getUserFromCacheBySecret(req.headers.authorization);
        if(!user) {
            return res.sendStatus(401);
        }
        req.user = {...JSON.parse(user), userToken: req.headers.authorization};
        return next();
    } catch(e) {
        return res.sendStatus(401);
    }
};

export default authMiddleware;
