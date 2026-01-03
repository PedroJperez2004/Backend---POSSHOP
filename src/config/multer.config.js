import multer from 'multer';
import path from 'path';

// Función que devuelve el storage según tipo
const getStorage = (folderName) =>
    multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(process.cwd(), `storage/uploads/${folderName}`));
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = path.extname(file.originalname);
            cb(null, file.fieldname + '-' + uniqueSuffix + ext);
        }
    });

// Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes'), false);
    }
};

// Exportar función para usar en routers
export const uploadFile = (folderName) => multer({ storage: getStorage(folderName), fileFilter });
