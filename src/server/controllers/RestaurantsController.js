import RestaurantsService from "../services/RestaurantsService";

async function getRestaurants(req, res) {
    const { point } = req.query;
    if(!point) {
        return res.sendStatus(400);
    }
    try {
        const response = await RestaurantsService.getRestaurants(req.query, req.user.userToken, req.restaurantsTTL);
        return res.status(200).send(response);
    } catch(e) {
        return res.sendStatus(500);
    }
}

export default { getRestaurants };
