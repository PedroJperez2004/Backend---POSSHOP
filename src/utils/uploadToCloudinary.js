import cloudinary from '../config/cloudinary.js';

/**
 * Sube un archivo a Cloudinary
 * @param {Object} file - objeto de multer (tiene file.buffer y file.originalname)
 * @param {String} folder - carpeta virtual en Cloudinary
 * @returns {Promise<String>} URL pública de la imagen
 */
export const uploadToCloudinary = async (file, folder = 'products') => {
    if (!file || !file.buffer) throw new Error('Archivo no válido');

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: `posshop/${folder}`,
                transformation: [{ width: 800, height: 800, crop: 'limit' }],
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url); // URL pública de la imagen
            }
        );

        stream.end(file.buffer); // subimos el buffer de memoria
    });
};
