import Axios from "axios";
import AppTokenClient from "./AppTokenClient";
import config from "../config";

const appClient = Axios.create({
    baseURL: config.baseURL,
});

appClient.interceptors.response.use(null, (error) => {
    if (error.config && error.response && error.response.data.code === 'INVALID_TOKEN') {
        return AppTokenClient.getAppToken().then((token) => {
            error.config.headers.Authorization = token;
            console.log('INTERCEPT');
            return appClient.request(error.config);
        });
    }

    return Promise.reject(error);
});

export default appClient;
