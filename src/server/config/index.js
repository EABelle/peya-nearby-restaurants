import dotenv from 'dotenv';
dotenv.config();

const config = {
    baseURL: process.env.CLIENT_BASE_URL
};

export default config;
