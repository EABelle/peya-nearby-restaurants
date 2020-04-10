import redis from 'redis';

const client = redis.createClient({
    host: 'redis',
    port: 6379
});
client.on('connect', () => {
    console.log('Redis connected');
});

export default client;
