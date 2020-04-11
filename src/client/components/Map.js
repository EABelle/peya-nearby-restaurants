import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from "@material-ui/core/LinearProgress";
import RestaurantsClient from "../api/RestaurantsClient";
import GoogleMapReact from "google-map-react";
import {MyLocation, Restaurant} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    marker: {
        color: '#b8000a'
    },
    mapContainer: {
        height: '100vh',
        width: '100%'
    }
}));

const Loading = props => (
    props.show
        ? <LinearProgress />
        : null
);

export default () => {

    const classes = useStyles();

    const [restaurants, setRestaurants] = useState([]);
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
                setRestaurants(restaurants);
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
                            <Restaurant
                                className={classes.marker}
                                lat={restaurant.lat}
                                lng={restaurant.lng}
                                text="My Marker"
                            />
                        ))
                    }
                </GoogleMapReact>
                <Loading show={loading} />
            </div>
    )
};
