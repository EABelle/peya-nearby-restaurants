const environment = process.env.NODE_ENV || 'development';
const config = {
  development: {
    baseURL: 'http://localhost:3000/api',
  },
  test: {
    baseURL: 'http://localhost:3000/api',
  },
  staging: {
    baseURL: 'http://localhost:3000/api',
  },
  production: {
    baseURL: 'http://localhost:3000/api',
  },
};
export default config[environment];
