// import { Sequelize } from "sequelize";
// import dotenv from 'dotenv'

// dotenv.config()
// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASS,
//     {
//         host: process.env.DB_HOST,
//         dialect: 'mysql'
//     }
// )

// export default sequelize


// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";

// dotenv.config();

// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         dialect: "mysql",
//         logging: false,
//         dialectOptions: {
//             ssl: {
//                 require: true,
//                 rejectUnauthorized: false  
//             }
//         }
//     }
// );

// export default sequelize;
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        dialect: "mysql",
        logging: false,
        // Aquí está la clave: solo aplica SSL si es producción
        dialectOptions: isProduction ? {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        } : {} 
    }
);

// Prueba de conexión rápida para el desarrollador
try {
    await sequelize.authenticate();
    console.log(`✅ MySQL conectado en modo: ${isProduction ? 'PRODUCCIÓN' : 'DESARROLLO (Docker)'}`);
} catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error.message);
}

export default sequelize;