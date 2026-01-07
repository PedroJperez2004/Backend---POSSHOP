import { z } from 'zod';

export const inventorySchema = z.object({
    product_id: z.number({
        required_error: 'El id del producto es obligatorio',
        invalid_type_error: 'El id del producto debe ser un número',
    }).int().positive(),

    quantity: z.number({
        required_error: 'La cantidad es obligatoria',
        invalid_type_error: 'La cantidad debe ser un número',
    }).int().nonnegative(),

    type: z.enum(['in', 'out'], {
        required_error: 'El tipo es obligatorio',
        invalid_type_error: 'El tipo debe ser "in" o "out"',
    }),

    note: z.string().optional().nullable(),
});
