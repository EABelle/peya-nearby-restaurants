import Axios from "axios";
import config from "./config";

const appClient = Axios.create({
    baseURL: config.baseURL,
});

export default appClient;
