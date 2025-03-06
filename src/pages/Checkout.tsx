import { useEffect, useState } from "react";
import { CartItem } from "../models/types";
import CartFirebaseService from "../services/CartFirebaseService";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await CartFirebaseService.getCurrentCart();
      setCartItems(items);
    };
    fetchCartItems();
  }, []);

  const handlePlaceOrder = async () => {
    try {
      await CartFirebaseService.placeOrder();
      console.log("Order placed successfully.");
      navigate("/");
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} x {item.price} €
            </li>
          ))}
        </ul>
      ) : (
        <p>Dein Warenkorb ist leer.</p>
      )}
      <button className="btn btn-primary" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
