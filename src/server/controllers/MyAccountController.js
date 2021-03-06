import AccountService from "../services/AccountService";

async function getMyAccount(req, res) {
    try {
        const account = await AccountService.getAccount(req.user.userToken);
        return res.send(account);
    } catch(e) {
        if(e.response.status === 403 || (e.response.data && e.response.data.code === 'INVALID_TOKEN') ) {
            return res.sendStatus(403);
        }
        return res.sendStatus(500);
    }
}

export default { getMyAccount };
