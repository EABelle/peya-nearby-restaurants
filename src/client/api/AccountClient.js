import Axios from "axios";
import config from "./config";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const axios = Axios.create({
  baseURL: config.baseURL,
  headers: {
    Authorization: cookies.get('py_auth_token')
  }
});


async function getMyAccount() {
  const response = await axios.get('/myAccount');
  return response.data;
}

export default { getMyAccount };
