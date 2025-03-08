import "./CartOverlay.css";
import { useNavigate } from "react-router-dom";

import CartItemList from "./CartItemList";

const CartOverlay = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();

  const handleOpenCart = () => {
    navigate("/cart");
  };

  return (
    <div className="cart-overlay">
      <div className="cart-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Dein Warenkorb</h2>
        <CartItemList />
        <div className="d-flex justify-content-end">
          <button className="btn btn-warning" onClick={handleOpenCart}>
            Open Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartOverlay;
