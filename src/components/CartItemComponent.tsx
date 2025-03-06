import React from "react";
import { CartItem } from "../types/cartItem";
import "./CartItemComponent.css";
import CartFirebaseService from "../services/CartFirebaseService"; // Hier geändert

interface CartItemComponentProps {
  cartItem: CartItem;
  onDelete: (id: string) => void;
}

const CartItemComponent: React.FC<CartItemComponentProps> = ({
  cartItem,
  onDelete,
}) => {
  const { id, name, price, quantity, image } = cartItem;

  const handleDelete = async () => {
    await CartFirebaseService.removeFromCart(id); // Hier geändert
    onDelete(id);
  };

  return (
    <div className="card mb-2 cart-item position-relative">
      <div className="card-body d-flex align-items-center">
        <img src={image} alt={name} className="cart-item-img me-3" />
        <div className="cart-item-details flex-grow-1">
          <h6 className="card-title">{name}</h6>
          <p className="card-text">Anzahl: {quantity}</p>
        </div>
        <div className="cart-item-price">
          <strong>{(price * quantity).toFixed(2)} €</strong>
        </div>
        <button className="delete-btn" onClick={handleDelete}>
          <i className="bi bi-trash3-fill"></i>
        </button>
      </div>
    </div>
  );
};

export default CartItemComponent;
