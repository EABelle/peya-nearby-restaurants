import Axios from "axios";

const tokenClient = Axios.create({
    baseURL: `${process.env.CLIENT_BASE_URL}tokens`,
});

export default class AppTokenClient {

    static getAppToken() {
        const { CLIENT_ID, CLIENT_SECRET } = process.env;
        return tokenClient
            .get('/', {params: {
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET
            }})
            .then(response => response.data.access_token);

    }
}
