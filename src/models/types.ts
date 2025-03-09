/**
 * Represents a product available in the shop.
 * 
 * @interface Product
 * @property {string} id - A unique identifier for the product.
 * @property {string} image - The URL of the product image.
 * @property {string} name - The name of the product.
 * @property {number} price - The price of the product.
 * @property {string} description - A description of the product.
 * @property {number} numberOfBuys - The number of times the product has been purchased.
 */
export interface Product {
    id: string;
    image: string
    name: string;
    price: number;
    description: string;
    numberOfBuys: number;
}

/**
 * Represents an item in the cart.
 * 
 * @interface CartItem
 * @property {string} id - A unique identifier for the cart item.
 * @property {string} name - The name of the cart item.
 * @property {string} image - The URL of the cart item image.
 * @property {number} quantity - The quantity of the cart item.
 * @property {number} price - The price of a single unit of the cart item.
 */
export interface CartItem {
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
  }

  /**
 * Represents an order placed by a user.
 * 
 * @interface Order
 * @property {string} id - A unique identifier for the order.
 * @property {number} createdAt - The timestamp when the order was created.
 * @property {number} totalPrice - The total price of the order.
 * @property {string} paymentMethod - The payment method used for the order.
 * @property {string} shippingMethod - The shipping method chosen for the order.
 * @property {CartItem[]} items - The list of items in the order.
 */
export interface Order {
    id: string;
    createdAt: number;
    totalPrice: number;
    paymentMethod: string;
    shippingMethod: string;
    items: CartItem[];
  }