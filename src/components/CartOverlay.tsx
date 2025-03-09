import { useNavigate } from "react-router-dom";
import CartItemList from "./CartItemList";
import "./CartOverlay.css";

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
          <button className="btn btn-outline-warning" onClick={handleOpenCart}>
            Zum Warenkorb
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartOverlay;
