import { z } from 'zod';

export const categorySchema = z.object({
    name: z
        .string({
            required_error: 'El nombre de la categoría es obligatorio',
            invalid_type_error: 'El nombre debe ser un texto'
        })
        .min(1, { message: 'El nombre no puede estar vacío' })
        .max(100, { message: 'El nombre no puede superar 100 caracteres' }),

    description: z
        .string({ invalid_type_error: 'La descripción debe ser un texto' })
        .optional(), // permitimos null o undefined

    active: z
        .coerce
        .boolean({
            invalid_type_error: 'El parámetro active debe ser true o false'
        })
        .optional()
});
