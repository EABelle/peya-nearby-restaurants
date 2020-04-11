import LoginClient from '../api/LoginClient';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const login = async (userName, password) => {
    const token = await LoginClient.login(userName, password);
    cookies.set('py_auth_token', token, {path: '/'});
};

export const logout = () => {
    cookies.remove('py_auth_token');
};

export const isAuthenticated = () => Boolean(cookies.get('py_auth_token'));
