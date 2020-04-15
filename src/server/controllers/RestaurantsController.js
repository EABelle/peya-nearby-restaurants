import RestaurantsService from "../services/RestaurantsService";

const DEFAULT_FIELDS = 'id, name, topCategories, rating, logo, deliveryTimeMaxMinutes, link, coordinates, opened';

function getRestaurants(req, res, next) {
    if(res.locals.restaurants) {
        return next();
    }
    const { point, offset, country, fields } = req.query;
    return RestaurantsService.getRestaurants({
        point,
        offset: offset || 0,
        country: country || 1,
        fields: fields || DEFAULT_FIELDS
    })
        .then(response => {
            res.locals.restaurants = response;
            next();
        })
        .catch((error) => {
            console.log(error)
            return res.sendStatus(500);
        });
}

export default { getRestaurants };
