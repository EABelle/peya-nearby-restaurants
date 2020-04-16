const environment = process.env.NODE_ENV || 'development';
const config = {
  development: {
    baseURL: process.env.REACT_APP_CLIENT_BASE_URL || 'http://localhost:3001/api',
  },
  test: {
    baseURL: process.env.REACT_APP_CLIENT_BASE_URL || 'http://localhost:3001/api',
  },
  staging: {
    baseURL: process.env.REACT_APP_CLIENT_BASE_URL || 'http://localhost:3001/api',
  },
  production: {
    baseURL: process.env.REACT_APP_CLIENT_BASE_URL || 'http://localhost:3001/api',
  },
};
export default config[environment];
