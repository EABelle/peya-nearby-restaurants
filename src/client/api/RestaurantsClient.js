import Axios from "axios";
import config from "./config";

const axios = Axios.create({
  baseURL: config.baseURL,
  withCredentials: true
});

async function getRestaurants(point, offset = 0, max = 20, country = 1) {
  const response = await axios.get('/restaurants', {
    params: {
      point,
      offset,
      max,
      country
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
