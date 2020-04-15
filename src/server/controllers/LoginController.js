import LoginService from "../services/LoginService";

function login(req, res) {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return res.sendStatus(400);
    }
    LoginService
        .login(userName, password)
        .then(userToken => {
            return res.send(userToken);
        })
        .catch(error => {
            const { status, data } = error.response;
            const { code } = data;
            return res.status(code === 'USR_INVALID_CREDENTIALS' ? 401 : status).send(data);
        });
}

export default { login };
