import dotenv from 'dotenv';
dotenv.config();

const config = {
    baseURL: process.env.NODE_ENV === 'test' ? 'http://test-api.pedidosya.com/' : process.env.CLIENT_BASE_URL
};

export default config;
