import multer from 'multer';

const parser = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    },
    fileFilter: (req, file, cb) => {
        // Validamos que el mimetype empiece por "image/"
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Formato no permitido. Solo se aceptan imágenes.'), false);
        }
    }
});

export default parser;