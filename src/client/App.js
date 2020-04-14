import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import Login from "./views/Login";
import SearchRestaurants from "./views/SearchRestaurants";
import {
    BrowserRouter as Router, Redirect,
    Route,
    Switch
} from "react-router-dom";
import Header from "./components/Header";
import { CookiesProvider } from 'react-cookie';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (
            <div>
                <Header onLogout={ () => {} } />
                <Component {...props} />
            </div>
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
            <CookiesProvider>
                <ThemeProvider theme={theme}>
                    <Router>
                        <Switch>
                            <Route path="/login" component={Login} />
                            <PrivateRoute path="/search-restaurants" component={SearchRestaurants} />
                            <Redirect to={{ pathname: '/search-restaurants' }} />
                        </Switch>
                    </Router>
                </ThemeProvider>
            </CookiesProvider>
        </div>
    );
}

export default App;
