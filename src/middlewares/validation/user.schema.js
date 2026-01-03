import z from 'zod';

export const userSchema = z.object({
    userName: z.string({
        invalid_type_error: 'Username must be a string',
        required_error: 'Username is required'
    }).min(3, 'Username must be at least 3 characters long'),
    firstName: z.string({
        invalid_type_error: 'FirstName must be a string',
        required_error: 'FirstName is required'
    }).min(3, 'FirstName must be at least 3 characters lon'),
    lastName: z.string({
        invalid_type_error: 'lastName must be a string',
        required_error: 'lastName is required'
    }).min(3, 'FirstName must be at least 3 characters lon'),
    email: z.string().email("Ingresa un caorreo válido"),
    phone: z.string().regex(
        /^\+?[1-9]\d{7,14}$/,
        "Número de teléfono inválido"
    ),
    password: z.string()
        .min(8, "Mínimo 8 caracteres")
        .regex(/[a-zA-Z]/, "Debe tener letras")
        .regex(/[0-9]/, "Debe tener números")
        .regex(/[^a-zA-Z0-9]/, "Debe tener al menos un símbolo"),
    role: z.enum(['admin', 'employee'], {
        required_error: 'Role is required',
        invalid_type_error: 'Role must be either admin or user'

    }),
    active: z
        .coerce
        .boolean({
            invalid_type_error: 'El parámetro active debe ser true o false'
        })
        .optional()
});

