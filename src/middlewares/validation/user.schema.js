import z from 'zod';

export const userSchema = z.object({
    userName: z.string({
        invalid_type_error: 'El nombre de usuario debe ser un texto',
        required_error: 'El nombre de usuario es obligatorio'
    }).min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),

    firstName: z.string({
        invalid_type_error: 'El nombre debe ser un texto',
        required_error: 'El nombre es obligatorio'
    }).min(3, 'El nombre debe tener al menos 3 caracteres'),

    lastName: z.string({
        invalid_type_error: 'El apellido debe ser un texto',
        required_error: 'El apellido es obligatorio'
    }).min(3, 'El apellido debe tener al menos 3 caracteres'),

    email: z.string({
        invalid_type_error: 'El correo debe ser un texto',
        required_error: 'El correo es obligatorio'
    }).email('Ingresa un correo válido'),

    phone: z.string({
        invalid_type_error: 'El teléfono debe ser un texto',
        required_error: 'El teléfono es obligatorio'
    }).regex(/^\+?[1-9]\d{7,14}$/, 'Ingresa un número de teléfono válido'),

    password: z.string({
        invalid_type_error: 'La contraseña debe ser un texto',
        required_error: 'La contraseña es obligatoria'
    })
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .regex(/[a-zA-Z]/, 'La contraseña debe contener al menos una letra')
        .regex(/[0-9]/, 'La contraseña debe contener al menos un número')
        .regex(/[^a-zA-Z0-9]/, 'La contraseña debe contener al menos un símbolo'),

    role: z.enum(['admin', 'employee'], {
        required_error: 'El rol es obligatorio',
        invalid_type_error: 'El rol debe ser "admin" o "employee"'
    }),

    active: z.coerce.boolean({
        invalid_type_error: 'El valor de activo debe ser verdadero o falso'
    }).optional()
});
