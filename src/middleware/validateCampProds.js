import { getProductById } from "../services/product.js";

export async function validateCampProds(req, res, next) {
    const { products } = req.body;
    if (!products || !Array.isArray(products)) {
        return res.status(400).json({ message: "Products must be an array" });
    }

    try {
        for (const productId of products) {
            const product = await getProductById(productId);
            if (!product) {
                return res.status(400).json({ message: "Product not founded" });
            }
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internel server errer" });
    }
}

