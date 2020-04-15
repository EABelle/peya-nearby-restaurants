import appClient from "./index";

export default class LoginClient {

    static login(userName, password) {
        return appClient
            .get('/tokens/', {
                params: {
                    userName,
                    password
                }
            })
            .then(response => response.data.access_token)

    }
}
