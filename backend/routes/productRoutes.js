import express from "express";
import { db } from "../firebaseAdmin.js";

const router = express.Router();

/**
 * Retrieves all available products from the database.
 * @route GET /products
 * @returns {Object[]} 200 - An array of product objects
 * @returns {Object[]} 200 - An empty array if no products are found
 */
router.get("/", async (req, res) => {
    const productsRef = db.ref("products");
    const snapshot = await productsRef.get();

    if (snapshot.exists()) {
        const products = Object.entries(snapshot.val()).map(([id, value]) => ({
            id,
            ...value,
        }));
        res.json(products);
    } else {
        res.json([]);
    }
});

/**
 * Retrieves a specific product by its ID.
 * @route GET /products/{productId}
 * @param {string} productId - The unique identifier of the product
 * @returns {Object} 200 - The product object
 * @returns {Object} 404 - Error message if the product is not found
 */
router.get("/:productId", async (req, res) => {
    const { productId } = req.params;
    const productRef = db.ref(`products/${productId}`);
    const snapshot = await productRef.get();

    if (snapshot.exists()) {
        res.json({ id: productId, ...snapshot.val() });
    } else {
        res.status(404).json({ message: "Produkt nicht gefunden" });
    }
});

/**
 * Increments the number of purchases for a specific product.
 * @route PUT /products/{productId}/incrementBuys
 * @param {string} productId - The unique identifier of the product
 * @param {number} amount - The amount to increment the purchase count
 * @returns {Object} 200 - Success message with updated number of purchases
 */
router.put("/:productId/incrementBuys", async (req, res) => {
    const { productId } = req.params;
    const { amount } = req.body;

    const productRef = db.ref(`products/${productId}/numberOfBuys`);
    const snapshot = await productRef.get();
    const currentBuys = snapshot.exists() ? snapshot.val() : 0;

    await productRef.set(currentBuys + amount);
    res.json({ message: "Käufe aktualisiert", newNumberOfBuys: currentBuys + amount });
});

export default router;
