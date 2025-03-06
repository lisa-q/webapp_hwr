import React, { useEffect, useState } from "react";
import { CartItem } from "../models/types";
import CartItemComponent from "../components/CartItemComponent";
import "./Cart.css";
import CartFirebaseService from "../services/CartFirebaseService";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await CartFirebaseService.getCurrentCart();
      setCartItems(items);
    };
    fetchCartItems();
  }, []);

  const handleDeleteItem = async (id: string) => {
    try {
      await CartFirebaseService.removeFromCart(id);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      console.log("Item gelöscht:", id);
    } catch (error) {
      console.error("Fehler beim Löschen des Items:", error);
    }
  };

  return (
    <div className="cart-container">
      <h1>Warenkorb</h1>
      {cartItems.length === 0 ? (
        <p>Dein Warenkorb ist leer.</p>
      ) : (
        <>
          <div className="cart-items-wrapper">
            <ul className="list-cartItems">
              {cartItems.map((item) => (
                <CartItemComponent
                  key={item.id}
                  cartItem={item}
                  onDelete={handleDeleteItem}
                />
              ))}
            </ul>
          </div>
          <div className="cart-total">
            <h2>
              Gesamt:{" "}
              {cartItems
                .reduce((total, item) => total + item.quantity * item.price, 0)
                .toFixed(2)}{" "}
              €
            </h2>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
