// redis.client.js
// import { createClient } from 'redis';

// export  const redis = createClient({
//     url: 'redis://localhost:6379'
// });

// redis.on('error', err => {
//     console.error('Redis error:', err);
// });

// await redis.connect();


import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default redis;