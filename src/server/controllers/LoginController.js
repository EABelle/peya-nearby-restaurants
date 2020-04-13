import LoginService from "../services/LoginService";

function login(req, res) {
    const { userName, password } = req.body;
    LoginService
        .login(userName, password)
        .then(userToken => {
            return res.send(userToken);
        })
        .catch(error => {
            const { status, data } = error.response;
            const { code } = data;
            res.status(code === 'USR_INVALID_CREDENTIALS' ? 401 : status).send(data);
        });
}

export default { login };
