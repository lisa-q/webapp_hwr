import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../models/types";
import CartFirebaseService from "../services/CartFirebaseService";
import CartItemList from "../components/CartItemList";
import "./Cart.css";

/**
 * Represents the Cart page of the Furtastic Fashion website.
 *
 * @component
 * @description
 * This component displays the contents of the shopping cart, including the list of cart items,
 * their quantities, and the total price. It provides buttons for continuing shopping or
 * proceeding to checkout.
 *
 * The component fetches cart items from the Firebase service and displays a message if the cart is empty.
 * It allows users to either continue shopping or complete their order by navigating to the checkout page.
 *
 * @example
 * <Cart />
 */
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

  const handleContinueShopping = () => {
    navigate("/shop");
  };

  return (
    <div className="cart-container">
      <h1>Warenkorb</h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <i className="bi bi-cart-x bi-4x"></i>
          <p>Dein Warenkorb ist leer.</p>
        </div>
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
              className="btn btn-orange mx-2"
              onClick={handleContinueShopping}
            >
              Weiter einkaufen
            </button>
            <button
              className="btn btn-warning mx-2"
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
