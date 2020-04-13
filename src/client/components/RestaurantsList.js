import React from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Restaurant from "./Restaurant";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({

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
    },
    loaderContainer: {
        height: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

export default (props) => {

    const classes = useStyles();

    return (
        props.loading
            ? <CircularProgress />
            : props.restaurants
                ?
                    <List className={classes.list}>
                        {
                            props.restaurants.map(restaurant => (
                                <ListItem alignItems="flex-start" className={classes.restaurantContainer} key={restaurant.id}>
                                    <Restaurant className={classes.restaurant} details={restaurant} />
                                </ListItem>
                            ))
                        }
                    </List>
                : <div className={classes.loaderContainer}>Seleccione un punto del mapa</div>
    )
};
