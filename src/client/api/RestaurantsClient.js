import Axios from "axios";
import config from "./config";
import Cookies from 'universal-cookie';

const countries = { URUGUAY: 1 };

const cookies = new Cookies();

const axios = Axios.create({
  baseURL: config.baseURL,
});


async function getRestaurants(point, offset = 0, max = 20, country = countries.URUGUAY, sortBy = 'BEST_RANKING', onlyOpen=true) {
  const response = await axios.get('/restaurants', {
    params: {
      point,
      offset,
      max,
      country,
      sortBy,
      onlyOpen
    },
    headers: {
      Authorization: cookies.get('py_auth_token')
    }
  });
  return response.data.map(restaurant => {
    const { coordinates, ...rest } = restaurant;
    const [ lat, lng ] = coordinates.split(',').map(v => Number(v));
    return {
      ...rest,
      lat,
      lng
    }
  });
}

export default { getRestaurants };
