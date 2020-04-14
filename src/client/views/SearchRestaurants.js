import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import RestaurantsClient from "../api/RestaurantsClient";
import RestaurantsView from "../components/RestaurantsView";
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: 24,
        [theme.breakpoints.up('lg')]: {
            marginTop: 24
        }
    },
    mapContainer: {
        width: '50%'
    },
    title: {
        marginBottom: 24
    }
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

    const mobile = useMediaQuery('(max-width:960px)');
    const [ restaurants, setRestaurants ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const searchRestaurants = (center) => {
        setError(false);
        setLoading(true);
        RestaurantsClient.getRestaurants(`${center.lat},${center.lng}`)
            .then(restaurants => {
                setLoading(false);
                setRestaurants(restaurants);
            })
            .catch(() => {
                setLoading(false);
                setError(true);
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
            <Typography variant="h5" align="left" className={classes.title}>Buscar restaurantes</Typography>
            <RestaurantsView
                restaurants={restaurants}
                onSearchRestaurants={handleSearchRestaurants}
                className={classes.map}
                loading={loading}
                center={center}
                error={error}
                mobile={mobile}
            />
        </Container>
    )
};
