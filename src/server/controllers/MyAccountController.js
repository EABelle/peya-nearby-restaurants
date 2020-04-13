import AccountService from "../services/AccountService";

function getMyAccount(req, res) {
    AccountService.getAccount(req.cookies.py_auth_token)
        .then(response => {
            return res.send(response);
        })
        .catch((e) => {
            if (e.response && e.response.status) {
                return res.sendStatus(e.response.status);
            }
            return res.sendStatus(500);
        });
}

export default { getMyAccount };
