import appClient from "./index";

export default class LoginClient {

    static login(userName, password, appToken) {
        return appClient
            .get('tokens', {
                headers: {
                    Authorization: appToken
                },
                params: {
                    userName,
                    password
                }
            })
            .then(response => response.data.access_token);
    }
}
