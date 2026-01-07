import multer from 'multer';

// Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes'), false);
    }
};

// Exportar función para usar en routers
export const uploadFile = () =>
    multer({
        storage: multer.memoryStorage(),
        fileFilter,
        limits: {
            fileSize: 5 * 1024 * 1024 // 5MB
        }
    });
