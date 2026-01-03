export function authorize(...allowedRoles) {
    return (req, res, next) => {
        console.log('authorize')

        if (!req.user || !req.user.role) {
            return res.status(403).send({ message: "Access denied: No user role found" })
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).send({ message: "Access denied: Insufficient permissions" })
        }
        next()

    }
}
