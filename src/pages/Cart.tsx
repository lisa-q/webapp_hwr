import React from "react";
import { useNavigate } from "react-router-dom";
import CartItemList from "../components/CartItemList";
import "./Cart.css";

const Cart: React.FC = () => {
  const navigate = useNavigate();

  const handleOpenCheckout = () => {
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/shop");
  };

  return (
    <div className="cart-container">
      <h1>Warenkorb</h1>
      <CartItemList /> {/* Hier wird die Liste geladen */}
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-orange mx-2"
          onClick={handleContinueShopping}
        >
          Weiter einkaufen
        </button>
        <button className="btn btn-warning mx-2" onClick={handleOpenCheckout}>
          Bestellung abschließen
        </button>
      </div>
    </div>
  );
};

export default Cart;
