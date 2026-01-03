
export function validate(schema) {
    return (req, res, next) => {

        console.log('validate')

        const result = schema.safeParse(req.body)

        if (!result.success) {
            return res.status(400).json({
                // Puedes armar un mensaje general o concatenar los mensajes individuales
                errors: result.error.issues.map(e => ({
                    field: e.path.join('.'),
                    message: e.message
                }))
            })
        }

        next()
    }
}

export function validatePartial(schema) {
    return (req, res, next) => {

        console.log('validate')

        const result = schema.partial().safeParse(req.body)

        if (!result.success) {
            return res.status(400).json({
                // Puedes armar un mensaje general o concatenar los mensajes individuales
                errors: result.error.issues.map(e => ({
                    field: e.path.join('.'),
                    message: e.message
                }))
            })
        }

        next()
    }
}

