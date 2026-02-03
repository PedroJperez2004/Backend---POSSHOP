import { z } from "zod";

const orderSchema = z.object({
    payment_method: z.enum(["cash", "card", "transfer"]),
    products: z.array(
        z.object({
            product_id: z.number().int().positive(),
            quantity: z.number().int().positive(),
        })
    ).nonempty(),
});
export default orderSchema;