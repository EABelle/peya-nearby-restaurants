import RestaurantsService from "../services/RestaurantsService";

const DEFAULT_FIELDS = 'id, name, topCategories, rating, logo, deliveryTimeMaxMinutes, link, coordinates';

function getRestaurants(req, res, next) {
    if(res.locals.restaurants) {
        return next();
    }
    const { point, offset, max, country, fields } = req.query;
    return RestaurantsService.getRestaurants({
        point,
        offset: offset || 0,
        max: max || 20,
        country: country || 1,
        fields: fields || DEFAULT_FIELDS
    })
        .then(response => {
            res.locals.restaurants = response.data;
            next();
        })
        .catch(() => {
            return res.sendStatus(500);
        });
}

export default { getRestaurants };
