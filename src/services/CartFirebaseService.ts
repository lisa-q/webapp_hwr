import { db } from "../../firebaseConfig";
import { ref, set, get, remove, onValue, off } from "firebase/database";
import { CartItem } from "../models/types";
import DeviceUtils from "./DeviceUtils";

/**
 * Service for managing the shopping cart processing in Firebase.
 * Handles adding, removing, updating items to the current cart.
 */
class CartFirebaseService {
   
    /**
     * Fetches the current cart items for the device.
     * @returns {Promise<CartItem[]>} A promise resolving to the cart items.
     */
    static async getCurrentCart(): Promise<CartItem[]> {
        const deviceId = DeviceUtils.getDeviceId();
        const dataRef = ref(db, `carts/${deviceId}`);
        const snapshot = await get(dataRef);
    
        if (snapshot.exists()) {
            const productsObject = snapshot.val();
            return Object.entries(productsObject).map(([key, value]) => {
                const productData = value as Omit<CartItem, "id">;
                return {
                    id: key,
                    ...productData
                };
            });
        } else {
            return [];
        }
    }
    
     /**
     * Listens for changes in the cart and invokes a callback with the updated cart items.
     * @param {function} callback - The function to be called with the updated cart items.
     * @returns {() => void} A function to unsubscribe from updates.
     */
    static listenToCart(callback: (cartItems: CartItem[]) => void): () => void {
        const deviceId = DeviceUtils.getDeviceId();
        const dataRef = ref(db, `carts/${deviceId}`);
        const listener = onValue(dataRef, (snapshot) => {
          if (snapshot.exists()) {
              const cartObject = snapshot.val();
              const cartItems = Object.entries(cartObject).map(([key, value]) => {
                  const productData = value as Omit<CartItem, "id">;
                  return {
                      id: key,
                      ...productData
                  };
              });
  
              callback(cartItems);
          } else {
              callback([]);
          }
      });
      return () => off(dataRef, "value", listener);
    }
  
    /**
     * Adds an item to the cart. If the item already exists, increments the quantity.
     * @param {CartItem} cartItem - The item to add to the cart.
     */
    static async addToCart(cartItem: CartItem): Promise<void> {
        const deviceId = DeviceUtils.getDeviceId();
        const dataRef = ref(db, `carts/${deviceId}/${cartItem.id}`);
        const snapshot = await get(dataRef);
    
        if (snapshot.exists()) {
            const existingItem = snapshot.val() as CartItem;
            const updatedQuantity = (existingItem.quantity ?? 1) + 1;
            await set(dataRef, { ...existingItem, quantity: updatedQuantity });
        } else {
            await set(dataRef, { ...cartItem, quantity: 1 });
        }
    }
    
    /**
     * Removes an item from the cart.
     * @param {string} cartItemId - The ID of the cart item to remove.
     */
    static async removeFromCart(cartItemId: string): Promise<void> {
        const deviceId = DeviceUtils.getDeviceId();
        const dataRef = ref(db, `carts/${deviceId}/${cartItemId}`);
        await remove(dataRef);
    }

    /**
     * Updates the quantity of a specific cart item.
     * If the quantity is zero, the item is removed.
     * @param {string} cartItemId - The ID of the cart item.
     * @param {number} newQuantity - The new quantity.
     */
    static async updateQuantityCartItemById(cartItemId: string, newQuantity: number): Promise<void> {
        const deviceId = DeviceUtils.getDeviceId();
        const itemRef = ref(db, `carts/${deviceId}/${cartItemId}`);
    
        if (newQuantity > 0) {
            const snapshot = await get(itemRef);
    
            if (snapshot.exists()) {
                const existingData = snapshot.val();
    
                await set(itemRef, {
                    ...existingData,
                    quantity: newQuantity,
                });
            }
        } else {
            await remove(itemRef);
        }
    }

}

export default CartFirebaseService;