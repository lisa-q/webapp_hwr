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