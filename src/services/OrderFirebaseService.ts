import axios from "axios";
import { Order } from "../models/types";
import DeviceUtils from "./DeviceUtils";
import { CartItem } from "../models/types";

const API_BASE_URL = "http://localhost:5000/orders";

/**
 * Service for managing orders via backend API.
 */
class OrderService {
    /**
     * Erstellt eine neue Bestellung und übergibt die Cart-Items explizit.
     * @param {object} orderDetails - Die Bestelldetails (Adresse, Versand, Zahlung).
     * @param {CartItem[]} cartItems - Die zu bestellenden Warenkorbartikel.
     */
    static async placeOrder(orderDetails: {
        address: {
            name: string;
            address: string;
            city: string;
            postalCode: string;
            country: string;
        };
        shippingMethod: string;
        paymentMethod: string;
    }, cartItems: CartItem[]): Promise<void> {
        const deviceId = DeviceUtils.getDeviceId();

        // 🔹 Prüfen, ob cartItems leer sind
        if (!cartItems || cartItems.length === 0) {
            throw new Error("Cart is empty, cannot place order.");
        }

        // 🔹 Berechnung des Gesamtpreises mit validierten Items
        const totalPrice = cartItems.reduce((sum, item) => {
            return sum + (item.price * (item.quantity ?? 1));
        }, 0);

        await axios.post(`${API_BASE_URL}/create`, {
            deviceId,
            createdAt: new Date().toISOString(),
            orderDetails,
            cartItems,
            totalPrice: parseFloat(totalPrice.toFixed(2)),
        });
    }
    

    /**
     * Retrieves the order history for the current device.
     * @returns {Promise<Order[]>} A promise resolving to the order history.
     */
    static async getOrderHistory(): Promise<Order[]> {
        const deviceId = DeviceUtils.getDeviceId();
        const response = await axios.get(`${API_BASE_URL}/history/${deviceId}`);
        return response.data;
    }
}

export default OrderService;
