import axios from "axios";
import { Product } from "../models/types";

const API_BASE_URL = "http://localhost:5000/products";

/**
 * Service-Klasse für Produktoperationen über das Backend-API.
 */
class ProductService {
    /**
     * Ruft alle Produkte über das Backend ab.
     * @returns {Promise<Product[]>} Ein Promise, das eine Liste von Produkten zurückgibt.
     */
    static async getAllProducts(): Promise<Product[]> {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    }

    /**
     * Ruft ein einzelnes Produkt anhand seiner ID ab.
     * @param {string} productId - Die ID des Produkts.
     * @returns {Promise<Product | null>} Ein Promise, das das Produkt oder `null` zurückgibt.
     */
    static async getProductById(productId: string): Promise<Product | null> {
        try {
            const response = await axios.get(`${API_BASE_URL}/${productId}`);
            return response.data;
        } catch (error) {
            console.error("Produkt nicht gefunden:", error);
            return null;
        }
    }

    /**
     * Erhöht die Anzahl der Käufe eines Produkts.
     * @param {string} productId - Die ID des Produkts.
     * @param {number} amount - Die Anzahl, um die die Käufe erhöht werden sollen.
     */
    static async incrementNumberOfBuys(productId: string, amount: number): Promise<void> {
        await axios.put(`${API_BASE_URL}/${productId}/incrementBuys`, { amount });
    }
}

export default ProductService;
