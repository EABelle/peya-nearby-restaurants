import Axios from "axios";
import config from "../config";

const userClient = Axios.create({
    baseURL: `${config.baseURL}myAccount`,
});

export default class UserClient {

    static getAccount(token) {
        return userClient.get('', {headers: {
            Authorization: token
            }})
    }
}
