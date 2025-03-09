import { useEffect, useState } from "react";
import { CartItem } from "../models/types";
import CartFirebaseService from "../services/CartFirebaseService";
import CartItemCard from "./CartItemCard";
import "./CartItemList.css";

/**
 * `CartItemList` is a React component that displays a list of items in the shopping cart.
 * It listens to updates from Firebase to populate the cart and allows users to delete items.
 * If the cart is empty, a message indicating the empty cart is shown.
 *
 * @component
 * @example
 * <CartItemList />
 *
 * @returns The rendered CartItemList component.
 */
const CartItemList = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const unsubscribe = CartFirebaseService.listenToCart(setCartItems);

    return () => {
      unsubscribe();
    };
  }, []);

  const handleDeleteItem = async (id: string) => {
    await CartFirebaseService.removeFromCart(id);
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  return (
    <div className="cart-items-container">
      {cartItems.length > 0 ? (
        <ul className="cart-items">
          {cartItems.map((item) => (
            <CartItemCard
              key={item.id}
              cartItem={item}
              onDelete={handleDeleteItem}
            />
          ))}
        </ul>
      ) : (
        <div className="text-center">
          <i className="bi bi-cart-x bi-4x"></i>
          <p>Dein Warenkorb ist leer.</p>
        </div>
      )}
    </div>
  );
};

export default CartItemList;
