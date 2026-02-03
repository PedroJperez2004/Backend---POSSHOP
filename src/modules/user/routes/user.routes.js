import { Router } from 'express'
import { UserController } from '../controllers/user.controller.js'
import { authenticate, authorize, validate, validatePartial } from '../../../middlewares/index.js'
import { loginSchema } from '../../../middlewares/validation/login.schema.js'
import { userSchema } from '../../../middlewares/validation/user.schema.js'

export const userRoutes = Router()

const userController = new UserController()

userRoutes.post('/login', validate(loginSchema), (req, res) => {
    userController.login(req, res)
}) //✖️
userRoutes.post('/logout', authenticate, authorize('employee', 'admin'), (req, res) => {
    userController.logout(req, res)
})//✖️
userRoutes.post('/register', authenticate, authorize('admin'), validate(userSchema), (req, res) => {
    userController.register(req, res)
})//✖️
userRoutes.get('/list-users', authenticate, authorize('admin'), (req, res) => {
    userController.listUsers(req, res)
})//✖️

userRoutes.get('/list-users/:id', authenticate, authorize('admin'), (req, res) => {
    userController.listUsersById(req, res)
})
userRoutes.patch('/:id/desactivate', authenticate, authorize('admin'), (req, res) => {
    userController.desactivateUser(req, res)
})
userRoutes.patch('/:id/activate', authenticate, authorize('admin'), (req, res) => {
    userController.activateUser(req, res)
})
userRoutes.patch('/:id/update', authenticate, authorize('admin'), validatePartial(userSchema), (req, res) => {
    userController.update(req, res)
})
// userRoutes.post('/refresh-token', (req, res) => {
//     userController.refreshToken(req, res)
// });

