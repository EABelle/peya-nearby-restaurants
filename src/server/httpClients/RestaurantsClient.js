import appClient from "./index";
export default class RestaurantsClient {

    static getRestaurants(queryParams) {
        return appClient.get('search/restaurants', {
            params: queryParams,
        });
    }
}
