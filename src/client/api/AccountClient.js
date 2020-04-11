import Axios from "axios";
import config from "./config";

const axios = Axios.create({
  baseURL: config.baseURL,
  withCredentials: true

});


async function getMyAccount() {
  const response = await axios.get('/myAccount');
  return response.data;
}

export default { getMyAccount };
