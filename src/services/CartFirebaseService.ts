import { CartItem } from "../models/types";
import { Order } from "../models/types";
import { db } from "../../firebaseConfig";
import { ref, set, get, remove, push, onValue, off } from "firebase/database";
import ProductFirebaseService from "./ProductFirebaseService";

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
    
    static listenToCart(callback: (cartItems: CartItem[]) => void): () => void {
        const deviceId = this.getDeviceId();
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
  

    static async addToCart(cartItem: CartItem): Promise<void> {
        const deviceId = this.getDeviceId();
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
    

    static async removeFromCart(cartItemId: string): Promise<void> {
        const deviceId = this.getDeviceId();
        const dataRef = ref(db, `carts/${deviceId}/${cartItemId}`);
        await remove(dataRef);
    }

    static async updateQuantityCartItemById(cartItemId: string, newQuantity: number): Promise<void> {
        const deviceId = this.getDeviceId();
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
    }): Promise<void> {
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
            address: orderDetails.address,
            shippingMethod: orderDetails.shippingMethod,
            paymentMethod: orderDetails.paymentMethod,
            items: cartItems,
            totalPrice: parseFloat(totalPrice.toFixed(2))
        });

        for (const item of cartItems) {
            await ProductFirebaseService.incrementNumberOfBuys(item.id, item.quantity ?? 1);
        }

        const cartRef = ref(db, `carts/${deviceId}`);
        await remove(cartRef);
    }

      static async getOrderHistory(): Promise<Order[]> {
        const deviceId = this.getDeviceId();
        const ordersRef = ref(db, `orders/${deviceId}`);
        const snapshot = await get(ordersRef);
    
        if (snapshot.exists()) {
            const ordersObject = snapshot.val();
            return Object.entries(ordersObject).map(([key, value]) => {
                const orderData = value as Omit<Order, "id">; 
                return {
                    id: key, 
                    ...orderData 
                };
            });
        } else {
            return [];
        }
    }
}

export default CartFirebaseService;