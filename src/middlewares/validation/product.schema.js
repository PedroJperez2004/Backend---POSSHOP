import { z } from 'zod';

export const productSchema = z.object({
    name: z
        .string()
        .min(1, 'El nombre es obligatorio')
        .max(100, 'Máximo 100 caracteres'),

    description: z
        .string()
        .optional()
        .nullable(),

    price: z
        .coerce.number()
        .positive('El precio debe ser mayor a 0'),

    stock: z
        .coerce.number()
        .int('El stock debe ser un entero')
        .min(0, 'El stock no puede ser negativo'),

    id_category: z
        .coerce.number()
        .int()
        .positive()
        .optional()
        .nullable(),

    id_shop: z
        .coerce.number()
        .int()
        .positive('La tienda es obligatoria'),

    active: z
        .coerce.boolean()
        .optional()
        .default(true),
});
