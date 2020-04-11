import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography
} from '@material-ui/core';
import logo from "../header-logo.svg";
import AccountClient from "../api/AccountClient";
import {logout} from "../services/LoginService";

const useStyles = makeStyles(theme => ({
    header: {
        backgroundImage: 'url(header-background.jpg)',
        height: 120,
    },
    items: {
        maxWidth: 960,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        margin: '0 auto',
        color: 'white',
        padding: '0 24px'
    },
    logo: {
        width: 155
    },
    userContainer: {
        textAlign: 'right'
    },
    logout: {
        cursor: 'pointer'
    }
}));

export default () => {

    const classes = useStyles();
    const [userName, setUserName] = useState();
    const [keepLoggedIn, setKeepLoggedIn] = useState(true);

    useEffect(() => {
        AccountClient.getMyAccount()
            .then((accountData) => {
                setUserName(`${accountData.name} ${accountData.lastName}`);
            })
            .catch(err => {
                if(err.status === 403) {
                    logout();
                }
            });
    },[]);

    useEffect(() => {
        if(!keepLoggedIn) {
            logout();
        }
    });

    const handleClickLogout = () => {
        setKeepLoggedIn(false);
    };

    return (
        <header className={classes.header}>
            <div className={classes.items}>
                <img src={logo} className={classes.logo} alt="logo" />
                <div className={classes.userContainer}>
                    <Typography variant="subtitle1">{ userName }</Typography>
                    <Typography variant="caption" className={classes.logout} onClick={handleClickLogout}>Cerrar Sesión</Typography>
                </div>
            </div>
        </header>
    )
};
