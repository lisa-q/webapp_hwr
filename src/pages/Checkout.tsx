import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../models/types";
import OrderFirebaseService from "../services/OrderFirebaseService";
import CartFirebaseService from "../services/CartFirebaseService";
import "./Checkout.css";

/**
 * Represents the Checkout page for completing an order.
 *
 * @component
 * @description
 * This component allows users to review their cart items, enter their shipping and payment details,
 * and place an order. It fetches the current cart items from Firebase and allows the user to fill out
 * their shipping address, choose a shipping method, and select a payment method.
 *
 * The user can either continue shopping or place the order. If the order is successfully placed, the user
 * is redirected to a thank-you page.
 *
 * @example
 * <Checkout />
 */
const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    shipping: "Pegasus-Lieferung",
    payment: "Koala-Kredit",
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await CartFirebaseService.getCurrentCart();
      setCartItems(items);
    };
    fetchCartItems();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (
      !formData.name ||
      !formData.address ||
      !formData.city ||
      !formData.postalCode ||
      !formData.country
    ) {
      alert("Bitte fülle alle Adressfelder aus.");
      return;
    }

    try {
      await OrderFirebaseService.placeOrder({
        address: {
          name: formData.name,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        shippingMethod: formData.shipping,
        paymentMethod: formData.payment,
      });

      console.log("Order placed successfully.");
      navigate("/thank-you");
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  const handleContinueShopping = () => {
    navigate("/shop");
  };

  return (
    <div className="container checkout-container">
      <h2>Bestellabschluss</h2>

      <div className="checkout-layout">
        <div className="checkout-right">
          <h4>Bestellübersicht</h4>
          <ul className="list-group">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between"
              >
                <span>
                  {item.quantity}x {item.name}
                </span>
                <strong>{item.price} €</strong>
              </li>
            ))}
          </ul>
          <h3 className="total-price">
            Gesamt:{" "}
            {cartItems
              .reduce((total, item) => total + item.quantity * item.price, 0)
              .toFixed(2)}{" "}
            €
          </h3>
          <button
            className="btn btn-warning mt-4"
            onClick={handleContinueShopping}
          >
            Weiter einkaufen
          </button>
        </div>

        <div className="checkout-left">
          <div className="address-form mt-4">
            <h4>Anschrift</h4>
            <form className="row ">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="address" className="form-label">
                  Straße:
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="city" className="form-label">
                  Stadt:
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="form-control"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="postalCode" className="form-label">
                  PLZ:
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  className="form-control"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="country" className="form-label">
                  Land:
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  className="form-control"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </form>
          </div>

          <div className="shipping-form mt-4">
            <h4>Versand</h4>
            <form>
              <div>
                <label htmlFor="shipping" className="form-label">
                  Versandmethode:
                </label>
                <select
                  id="shipping"
                  name="shipping"
                  className="form-select"
                  value={formData.shipping}
                  onChange={handleInputChange}
                >
                  <option value="Papageien-Lieferung">
                    🦜 Papageien-Lieferung
                  </option>
                  <option value="Schnecken-Post">🐌 Schnecken-Post</option>
                  <option value="Tanzende-Pinguin-Zustellung">
                    🐧 Tanzende-Pinguin-Zustellung
                  </option>
                  <option value="Eulen-Nachtlieferung">
                    🦉 Eulen-Nachtlieferung
                  </option>
                  <option value="Giraffen-Hochzustellung">
                    🦒 Giraffen-Hochzustellung
                  </option>
                </select>
              </div>
            </form>
          </div>

          <div className="payment-form mt-4">
            <h4>Bezahlung</h4>
            <form>
              <div>
                <label htmlFor="payment" className="form-label">
                  Zahlungsmethode:
                </label>
                <select
                  id="payment"
                  name="payment"
                  className="form-select"
                  value={formData.payment}
                  onChange={handleInputChange}
                >
                  <option value="Koala-Kredit">🐨 Koala-Kredit</option>
                  <option value="Einhorn-Gold">🦄 Einhorn-Gold</option>
                  <option value="Panda-Pay">🐼 Panda-Pay</option>
                  <option value="Schlangen-Scheck">🐍 Schlangen-Scheck</option>
                  <option value="Turtle-Token"> 🐢Turtle-Token</option>
                </select>
              </div>
            </form>
          </div>

          <button className="btn btn-warning mt-4" onClick={handlePlaceOrder}>
            Bestellung aufgeben
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
