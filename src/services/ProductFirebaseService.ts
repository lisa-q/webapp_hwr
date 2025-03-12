import axios from "axios";
import { Product } from "../models/types";

const API_BASE_URL = "http://localhost:5000/products";

/**
 * Service class for handling product operations via the backend API.
 */
class ProductService {
    /**
     * Retrieves all products from the backend.
     * @returns {Promise<Product[]>} A promise that resolves to a list of products.
     */
    static async getAllProducts(): Promise<Product[]> {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    }

    /**
     * Fetches a single product by its ID.
     * @param {string} productId - The ID of the product.
     * @returns {Promise<Product | null>} A promise that resolves to the product or `null` if not found.
     */
    static async getProductById(productId: string): Promise<Product | null> {
        try {
            const response = await axios.get(`${API_BASE_URL}/${productId}`);
            return response.data;
        } catch (error) {
            console.error("Product not found:", error);
            return null;
        }
    }

     /**
     * Increases the purchase count of a specific product.
     * @param {string} productId - The ID of the product.
     * @param {number} amount - The amount by which the purchase count should be increased.
     */
    static async incrementNumberOfBuys(productId: string, amount: number): Promise<void> {
        await axios.put(`${API_BASE_URL}/${productId}/incrementBuys`, { amount });
    }
}

export default ProductService;
