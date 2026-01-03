import Router from "express";

export const productRoutes = Router()

productRoutes.get('/products', (req, res) => {
    res.send('Hola desde los productos')
})