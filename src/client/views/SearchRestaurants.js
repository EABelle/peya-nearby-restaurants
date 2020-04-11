import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import GoogleMapReact from 'google-map-react';
import dotenv from 'dotenv';
dotenv.config();

const useStyles = makeStyles(theme => ({
    container: {
    },
    marker: {
        color: '#b8000a'
    },
    mapContainer: {
        height: '100vh',
        width: '100%'
    }
}));

export default () => {

    const classes = useStyles();

    const center = {
        lat: -34.900826,
        lng: -56.158180
    };
    const zoom = 14;

    return (
        <Container component="main" className={classes.container}>
            <div className={classes.mapContainer}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.MAPS_API_KEY }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                >
                    <RestaurantIcon
                        className={classes.marker}
                        lat={-34.900826}
                        lng={-56.158180}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        </Container>
    )
};
