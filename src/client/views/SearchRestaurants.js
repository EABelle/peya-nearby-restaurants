import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Map from "../components/Map";
import RestaurantsClient from "../api/RestaurantsClient";
import RestaurantsList from "../components/RestaurantsList";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: 60
    },
    mapContainer: {
        width: '50%'
    },
}));

export default (props) => {

    const classes = useStyles();
    const { search } = props.location;
    const params = new URLSearchParams(search);
    const center = {
        lat: Number(params.get('lat')),
        lng: Number(params.get('lng'))
    };

    if (!search) {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                props.history.push({
                    pathname: '/search-restaurants',
                    search: `?lat=${coords.latitude}&lng=${coords.longitude}`
                });
            },
            error => console.log(error)
        );
    }

    useEffect(() => {
        searchRestaurants(center);
    }, [search]);


    const [ restaurants, setRestaurants ] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchRestaurants = (center) => {
        setLoading(true);
        RestaurantsClient.getRestaurants(`${center.lat},${center.lng}`)
            .then(restaurants => {
                setLoading(false);
                setRestaurants(restaurants);
            });
    };

    const handleSearchRestaurants = (center) => {
        props.history.push({
            pathname: '/search-restaurants',
            search: `?lat=${center.lat}&lng=${center.lng}`
        });
    };

    return (
        <Container component="main" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={7}>
                    <Map
                        restaurants={restaurants}
                        onSearchRestaurants={handleSearchRestaurants}
                        className={classes.map}
                        loading={loading}
                        center={center}
                    />
                </Grid>
                <Grid item xs={5}>
                    <RestaurantsList restaurants={restaurants} loading={loading} />
                </Grid>
            </Grid>
        </Container>
    )
};
