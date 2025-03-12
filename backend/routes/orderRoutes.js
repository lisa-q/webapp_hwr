import express from "express";
import { db } from "../firebaseAdmin.js";

const router = express.Router();

/**
 * Retrieves the order history for a specific device.
 * @route GET /history/:deviceId
 * @param {string} deviceId - The unique identifier of the device.
 * @returns {Object[]} Array of order objects if found, otherwise a 404 error.
 */
router.get("/history/:deviceId", async (req, res) => {
    const { deviceId } = req.params;  // ✅ URL-Parameter verwenden
    const ordersRef = db.ref(`orders/${deviceId}`);
    const snapshot = await ordersRef.get();
  
    if (snapshot.exists()) {
      const orders = Object.entries(snapshot.val()).map(([key, value]) => ({
        id: key,
        ...value,
      }));
      res.json(orders);
    } else {
      res.status(404).json({ error: "Keine Bestellungen gefunden!" });
    }
  });
  

/**
 * Creates a new order for a specific device.
 * @route POST /create
 * @param {string} deviceId - The unique identifier of the device.
 * @param {Object} orderDetails - Details of the order including address, shipping method, and payment method.
 * @param {Object[]} cartItems - List of items in the cart.
 * @returns {Object} Success message upon order creation, otherwise a 400 error if the cart is empty.
 */
router.post("/create", async (req, res) => {
    const { deviceId, orderDetails, cartItems } = req.body;
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Warenkorb ist leer!" });
    }
  
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0);
    const ordersRef = db.ref(`orders/${deviceId}`);
    const newOrderRef = ordersRef.push();
  
    await newOrderRef.set({
      createdAt: new Date().toISOString(),
      address: orderDetails.address,
      shippingMethod: orderDetails.shippingMethod,
      paymentMethod: orderDetails.paymentMethod,
      items: cartItems,
      totalPrice: parseFloat(totalPrice.toFixed(2)),
    });
  
    await db.ref(`carts/${deviceId}`).remove();
    res.json({ message: "Bestellung erfolgreich erstellt" });
  });
export default router;
