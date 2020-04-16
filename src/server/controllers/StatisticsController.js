import AccountService from "../services/AccountService";
import CacheService from "../services/CacheService";

async function getStatistics(req, res) {
    try {
        const loggedInAccounts = await AccountService.getLoggedInAccounts();
        const lastRestaurantSearches = await CacheService.getLastRestaurantSearches();
        return res.send({loggedInAccounts, lastRestaurantSearches});
    } catch(e) {
        return res.sendStatus(500);
    }
}

export default { getStatistics };
