import clientApi from '../client';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const login = async (userName, password) => {
    const token = await clientApi.login(userName, password);
    cookies.set('py_auth_token', token, {path: '/'});
};

export const isAuthenticated = () => Boolean(cookies.get('py_auth_token'));
