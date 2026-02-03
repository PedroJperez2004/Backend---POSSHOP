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
        .min(0, 'El stock no puede ser negativo')
        .optional(),

    id_tax: z
        .coerce.number()
        .int('El ID del impuesto debe ser un entero')
        .min(0, 'El ID del impuesto no puede ser negativo'),
    id_category: z
        .coerce.number()
        .int()
        .positive()
        .optional()
        .nullable(),

    active: z
        .coerce.boolean()
        .optional()
        .default(true),
    alt_text: z
        .string()
        .optional()
        .nullable(),
});
