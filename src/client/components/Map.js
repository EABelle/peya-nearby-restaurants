import React from "react";
import { makeStyles } from '@material-ui/core/styles';
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

export default ({restaurants = [], loading, onSelectRestaurant, onSearchRestaurants, center}) => {

    const classes = useStyles();

    const zoom = 14;

    const handleMapClick = (event) => {
        const { lat, lng } = event;
        onSearchRestaurants({lat, lng});
    };

    return (
            <div className={classes.mapContainer}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
                    defaultZoom={zoom}
                    center={center}
                    onClick={handleMapClick}
                >
                    <MyLocation
                        className={classes.marker}
                        lat={center.lat}
                        lng={center.lng}
                        text="Mi Ubicación"
                    />
                    {
                        restaurants.map(restaurant => (
                            <RestaurantIcon
                                key={'map'+restaurant.id}
                                className={classes.marker}
                                lat={restaurant.lat}
                                lng={restaurant.lng}
                                text="My Marker"
                            />
                        ))
                    }
                </GoogleMapReact>
                <LoadingBar show={loading} />
            </div>
    )
};
