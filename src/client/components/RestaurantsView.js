import React from 'react';
import DesktopRestaurantsView from "./RestaurantsView.desktop";
import MobileRestaurantsView from "./RestaurantsView.mobile";

export default ({ mobile, ...props}) => (
    mobile
        ? <MobileRestaurantsView {...props} />
        : <DesktopRestaurantsView {...props} />
)
