import { createClient } from 'redis';
import { Redis } from "@upstash/redis"; // Para producción
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

let redis;

if (isProduction) {
    // Configuración para Upstash (Producción)
    redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    console.log('✅ Redis conectado a Upstash (Producción)');
} else {
    // Configuración para Docker (Local)
    redis = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379'
    });

    redis.on('error', err => console.error('❌ Redis Local Error:', err));

    await redis.connect();
    console.log('✅ Redis conectado a Docker (Local)');
}

export default redis;