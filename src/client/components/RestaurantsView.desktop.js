import React from 'react';
import Grid from "@material-ui/core/Grid";
import Map from "./Map";
import RestaurantsList from "./RestaurantsList";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({}));


export default props => {

    const classes = useStyles();
    return (
        <Grid container spacing={3}>
            <Grid item xs={7}>
                <Map
                    restaurants={props.restaurants}
                    onSearchRestaurants={props.onSearchRestaurants}
                    className={classes.map}
                    loading={props.loading}
                    center={props.center}
                />
            </Grid>
            <Grid item xs={5}>
                <RestaurantsList restaurants={props.restaurants} loading={props.loading} error={props.error}/>
            </Grid>
        </Grid>
    )
}
