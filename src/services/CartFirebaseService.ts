import { CartItem } from "../types/cartItem";
import { db } from "../../firebaseConfig";
import { ref, set, get, remove } from "firebase/database";

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
}

export default CartFirebaseService;
