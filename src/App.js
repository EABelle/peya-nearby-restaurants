import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import Login from "./views/Login";
import SearchRestaurants from "./views/SearchRestaurants";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from "react-router-dom";
import { isAuthenticated } from "./services/LoginService";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (
            isAuthenticated()
                ? <Component {...props} />
                : (
                    <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location },
                    }}
                    />
                )
        )}
    />
);

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#f52F41',
            main: '#f52F41',
            dark: '#f52F41'
        }
    },
});

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <PrivateRoute path="/search-restaurants" component={SearchRestaurants} />
                    </Switch>
                </Router>
            </ThemeProvider>
        </div>
    );
}

export default App;
