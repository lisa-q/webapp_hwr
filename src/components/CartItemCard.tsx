import React from "react";
import { CartItem } from "../models/types";
import CartFirebaseService from "../services/CartFirebaseService";
import "./CartItemCard.css";

interface CartItemCardProps {
  cartItem: CartItem;
  onDelete: (id: string) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ cartItem, onDelete }) => {
  const { id, name, price, quantity, image } = cartItem;

  const handleDelete = async () => {
    await CartFirebaseService.removeFromCart(id);
    onDelete(id);
  };

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    await CartFirebaseService.updateQuantityCartItemById(id, newQuantity);
  };

  return (
    <div className="card mb-2 cart-item position-relative">
      <div className="card-body d-flex align-items-center">
        <img src={image} alt={name} className="cart-item-img me-3" />
        <div className="cart-item-details flex-grow-1">
          <h6 className="card-title">{name}</h6>
          <p className="card-text d-flex align-items-center">
            Anzahl: {quantity}{" "}
            <div className="quantity-controls ms-3">
              {quantity > 1 && (
                <button
                  className="btn btn-outline-secondary btn-sm me-1"
                  onClick={() => updateQuantity(quantity - 1)}
                >
                  -
                </button>
              )}
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => updateQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </p>
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

export default CartItemCard;
