import { useEffect, useState } from "react";
import CartItemComponent from "./CartItemComponent";
import { CartItem } from "../models/types";
import CartFirebaseService from "../services/CartFirebaseService";
import "./CartItemList.css";

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
            <CartItemComponent
              key={item.id}
              cartItem={item}
              onDelete={handleDeleteItem}
            />
          ))}
        </ul>
      ) : (
        <p>Dein Warenkorb ist leer.</p>
      )}
    </div>
  );
};

export default CartItemList;
