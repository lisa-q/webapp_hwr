import { useNavigate } from "react-router-dom";
import CartItemList from "./CartItemList";
import "./CartOverlay.css";

/**
 * `CartOverlay` is a React component that displays an overlay with the list of items in the shopping cart.
 * It shows the cart items in a modal-like overlay, with a button to close the overlay and another to navigate to the full cart page.
 *
 * @component
 * @example
 * <CartOverlay onClose={handleClose} />
 *
 * @param {Object} props - The properties of the component.
 * @param {Function} props.onClose - A function that is called when the overlay is closed.
 *
 * @returns The rendered CartOverlay component.
 */
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
