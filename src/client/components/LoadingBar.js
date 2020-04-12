import React from 'react';
import LinearProgress from "@material-ui/core/LinearProgress";

export default props => (
    props.show
        ? <LinearProgress />
        : null
);
