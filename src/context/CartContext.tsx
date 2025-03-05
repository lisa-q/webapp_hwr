import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../models/Product"; // Hier importierst du die Product-Schnittstelle

// Warenkorb-Typ
interface CartItem extends Product {
    quantity: number;
}

// Context-Typen
interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
}

// Der Warenkorb (cart) wird mit dem useState Hook im CartProvider gespeichert. Dieser Zustand hält eine Liste von
// CartItem-Objekten, die jeweils ein Produkt und die Menge (quantity) dieses Produkts enthalten.
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider-Komponente
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    //Diese Funktion wird verwendet, um ein Produkt zum Warenkorb hinzuzufügen. Wenn das Produkt bereits im Warenkorb ist
    // (durch die id identifiziert), wird die Menge (quantity) um eins erhöht. Andernfalls wird das Produkt mit einer
    // Anfangsmenge von 1 zum Warenkorb hinzugefügt.
    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    //Der CartContext.Provider stellt den cart und die addToCart Funktion zur Verfügung. Alles, was innerhalb des
    // CartProvider gerendert wird (z. B. die Produktdetailseiten oder das Hauptlayout), kann auf den Warenkorb
    // zugreifen und Artikel hinzufügen.
    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Mit dem useCart Hook können andere Komponenten (wie z.B. die Produktdetailseite) auf den cart zugreifen oder
// die addToCart Funktion aufrufen.
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart muss innerhalb eines CartProviders verwendet werden");
    }
    return context;
};
