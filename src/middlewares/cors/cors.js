import cors from 'cors';

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://miapp.com"
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS bloqueado 🚫"));
        }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true
};


export default cors(corsOptions);
