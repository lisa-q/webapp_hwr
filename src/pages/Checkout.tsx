import { useEffect, useState } from "react";
import { CartItem } from "../models/types";
import CartFirebaseService from "../services/CartFirebaseService";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    shipping: "Pegasus-Lieferung", // default option
    payment: "Koala-Kredit", // default option
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    try {
      const { name, address, city, postalCode, country, shipping, payment } =
        formData;

      // Ensure all required fields are filled before placing an order
      if (!name || !address || !city || !postalCode || !country) {
        alert("Please fill in all address fields.");
        return;
      }

      await CartFirebaseService.placeOrder({
        address: {
          name,
          address,
          city,
          postalCode,
          country,
        },
        shippingMethod: shipping,
        paymentMethod: payment,
      });

      console.log("Order placed successfully.");
      navigate("/");
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <div className="cart-items">
        <h2>Order Summary</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} x {item.price} €
            </li>
          ))}
        </ul>
      </div>

      <div className="adress-form">
        <h2>Address</h2>
        <form>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="postalCode">Postal Code:</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
          </div>
        </form>
      </div>

      <div className="shipping-form">
        <h2>Shipping</h2>
        <form>
          <div>
            <label htmlFor="shipping">Shipping Method:</label>
            <select
              id="shipping"
              name="shipping"
              value={formData.shipping}
              onChange={handleInputChange}
            >
              <option value="Pegasus-Lieferung">Pegasus-Lieferung</option>
              <option value="Schneckenpost">Schneckenpost</option>
              <option value="Tanzende Koala-Zustellung">
                Tanzende Koala-Zustellung
              </option>
              <option value="Eulen-Nachtlieferung">Eulen-Nachtlieferung</option>
              <option value="Giraffen-Hochzustellung">
                Giraffen-Hochzustellung
              </option>
            </select>
          </div>
        </form>
      </div>

      <div className="payment-form">
        <h2>Payment</h2>
        <form>
          <div>
            <label htmlFor="payment">Payment Method:</label>
            <select
              id="payment"
              name="payment"
              value={formData.payment}
              onChange={handleInputChange}
            >
              <option value="Koala-Kredit">Koala-Kredit</option>
              <option value="Einhorn-Gold">Einhorn-Gold</option>
              <option value="Panda-Pay">Panda-Pay</option>
              <option value="Schnecken-Scheck">Schnecken-Scheck</option>
              <option value="Turtle-Token">Turtle-Token</option>
            </select>
          </div>
        </form>
      </div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
