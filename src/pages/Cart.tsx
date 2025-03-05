import React from "react";
import { CartItem } from "../types/cartItem";
import CartItemComponent from "../components/CartItemComponent";
import "./Cart.css";

interface CartProps {
  cartItems: CartItem[];
}

const Cart: React.FC<CartProps> = ({ cartItems }) => {
  return (
    <div>
      <h1>Warenkorb</h1>
      {cartItems.length === 0 ? (
        <p>Dein Warenkorb ist leer.</p>
      ) : (
        <div>
          <ul className="list-cartItems">
            {cartItems.map((item, index) => (
              <CartItemComponent cartItem={item} key={index} />
            ))}
          </ul>
          <div>
            <h2>
              Gesamt:{" "}
              {cartItems.reduce(
                (total, item) => total + item.quantity * item.price,
                0
              )}{" "}
              €
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
