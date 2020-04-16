const redis = require(process.env.NODE_ENV === 'test' ? 'redis-mock' : 'redis');
const { promisify } = require("util");

const client = redis.createClient({
    host: process.env.NODE_ENV === 'development' ? 'localhost' : 'redis',
    port: 6379
});
client.on('connect', () => {
    client.set('TTL_RESTAURANTS', 60);
});

export const getAsync = promisify(client.get).bind(client);
export const setAsync = promisify(client.set).bind(client);
export const keysAsync = promisify(client.keys).bind(client);
export const hmsetAsync = promisify(client.hmset).bind(client);
export const expireAsync = promisify(client.expire).bind(client);
export const mgetAsync = promisify(client.mget).bind(client);

export default client;
