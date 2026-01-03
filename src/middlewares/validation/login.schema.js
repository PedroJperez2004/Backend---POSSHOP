import z from 'zod'

export const loginSchema = z.object({
    email: z.string().email("Correo inválido"),
    password: z.string().min(3, "password requerido")
});
