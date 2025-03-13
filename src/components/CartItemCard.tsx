import React from "react";
import { CartItem } from "../models/types";
import CartFirebaseService from "../services/CartFirebaseService";
import "./CartItemCard.css";

interface CartItemCardProps {
  cartItem: CartItem;
  onDelete: (id: string) => void;
}

/**
 * `CartItemCard` is a React component that represents a single item in the shopping cart.
 * It displays the product's information, including its name, price, quantity, and image.
 * Users can increase or decrease the quantity of the product and remove the item from the cart.
 *
 * @component
 * @example
 * <CartItemCard cartItem={item} onDelete={handleDelete} />
 *
 * @param {Object} props - The properties of the component.
 * @param {CartItem} props.cartItem - The CartItem object containing the product information.
 * @param {Function} props.onDelete - A function that is called when the product is deleted from the cart.
 */
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
          <div className="card-text d-flex align-items-center">
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
          </div>
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
