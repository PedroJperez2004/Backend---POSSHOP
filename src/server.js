// import app from './app.js'
// const PORT = process.env.PORT ?? 3000

// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`)

// })


import app from "./app.js";
import sequelize from "./config/database.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Conectado a MySQL");

        app.listen(PORT, () => {
            console.log(`🚀 Server listening on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ No se pudo conectar a la DB:", error.message);
        process.exit(1);
    }
};

startServer();
