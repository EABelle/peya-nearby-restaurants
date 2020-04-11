import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const StyledButton = withStyles({
    root: {
        backgroundColor: 'red',
        borderRadius: 3,
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

export default StyledButton;
