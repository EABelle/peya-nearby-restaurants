import redis from 'redis';

const client = redis.createClient({
    host: process.env.NODE_ENV === 'development' ? 'localhost' : 'redis',
    port: 6379
});
client.on('connect', () => {
    client.set('TTL_RESTAURANTS', 60);
});

export default client;
