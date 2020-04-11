import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ReactStars from 'react-rating-stars-component'
import {Star, StarBorder, StarHalf} from "@material-ui/icons";
import Typography from '@material-ui/core/Typography';

const logoBaseURL = 'https://d1v73nxuzaqxgd.cloudfront.net/restaurants/';
const buildLink = (link) => `http://www.pedidosya.com.uy/restaurantes/montevideo/${link}-menu`;

const useStyles = makeStyles(theme => ({
    restaurantLogo: {
        width: 120,
        height: 120,
    },
    card: {
        display: 'flex',
        padding: 12,
        width: '100%'
    },
    info: {
        paddingLeft: 12
    },
    a: {
        textDecoration: 'none',
    }
}));

export default ({details}) => {

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <img
                src={logoBaseURL + details.logo}
                className={classes.restaurantLogo}
                alt="logo"
            />
            <div className={classes.info}>
                <a
                    href={buildLink(details.link)}
                    rel="noopener noreferrer"
                    target="_blank"
                    className={classes.a}
                >
                    <Typography variant="h6">{details.name}</Typography>
                </a>
                <ReactStars
                    count={5}
                    value={Number(details.rating) / 10}
                    size={24}
                    half={true}
                    edit={false}
                    emptyIcon={<StarBorder />}
                    halfIcon={<StarHalf />}
                    fullIcon={<Star />}
                />
                <Typography variant="body1">{"Llega en " + details.deliveryTimeMaxMinutes + " minutos"}</Typography>
                <Typography variant="caption">{details.topCategories}</Typography>
            </div>
        </Card>
    )
};
