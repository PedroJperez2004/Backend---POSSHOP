import { z } from 'zod';

export const categorySchema = z.object({
    name: z
        .string({
            required_error: 'El nombre es obligatorio',
        })
        .min(1, 'El nombre no puede estar vacío')
        .max(100, 'Máximo 100 caracteres')
        .refine((val) => isNaN(Number(val)), {
            message: 'El nombre de la categoría no puede ser solo números'
        }),

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
