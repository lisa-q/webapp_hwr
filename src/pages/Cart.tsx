import React, { useEffect, useState } from "react";
import { CartItem } from "../models/types";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import CartFirebaseService from "../services/CartFirebaseService";
import CartItemList from "../components/CartItemList";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await CartFirebaseService.getCurrentCart();
      setCartItems(items);
    };
    fetchCartItems();
  }, []);

  const handleOpenCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      <h1>Warenkorb</h1>
      {cartItems.length === 0 ? (
        <p>Dein Warenkorb ist leer.</p>
      ) : (
        <>
          <CartItemList />
          <div className="cart-total">
            <h2>
              Gesamt:{" "}
              {cartItems
                .reduce((total, item) => total + item.quantity * item.price, 0)
                .toFixed(2)}{" "}
              €
            </h2>
          </div>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-warning"
              onClick={handleOpenCheckout}
            >
              Bestellung abschließen
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
