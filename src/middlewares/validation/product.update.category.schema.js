import { z } from 'zod';

export const updateCategoryProductsSchema = z.object({
    id_category: z
        .coerce.number()
        .int('La categoría debe ser un entero')
        .positive('La categoría es obligatoria'),

    ids_products: z
        .array(
            z.coerce.number()
                .int('El id del producto debe ser un entero')
                .positive('Id de producto inválido')
        )
        .min(1, 'Debe enviar al menos un producto'),

});
