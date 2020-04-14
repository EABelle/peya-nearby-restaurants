import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import RestaurantsList from "./RestaurantsList";
import {makeStyles} from "@material-ui/core/styles";
import Map from "./Map";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

export default props => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleSearchRestaurants = (event) => {
        props.onSearchRestaurants(event);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div >
            <Map
                restaurants={props.restaurants}
                onSearchRestaurants={handleSearchRestaurants}
                className={classes.map}
                loading={props.loading}
                center={props.center}
            />
            <Dialog className={classes.dialog} fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Restaurantes cercanos
                        </Typography>
                    </Toolbar>
                </AppBar>
                <RestaurantsList className={classes.list} restaurants={props.restaurants} loading={props.loading} error={props.error}/>
            </Dialog>
        </div>
    )
}
