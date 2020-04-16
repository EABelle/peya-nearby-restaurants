import appClient from "./index";

export default class LoginClient {

    static login(userName, password, appToken) {
        return appClient
            .get('/tokens/', {
                params: {
                    userName,
                    password
                },
                headers: {
                    Authorization: appToken
                }
            })
            .then(response => response.data.access_token)

    }
}
