import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ReactStars from 'react-rating-stars-component'
import {Star, StarBorder, StarHalf} from "@material-ui/icons";

const logoBaseURL = 'https://d1v73nxuzaqxgd.cloudfront.net/restaurants/';
const buildLink = (link) => `http://www.pedidosya.com.uy/restaurantes/montevideo/${link}-menu`;

const useStyles = makeStyles(theme => ({
    restaurantLogo: {
        width: 120,
        height: 120,
    },
    card: {
        display: 'flex',
        padding: 12
    },
    info: {
        paddingLeft: 12
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
                    target="_blank">
                    {details.name}
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
                {"Llega en " + details.deliveryTimeMaxMinutes + " minutos"}
                {details.topCategories}
            </div>
        </Card>
    )
};
