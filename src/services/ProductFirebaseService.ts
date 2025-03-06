import { db } from "../../firebaseConfig";
import { ref, set, get, onValue, off, remove } from "firebase/database";
import { Product } from "../models/types";

class ProductFirebaseService {

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
    

    static async getProductById(productId: string): Promise<Product | null> {
        const dataRef = ref(db, `products/${productId}`);
        const snapshot = await get(dataRef);

        if (snapshot.exists()) {
            return { id: productId, ...snapshot.val() } as Product;
        } else {
            return null;
        }
    }

    static async addProduct(product: Omit<Product, "id">): Promise<string> {
        const newProductRef = ref(db, `products/${crypto.randomUUID()}`);
        await set(newProductRef, product);
        return newProductRef.key ?? "";
    }

    static async updateProduct(product: Product): Promise<void> {
        const dataRef = ref(db, `products/${product.id}`);
        await set(dataRef, product);
    }

    static async deleteProduct(productId: string): Promise<void> {
        const dataRef = ref(db, `products/${productId}`);
        await remove(dataRef);
    }

    static listenToProducts(callback: (products: Product[]) => void): () => void {
        const dataRef = ref(db, "products");
    
        const listener = onValue(dataRef, (snapshot) => {
            if (snapshot.exists()) {
                const productsObject = snapshot.val();
                const products = Object.entries(productsObject).map(([key, value]) => {
                    const productData = value as Omit<Product, "id">;
                    return {
                        id: key,
                        ...productData
                    };
                });
    
                callback(products);
            } else {
                callback([]);
            }
        });
    
        return () => off(dataRef, "value", listener);
    }
    
}

export default ProductFirebaseService;
