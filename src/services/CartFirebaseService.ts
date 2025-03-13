import axios from "axios";
import { CartItem } from "../models/types";
import DeviceUtils from "./DeviceUtils";

const API_BASE_URL = "http://localhost:5000/cart";

/**
 * Service for managing the shopping cart processing in the backend.
 */
class CartFirebaseService {
    /**
     * Fetches the current cart items for the device.
     * @returns {Promise<CartItem[]>} A promise resolving to the cart items.
     */
    static async getCurrentCart(): Promise<CartItem[]> {
        const deviceId = DeviceUtils.getDeviceId();
        const response = await axios.get(`${API_BASE_URL}/cart/${deviceId}`);
        return response.data;
    }

    /**
     * Adds an item to the cart. If the item already exists, increments the quantity.
     * @param {CartItem} cartItem - The item to add to the cart.
     */
    static async addToCart(cartItem: CartItem): Promise<void> {
        const deviceId = DeviceUtils.getDeviceId();
        await axios.post(`${API_BASE_URL}/add`, { deviceId, cartItem });
    }

    /**
     * Removes an item from the cart.
     * @param {string} cartItemId - The ID of the cart item to remove.
     */
    static async removeFromCart(cartItemId: string): Promise<void> {
        const deviceId = DeviceUtils.getDeviceId();
        await axios.delete(`${API_BASE_URL}/${cartItemId}?deviceId=${deviceId}`);
    }

    /**
     * Updates the quantity of a specific cart item.
     * If the quantity is zero, the item is removed.
     * @param {string} cartItemId - The ID of the cart item.
     * @param {number} newQuantity - The new quantity.
     */
    static async updateQuantityCartItemById(cartItemId: string, newQuantity: number): Promise<void> {
        const deviceId = DeviceUtils.getDeviceId();
        await axios.put(`${API_BASE_URL}/update/${cartItemId}?deviceId=${deviceId}`, { newQuantity });

    }

    /**
     * Clears all items from the cart.
     * @returns {Promise<void>} A promise that resolves when the cart is cleared.
     * @throws {Error} If the API request fails.
     */
    static async clearCart(): Promise<void> {
        const deviceId = DeviceUtils.getDeviceId();
        await axios.delete(`${API_BASE_URL}/clear?deviceId=${deviceId}`);
    }

    /**
     * Listens for real-time cart updates and executes the provided callback when updates occur.
     * @param {(cartItems: CartItem[]) => void} callback - A function to be called when cart updates are received.
     * @returns {() => void} A function to stop listening to cart updates.
     */
    static listenToCart(callback: (cartItems: CartItem[]) => void): () => void {
        const deviceId = DeviceUtils.getDeviceId();
        const eventSource = new EventSource(`${API_BASE_URL}/listen/${deviceId}`);
    
        eventSource.onmessage = (event) => {
            try {
                const cartItems = JSON.parse(event.data);
    
                if (Array.isArray(cartItems)) {
                    callback(cartItems);
                } else {
                    console.warn("Fehlformatierte Cart-Daten:", cartItems);
                    callback([]); 
                }
            } catch (error) {
                console.error("Fehler beim Parsen der Cart-Daten:", error);
                callback([]);
            }
        };
    
        return () => eventSource.close();
    }
    
    
}

export default CartFirebaseService;
