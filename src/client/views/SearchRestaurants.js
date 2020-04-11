import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Map from "../components/Map";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Restaurant from "../components/Restaurant";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: 60
    },
    mapContainer: {
        width: '50%'
    },
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        height: '70vh',
        overflow: 'auto'
    },
    restaurantContainer: {
        width: '100%',
    },
    restaurant: {
        width: '100%',
    }
}));

export default () => {

    const classes = useStyles();

    const [ restaurants, setRestaurants ] = useState([]);

    const handleSetRestaurants = restaurants => {
        setRestaurants(restaurants);
    }

    return (
        <Container component="main" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={7}>
                    <Map
                        restaurants={restaurants}
                        onSetRestaurants={handleSetRestaurants}
                        onSelectRestaurant={() => {}}
                        className={classes.map}
                    />
                </Grid>
                <Grid item xs={5}>
                    <List className={classes.list}>
                        {
                            restaurants.map(restaurant => (
                                <ListItem alignItems="flex-start" className={classes.restaurantContainer} key={restaurant.id}>
                                    <Restaurant className={classes.restaurant} details={restaurant} />
                                </ListItem>
                            ))
                        }
                    </List>
                </Grid>
            </Grid>
        </Container>
    )
};
