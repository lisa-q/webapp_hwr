import express from "express";
import { db } from "../firebaseAdmin.js";

const router = express.Router();


/**
 * Adds a product to the shopping cart. If the product already exists, its quantity is incremented.
 * @route POST /add
 * @param {string} req.body.deviceId - The unique identifier of the user's device.
 * @param {Object} req.body.cartItem - The item to be added to the cart.
 * @param {string} req.body.cartItem.id - The unique identifier of the product.
 * @returns {Object} JSON response indicating success.
 */
router.post("/add", async (req, res) => {
  const { deviceId, cartItem } = req.body;
  const itemRef = db.ref(`carts/${deviceId}/${cartItem.id}`);
  const snapshot = await itemRef.get();

  if (snapshot.exists()) {
    const existingItem = snapshot.val();
    const updatedQuantity = (existingItem.quantity ?? 1) + 1;
    await itemRef.set({ ...existingItem, quantity: updatedQuantity });
  } else {
    await itemRef.set({ ...cartItem, quantity: 1 });
  }

  res.json({ message: "Produkt zum Warenkorb hinzugefügt" });
});

/**
 * Removes a specific product from the shopping cart.
 * @route DELETE /:cartItemId
 * @param {string} req.query.deviceId - The unique identifier of the user's device.
 * @param {string} req.params.cartItemId - The ID of the item to remove.
 * @returns {Object} JSON response indicating success.
 */
router.delete("/:cartItemId", async (req, res) => {
  const { deviceId } = req.query;
  const { cartItemId } = req.params;
  await db.ref(`carts/${deviceId}/${cartItemId}`).remove();
  res.json({ message: "Produkt entfernt" });
});

/**
 * Clears all items from the user's shopping cart.
 * @route DELETE /clear
 * @param {string} req.query.deviceId - The unique identifier of the user's device.
 * @returns {Object} JSON response indicating success.
 */
router.delete("/clear", async (req, res) => {
  const { deviceId } = req.query;
  await db.ref(`carts/${deviceId}`).remove();
  res.json({ message: "Warenkorb geleert" });
});

/**
 * Sets up a real-time listener for cart updates using Server-Sent Events (SSE).
 * @route GET /listen/:deviceId
 * @param {string} req.params.deviceId - The unique identifier of the user's device.
 */
router.get("/listen/:deviceId", (req, res) => {
    const { deviceId } = req.params;
    const cartRef = db.ref(`carts/${deviceId}`);

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.write("event: connected\n");
    res.write(`data: "Listening for cart updates for device ${deviceId}"\n\n`);

    const sendCartUpdate = (snapshot) => {
        if (snapshot.exists()) {
            const cartItems = Object.entries(snapshot.val()).map(([key, value]) => ({
                id: key,
                ...value,
            }));
            res.write(`data: ${JSON.stringify(cartItems)}\n\n`);
        } else {
            res.write(`data: []\n\n`);
        }
    };

    cartRef.on("value", sendCartUpdate);

    req.on("close", () => {
        cartRef.off("value", sendCartUpdate);
        res.end();
    });
});

/**
 * Updates the quantity of a specific item in the shopping cart.
 * @route PUT /update/:cartItemId
 * @param {string} req.query.deviceId - The unique identifier of the user's device.
 * @param {string} req.params.cartItemId - The ID of the item to update.
 * @param {number} req.body.newQuantity - The new quantity of the item.
 * @returns {Object} JSON response indicating success.
 */
router.put("/update/:cartItemId", async (req, res) => {
    const { deviceId } = req.query;  
    const { cartItemId } = req.params;
    const { newQuantity } = req.body;

    if (!deviceId) {
        return res.status(400).json({ message: "Device ID fehlt" });
    }

    const itemRef = db.ref(`carts/${deviceId}/${cartItemId}`);
    const snapshot = await itemRef.get();

    if (!snapshot.exists()) {
        return res.status(404).json({ message: "Artikel nicht gefunden" });
    }

    await itemRef.update({ quantity: newQuantity });
    res.json({ message: "Artikelmenge aktualisiert" });
});

export default router;
