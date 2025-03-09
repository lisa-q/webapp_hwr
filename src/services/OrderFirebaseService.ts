import { db } from "../../firebaseConfig";
import { ref, set, get, remove, push } from "firebase/database";
import { Order} from "../models/types";
import ProductFirebaseService from "./ProductFirebaseService";
import CartFirebaseService from "./CartFirebaseService";
import DeviceUtils from "./DeviceUtils";

/**
 * Service for managing orders in Firebase.
 */
class OrderFirebaseService {
    


    /**
     * Places an order with the given details and clears the cart.
     * @param {object} orderDetails - The order details including address, shipping, and payment method.
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
    }): Promise<void> {
        const deviceId = DeviceUtils.getDeviceId();
        const cartItems = await CartFirebaseService.getCurrentCart();

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

    /**
     * Retrieves the order history for the current device.
     * @returns {Promise<Order[]>} A promise resolving to the order history.
     */
    static async getOrderHistory(): Promise<Order[]> {
        const deviceId = DeviceUtils.getDeviceId();
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

export default OrderFirebaseService;