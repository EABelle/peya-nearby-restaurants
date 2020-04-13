import AccountService from "../services/AccountService";

function getStatistics(req, res) {
    AccountService.getLoggedInAccounts()
        .then(response => {
            return res.send({loggedInAccounts: response});
        })
        .catch(() => {
            res.sendStatus(500);
        });
}

export default { getStatistics };
