export function authorize(...allowedRoles) {
    return (req, res, next) => {

        if (!req.user || !req.user.role) {
            return res.status(403).send({ message: "Access denied: No user role found" })
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).send({ message: "Acceso denegado: Permisos insuficientes" })
        }
        next()

    }
}
