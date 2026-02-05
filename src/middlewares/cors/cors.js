import cors from 'cors';

// Definimos los orígenes permitidos
const allowedOrigins = [
    'http://localhost:5173',
    'https://frontend-posshop.vercel.app', // Asegúrate de que esta sea tu URL real de Vercel
    'https://frontend-posshop-ajg3lchep-pedrojperez2004s-projects.vercel.app'
];

export default cors({
    origin: (origin, callback) => {
        // Permitir peticiones sin origen (como Postman o apps móviles) 
        // o si el origen está en nuestra lista
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});