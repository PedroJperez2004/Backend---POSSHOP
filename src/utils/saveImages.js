import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';

/**
 * Guarda imágenes recibidas por multer (memoryStorage)
 * @param {Array} files - req.files
 * @param {String} folderName - carpeta destino (ej: 'products')
 * @returns {Array<String>} paths públicos de las imágenes
 */
export async function saveImages(files, folderName) {
    if (!files || !files.length) return [];

    const uploadDir = path.join(
        process.cwd(),
        `storage/uploads/${folderName}`
    );

    // Crear carpeta si no existe
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const savedImages = [];

    for (const file of files) {
        const ext = path.extname(file.originalname);
        const filename = `${uuid()}${ext}`;
        const filepath = path.join(uploadDir, filename);

        // Guardar buffer en disco
        fs.writeFileSync(filepath, file.buffer);

        // Path que guardarás en BD
        savedImages.push(`/storage/uploads/${folderName}/${filename}`);
    }

    return savedImages;
}
