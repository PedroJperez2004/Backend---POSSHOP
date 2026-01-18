import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { userRoutes } from './modules/user/routes/user.routes.js'
import { authRoutes } from './modules/user/routes//auth.routes.js'
import { productRoutes } from './modules/products/routes/product.routes.js'
import { categoryRoutes } from './modules/products/routes/category.routes.js'
import { inventoryRoutes } from './modules/inventory/routes/inventory.routes.js'
import { productImagesRoutes } from './modules/products/routes/product.images.routes.js'
import { salesRouter } from './modules/sales/routes/sale.routes.js'
import { salesItemsRouter } from './modules/sales/routes/sale.items.routes.js'

dotenv.config()
const app = express()
app.use(json())
app.use(cookieParser())

app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/category', categoryRoutes)
app.use('/products', productRoutes)
app.use('/inventory', inventoryRoutes)
app.use('/product-images', productImagesRoutes)
app.use('/sales', salesRouter)
app.use('/sale-items', salesItemsRouter)

export default app

