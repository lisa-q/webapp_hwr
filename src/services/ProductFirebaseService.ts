import { db } from "../../firebaseConfig";
import { ref, set, get, onValue, off, remove } from "firebase/database";
import { Product } from "../models/types";


/**
 * Service class for handling product-related operations in Firebase Realtime Database.
 */
class ProductFirebaseService {

     /**
     * Retrieves all products from the database.
     * @returns {Promise<Product[]>} A promise that resolves to an array of products.
     */
    static async getAllProducts(): Promise<Product[]> {
        const dataRef = ref(db, "products");
        const snapshot = await get(dataRef);
    
        if (snapshot.exists()) {
            const productsObject = snapshot.val();
            return Object.entries(productsObject).map(([key, value]) => {
                const productData = value as Omit<Product, "id">;
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
     * Retrieves a single product by its ID.
     * @param {string} productId - The ID of the product to retrieve.
     * @returns {Promise<Product | null>} A promise that resolves to the product or null if not found.
     */
    static async getProductById(productId: string): Promise<Product | null> {
        const dataRef = ref(db, `products/${productId}`);
        const snapshot = await get(dataRef);

        if (snapshot.exists()) {
            return { id: productId, ...snapshot.val() } as Product;
        } else {
            return null;
        }
    }

    /**
     * Increments the number of times a product has been purchased.
     * @param {string} productId - The ID of the product.
     * @param {number} amount - The amount to increment the purchase count by.
     * @returns {Promise<void>} A promise that resolves when the update is complete.
     */
    static async incrementNumberOfBuys(productId: string, amount: number): Promise<void> {
        const productRef = ref(db, `products/${productId}/numberOfBuys`);
        const snapshot = await get(productRef);
        const currentBuys = snapshot.exists() ? snapshot.val() : 0;
        await set(productRef, currentBuys + amount);
    }
    
}

export default ProductFirebaseService;
