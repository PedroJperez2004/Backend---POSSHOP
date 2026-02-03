import { z } from "zod";

export const taxSchema = z.object({
    name: z.string()
        .min(1, "El nombre es obligatorio")
        .max(50, "El nombre es muy largo"),

    percentage: z.number()
        .min(0, "El porcentaje no puede ser negativo")
        .max(100, "El porcentaje no puede ser mayor a 100"),

    // Usamos enum para los predefinidos + un string genérico para "Otro"
    // O simplemente string() si quieres total libertad en el backend
    type: z.string().min(1, "El tipo de impuesto es obligatorio"),

    included_in_price: z.boolean({
        invalid_type_error: "Debe ser un valor booleano",
    }),
});