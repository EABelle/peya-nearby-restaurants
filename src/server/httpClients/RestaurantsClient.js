import appClient from "./index";
export default class RestaurantsClient {

    static getRestaurants(queryParams, token) {
        return appClient.get('search/restaurants', {
            params: queryParams,
            headers: {
                Authorization: token
            }
        });
    }
}
