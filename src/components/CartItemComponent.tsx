import React from "react";
import { CartItem } from "../types/cartItem";
import "./CartItemComponent.css";

interface CartItemComponentProps {
  cartItem: CartItem;
}

const CartItemComponent: React.FC<CartItemComponentProps> = ({ cartItem }) => {
  const { name, price, quantity, image } = cartItem;

  return (
    <li className="list-group-item d-flex align-items-center cart-item">
      <img src={image} alt={name} className="cart-item-image me-3" />
      <div className="cart-item-details d-flex justify-content-between w-100">
        <h5 className="mb-0">{name}</h5>
        <p className="quantity-circle mb-0">{quantity}x</p>
        <p className="mb-0 fw-bold">{price} €</p>
      </div>
    </li>
  );
};

export default CartItemComponent;
