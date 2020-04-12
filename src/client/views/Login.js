import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Card,
    Container,
    TextField
} from '@material-ui/core';
import logo from "../logo.svg";
import {isAuthenticated, login} from "../services/LoginService";
import { Redirect } from 'react-router-dom';
import LoadingBar from "../components/LoadingBar";


const useStyles = makeStyles(theme => ({
    appLogo: {
        width: 300
    },
    formContainer: {
        marginTop: theme.spacing(20),
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    loginCard: {
        padding: '20px 24px'
    },
    errorContainer: {
        width: '100%',
        margin: '12px auto',
        textAlign: 'center',
        color: '#f52F41'
    }
}));

const getErrorMessage = (code) => (
    code
        ? code === 401
            ? 'Usuario o contraseña incorrectos'
            : 'Ocurrió un error'
        : null
);

export default (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToIndex, setRedirectToIndex] = useState(isAuthenticated());
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await login(email, password);
        } catch(e) {
            setError(e.response ? e.response.status : 500);
        }
        if(isAuthenticated()) {
            setRedirectToIndex(true);
        }
        setLoading(false);
    };

    const handleEmailChange = event => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const classes = useStyles();

    if (redirectToIndex === true) {
        return <Redirect to={{ pathname: '/search-restaurants' }} />;
    }

    return (
        <Container component="main">
            <div className={classes.formContainer}>
                <img src={logo} className={classes.appLogo} alt="logo" />
                <h2 className={classes.title}>
                    Ingresar a mi cuenta
                </h2>
                <Card className={classes.loginCard}>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Ingresar
                        </Button>
                    </form>
                    <LoadingBar show={loading} />
                    <div className={classes.errorContainer}>
                        { getErrorMessage(error) }
                    </div>
                </Card>
            </div>
        </Container>
    )
};
