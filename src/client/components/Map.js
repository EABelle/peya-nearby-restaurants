import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from "@material-ui/core/LinearProgress";
import RestaurantsClient from "../api/RestaurantsClient";
import GoogleMapReact from "google-map-react";
import {MyLocation, Restaurant as RestaurantIcon} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    marker: {
        color: '#b8000a'
    },
    mapContainer: {
        height: '70vh',
        width: '100%'
    }
}));

const Loading = props => (
    props.show
        ? <LinearProgress />
        : null
);

export default ({restaurants = [], onSetRestaurants, onSelectRestaurant}) => {

    const classes = useStyles();

    const [loading, setLoading] = useState(false);

    const [center, setCenter] = useState({
        lat: -34.900826,
        lng: -56.158180
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
                <Loading show={loading} />
            </div>
    )
};
