import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from "@material-ui/core/LinearProgress";
import RestaurantsClient from "../api/RestaurantsClient";
import GoogleMapReact from "google-map-react";
import {MyLocation, Restaurant as RestaurantIcon} from "@material-ui/icons";
import LoadingBar from "./LoadingBar";

const useStyles = makeStyles(theme => ({
    marker: {
        color: '#b8000a'
    },
    mapContainer: {
        height: '70vh',
        width: '100%'
    }
}));

export default ({restaurants = [], onSetRestaurants, onSelectRestaurant, location}) => {

    const classes = useStyles();

    const paramsString = location.search;
    const params = new URLSearchParams(paramsString);

    const lat = Number(params.get('lat'));
    const lng = Number(params.get('lng'));

    const [loading, setLoading] = useState(false);

    const [center, setCenter] = useState({
        lat: lat || -34.900826,
        lng: lng || -56.158180
    });
    const zoom = 14;

    const handleMapClick = (event) => {
        const { lat, lng } = event;
        setLoading(true);
        RestaurantsClient.getRestaurants(`${lat},${lng}`)
            .then(restaurants => {
                setCenter({ lat, lng });
                onSetRestaurants(restaurants);
                setLoading(false);
            });
    };

    return (
            <div className={classes.mapContainer}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                    center={center}
                    onClick={handleMapClick}
                >
                    {
                        restaurants.length ?
                            <MyLocation
                                className={classes.marker}
                                lat={center.lat}
                                lng={center.lng}
                                text="Mi Ubicación"
                            /> : null
                    }
                    {
                        restaurants.map(restaurant => (
                            <RestaurantIcon
                                key={'map'+restaurant.id}
                                className={classes.marker}
                                lat={restaurant.lat}
                                lng={restaurant.lng}
                                text="My Marker"
                                onClick={() => onSelectRestaurant(restaurant.id)}
                            />
                        ))
                    }
                </GoogleMapReact>
                <LoadingBar show={loading} />
            </div>
    )
};
