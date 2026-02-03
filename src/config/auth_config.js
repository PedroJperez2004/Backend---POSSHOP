import 'dotenv/config';

export const {
    SALT_ROUNDS,
    SECRET_JWT_KEY,
    REFRESH_JWT_SECRET
} = process.env;

if (!SECRET_JWT_KEY || !REFRESH_JWT_SECRET || !SALT_ROUNDS) {
    throw new Error('❌ Variables de entorno de auth no configuradas');
}
