import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography
} from '@material-ui/core';
import logo from "../header-logo.svg";
import AccountClient from "../api/AccountClient";
import {isAuthenticated, logout} from "../services/LoginService";
import {Redirect} from "react-router-dom";

const RedirectToLogin = props => (
    <Redirect to={{
        pathname: '/login',
        state: { from: props.location },
    }}
    />
)

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

export default ( props ) => {

    const classes = useStyles();
    const [userName, setUserName] = useState();
    const [keepLoggedIn, setKeepLoggedIn] = useState(isAuthenticated());

    useEffect(() => {
        AccountClient.getMyAccount()
            .then((accountData) => {
                setUserName(`${accountData.name} ${accountData.lastName}`);
            })
            .catch(err => {
                if(err.response && err.response.status === 401) {
                    logout();
                    setKeepLoggedIn(isAuthenticated());
                }
            });
    },[]);

    const handleClickLogout = () => {
        logout();
        setKeepLoggedIn(isAuthenticated());
    };

    return (
        keepLoggedIn
            ? (
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
            : (
                <RedirectToLogin location={props.location} />
            )
    )
};
