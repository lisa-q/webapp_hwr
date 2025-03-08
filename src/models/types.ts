export interface Product {
    id: string;
    image: string
    name: string;
    price: number;
    description: string;
}

export interface CartItem {
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
  }

export interface Order {
    id: string;
    createdAt: number;
    totalPrice: number;
    paymentMethod: string;
    shippingMethod: string;
    items: CartItem[];
  }