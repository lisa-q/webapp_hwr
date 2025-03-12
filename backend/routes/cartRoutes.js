import express from "express";
import { db } from "../firebaseAdmin.js";

const router = express.Router();


/**
 * ➕ Ein Produkt zum Warenkorb hinzufügen
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
 * 🗑️ Ein Produkt aus dem Warenkorb entfernen
 */
router.delete("/:cartItemId", async (req, res) => {
  const { deviceId } = req.query;
  const { cartItemId } = req.params;
  await db.ref(`carts/${deviceId}/${cartItemId}`).remove();
  res.json({ message: "Produkt entfernt" });
});

/**
 * 🔄 Den gesamten Warenkorb leeren
 */
router.delete("/clear", async (req, res) => {
  const { deviceId } = req.query;
  await db.ref(`carts/${deviceId}`).remove();
  res.json({ message: "Warenkorb geleert" });
});

/**
 * 🎧 Echtzeit-Listener für den Warenkorb eines Geräts
 */
router.get("/listen/:deviceId", (req, res) => {
    const { deviceId } = req.params;
    const cartRef = db.ref(`carts/${deviceId}`);

    // Set headers für Server-Sent Events (SSE)
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Send initial connection message
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

    // Firebase Listener für Echtzeit-Updates
    cartRef.on("value", sendCartUpdate);

    // Verbindung schließen & Listener entfernen, wenn Client trennt
    req.on("close", () => {
        cartRef.off("value", sendCartUpdate);
        res.end();
    });
});

router.put("/update/:cartItemId", async (req, res) => {
    const { deviceId } = req.query;  // Hole deviceId aus der Query
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

router.get("/cart/:deviceId", async (req, res) => {
    const { deviceId } = req.params;

    if (!deviceId) {
        return res.status(400).json({ message: "Device ID fehlt" });
    }

    const cartRef = db.ref(`carts/${deviceId}`);
    const snapshot = await cartRef.get();

    if (!snapshot.exists()) {
        return res.status(404).json({ message: "Warenkorb nicht gefunden" });
    }

    res.json(snapshot.exists() ? snapshot.val() : []);
});

export default router;
