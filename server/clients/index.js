import Axios from "axios";
import AppTokenClient from "./AppTokenClient";

const appClient = Axios.create({
    baseURL: process.env.CLIENT_BASE_URL,
});

appClient.interceptors.response.use(null, (error) => {
    if (error.config && error.response && error.response.data.code === 'INVALID_TOKEN') {
        return AppTokenClient.getAppToken().then((token) => {
            error.config.headers.Authorization = token;
            appClient.request(error.config);
        });
    }

    return Promise.reject(error);
});

export default appClient;
