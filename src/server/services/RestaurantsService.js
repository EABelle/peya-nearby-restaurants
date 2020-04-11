import RestaurantsClient from "../clients/RestaurantsClient";

const DEFAULT_FIELDS = 'id, name, topCategories, rating, logo, deliveryTimeMaxMinutes, link, coordinates';

export default class RestaurantsService {

    static getRestaurants(point, offset = 0, max = 20, country = 1, fields = DEFAULT_FIELDS) {
        return RestaurantsClient.getRestaurants({
            point,
            offset,
            max,
            country,
            fields
        }).then(response => {
            return response.data
        });
    }
}
