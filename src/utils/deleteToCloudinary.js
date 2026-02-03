import cloudinary from '../config/cloudinary.js';

/**
 * Borra imágenes de Cloudinary usando sus URLs
 * @param {Array} imageUrls - Lista de URLs completas de Cloudinary
 */
export const deleteImagesToCloudinary = async (imageUrls = []) => {
    if (!Array.isArray(imageUrls) || imageUrls.length === 0) return;

    const deletePromises = imageUrls.map(async (url) => {
        try {
            // 1. Extraemos el public_id de la URL
            // Ejemplo URL: https://res.cloudinary.com/demo/image/upload/v12345/posshop/products/abc.jpg
            // Queremos: posshop/products/abc

            const parts = url.split('/');
            const uploadIndex = parts.indexOf('upload');

            // Tomamos todo lo que está después de 'upload/' y la versión (v12345/)
            const pathParts = parts.slice(uploadIndex + 2);
            const publicIdWithExtension = pathParts.join('/');

            // Quitamos la extensión (.jpg, .png, etc.)
            const publicId = publicIdWithExtension.split('.')[0];

            console.log(`Intentando eliminar de Cloudinary: ${publicId}`);
            return await cloudinary.uploader.destroy(publicId);

        } catch (err) {
            console.error(`Error procesando URL ${url}:`, err);
        }
    });

    return await Promise.all(deletePromises);
};