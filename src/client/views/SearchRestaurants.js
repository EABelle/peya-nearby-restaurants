import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Map from "../components/Map";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: 60
    },
    mapContainer: {
        width: '50%'
    }
}));

export default () => {

    const classes = useStyles();

    return (
        <Container component="main" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Map className={classes.map} />
                </Grid>
            </Grid>
        </Container>
    )
};
