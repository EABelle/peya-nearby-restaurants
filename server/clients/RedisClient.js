import redis from 'redis';

const client = redis.createClient({
    host: process.env.NODE_ENV === 'development' ? 'localhost' : 'redis',
    port: 6379
});
client.on('connect', () => {
    console.log('Redis connected');
});

export default client;
