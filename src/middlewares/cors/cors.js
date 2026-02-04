// import cors from 'cors';

// const allowedOrigins = [
//     // "http://localhost:5173",
//     // "http://localhost:3000",

//    
// ];

// const corsOptions = {
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error("CORS bloqueado 🚫"));
//         }
//     },
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     credentials: true
// };


// export default cors(corsOptions);


const allowedOrigins = [
    'http://localhost:5173',
    'https://frontend-posshop.vercel.app' // <--- PEGA AQUÍ LA DE VERCEL
];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));