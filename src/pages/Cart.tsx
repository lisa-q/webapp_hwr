import React from "react";
import { useCart } from "../context/CartContext"; // Importiere den useCart Hook
import "./Cart.css"; // Dein Styling für den Warenkorb

const Cart = () => {
    const { cart } = useCart(); // Zugriff auf den Warenkorb

    // Gesamtsumme berechnen
    const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace("€", "").replace(",", ".")) * item.quantity, 0);

    return (
        <div className="cart-container">
            <h1 className="cart-title text-center">Dein Warenkorb</h1>

            {cart.length === 0 ? (
                <p className="text-center">Der Warenkorb ist leer</p>
            ) : (
                <div className="cart-items">
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-info">
                                <h5 className="cart-item-name">{item.name}</h5>
                                <p className="cart-item-price">{item.price} x {item.quantity}</p>
                            </div>
                        </div>
                    ))}
                    <div className="cart-total">
                        <h4>Gesamtsumme: {total.toFixed(2)}€</h4>
                    </div>
                    <button className="btn btn-primary checkout-btn">Zur Kasse gehen</button>
                </div>
            )}
        </div>
    );
};

export default Cart;
