import RestaurantsClient from "../httpClients/RestaurantsClient";

export default class RestaurantsService {

    static async getRestaurants(params) {
        const response = await RestaurantsClient.getRestaurants(params);
        return response.data;
    }
}
