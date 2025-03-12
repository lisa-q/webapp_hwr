import express from "express";
import { db } from "../firebaseAdmin.js";

const router = express.Router();

/**
 * 📦 Alle Produkte abrufen
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
 * 🔍 Einzelnes Produkt nach ID abrufen
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
 * 📈 Anzahl der Käufe für ein Produkt erhöhen
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
