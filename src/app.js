import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url';  // 🔹 IMPORTANTE

// Para __dirname en ESM
import { userRoutes } from './modules/user/routes/user.routes.js'
import { authRoutes } from './modules/user/routes//auth.routes.js'
import { productRoutes } from './modules/products/routes/product.routes.js'
import { categoryRoutes } from './modules/products/routes/category.routes.js'
import { inventoryRoutes } from './modules/inventory/routes/inventory.routes.js'
import { salesRouter } from './modules/sales/routes/sale.routes.js'
import { salesItemsRouter } from './modules/sales/routes/sale.items.routes.js'
import { taxRoutes } from './modules/products/routes/tax.routes.js'
import cors from './middlewares/cors/cors.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config()
const app = express()


app.disable('x-powered-by');
app.use(json())
app.use(cookieParser())
app.use(cors)


app.use('/storage', express.static(path.resolve(__dirname, '..', 'storage')));

app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/category', categoryRoutes)
app.use('/products', productRoutes)
app.use('/inventory', inventoryRoutes)
app.use('/sales', salesRouter)
app.use('/sale-items', salesItemsRouter)
app.use('/taxes', taxRoutes)


export default app

