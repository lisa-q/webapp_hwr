import "./CartOverlay.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../models/types";
import CartItemComponent from "./CartItemComponent";
import CartFirebaseService from "../services/CartFirebaseService";

const CartOverlay = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const unsubscribe = CartFirebaseService.listenToCart(setCartItems);

    return () => {
      unsubscribe();
    };
  }, []);

  const handleOpenCart = () => {
    navigate("/cart", { state: { cartItems } });
  };

  const handleDeleteItem = async (id: string) => {
    await CartFirebaseService.removeFromCart(id);
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="cart-overlay">
      <div className="cart-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Dein Warenkorb</h2>
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
        <div className="d-flex justify-content-end">
          <button className="btn btn-outline-warning" onClick={handleOpenCart}>
            Open Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartOverlay;
