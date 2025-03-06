import { CartItem } from "../models/types";
import { db } from "../../firebaseConfig";
import { ref, set, get, remove, push } from "firebase/database";

class CartFirebaseService {
    private static getDeviceId(): string {
        let deviceId = localStorage.getItem("device_id");
        if (!deviceId) {
            deviceId = crypto.randomUUID();
            localStorage.setItem("device_id", deviceId);
        }
        return deviceId;
    }

    static async getCurrentCart(): Promise<CartItem[]> {
        const deviceId = this.getDeviceId();
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

    static async addToCart(cartItem: CartItem): Promise<void> {
        const deviceId = this.getDeviceId();
        const dataRef = ref(db, `carts/${deviceId}/${cartItem.id}`);
        await set(dataRef, cartItem);
    }

    static async removeFromCart(cartItemId: string): Promise<void> {
        const deviceId = this.getDeviceId();
        const dataRef = ref(db, `carts/${deviceId}/${cartItemId}`);
        await remove(dataRef);
    }

    static async placeOrder(): Promise<void> {
        const deviceId = this.getDeviceId();
        const cartItems = await this.getCurrentCart();
    
        if (cartItems.length === 0) {
            throw new Error("Cart is empty, cannot place order.");
        }
    
        const totalPrice = cartItems.reduce((sum, item) => {
            return sum + (item.price * (item.quantity ?? 1));
        }, 0);
    
        const ordersListRef = ref(db, `orders/${deviceId}`);
        const newOrderRef = push(ordersListRef);
    
        await set(newOrderRef, {
            createdAt: new Date().toISOString(),
            items: cartItems,
            totalPrice: parseFloat(totalPrice.toFixed(2))
        });
    
        const cartRef = ref(db, `carts/${deviceId}`);
        await remove(cartRef);
    }
    
    
}

export default CartFirebaseService;
