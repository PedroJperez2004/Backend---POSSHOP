import fs from 'fs'
import path from 'path'

export const deleteImage = (imagePath) => {
    if (!imagePath) return

    // Quitar la barra inicial si la tiene
    const fullPath = path.join(process.cwd(), imagePath.replace(/^\/+/, ''))

    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath)
        console.log(`Imagen eliminada: ${fullPath}`)
    } else {
        console.log(`No encontrada: ${fullPath}`)
    }
}

export const deleteImages = (images = []) => {
    if (!Array.isArray(images)) return

    images.forEach(image => deleteImage(image))
}
