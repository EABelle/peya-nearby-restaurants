import Axios from "axios";
import config from "../config";

const tokenClient = Axios.create({
    baseURL: `${config.baseURL}tokens`,
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
