import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Card,
    Container,
    TextField
} from '@material-ui/core';
import logo from "../logo.svg";

const useStyles = makeStyles(theme => ({}));

export default () => {


    const classes = useStyles();

    return (
        <Container component="main">
            Restaurants
        </Container>
    )
};
