import { useState, useEffect } from "react";
import CartFirebaseService from "../services/CartFirebaseService";
import "./CartBatch.css";

/**
 * A badge component that displays the total quantity of items in the cart.
 * It listens to real-time cart updates from Firebase.
 *
 * @component
 */
const CartBadge = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const unsubscribe = CartFirebaseService.listenToCart((cartItems) => {
      const totalQuantity = cartItems.reduce(
        (sum, item) => sum + (item.quantity ?? 1),
        0
      );
      setCartCount(totalQuantity);
    });

    return () => unsubscribe();
  }, []);

  return cartCount > 0 ? <span className="cart-badge">{cartCount}</span> : null;
};

export default CartBadge;
