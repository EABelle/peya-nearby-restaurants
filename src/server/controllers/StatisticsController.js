import AccountService from "../services/AccountService";

async function getStatistics(req, res) {
    try {
        const loggedInAccounts = await AccountService.getLoggedInAccounts();
        return res.send({loggedInAccounts});
    } catch(e) {
        return res.sendStatus(500);
    }
}

export default { getStatistics };
