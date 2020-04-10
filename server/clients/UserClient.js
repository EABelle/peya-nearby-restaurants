import Axios from "axios";

const userClient = Axios.create({
    baseURL: `${process.env.CLIENT_BASE_URL}myAccount`,
});

export default class UserClient {

    static getAccount(token) {
        console.log(token);
        return userClient.get('', {headers: {
            Authorization: token
            }})
            .then(response => response.data)
    }
}
