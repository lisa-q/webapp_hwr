import React from "react";
import { Order } from "../models/types";
import "./OrderCard.css";

interface OrderCardProps {
  order: Order;
  index: number;
}

/**
 * `OrderCard` is a React component that displays the details of a single order, including the order number, shipping and payment methods, order items, and the total price.
 * It presents the order in a styled card with item quantities and prices, as well as the order creation date.
 *
 * @component
 * @example
 * <OrderCard order={order} index={1} />
 *
 * @param {Object} props - The properties of the component.
 * @param {Order} props.order - The order object containing the details of the order.
 * @param {number} props.index - The index of the order to display (for order numbering).
 *
 * @returns The rendered OrderCard component displaying the order details.
 */
const OrderCard: React.FC<OrderCardProps> = ({ order, index }) => {
  return (
    <div className="card shadow-sm border-0 rounded order-card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">Bestellung #{index + 1}</h5>
          <div>
            <span className="badge bg-warning text-dark me-2">
              {order.shippingMethod}
            </span>
            <span className="badge bg-warning text-dark">
              {order.paymentMethod}
            </span>
          </div>
        </div>

        <p className="text-muted">
          📅 {new Date(order.createdAt).toLocaleDateString()}
        </p>

        <div className="order-items-container">
          <ul className="list-group list-group-flush">
            {order.items.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between"
              >
                <span>
                  {item.quantity}x {item.name}
                </span>
                <strong>{(item.price * item.quantity).toFixed(2)} €</strong>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-3 text-end">
          <strong className="text-success">
            💰 {order.totalPrice.toFixed(2)} €
          </strong>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
