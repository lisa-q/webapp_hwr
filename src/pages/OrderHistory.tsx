import React, { useEffect, useState } from "react";
import { Order } from "../models/types";
import OrderFirebaseService from "../services/OrderFirebaseService";
import OrderCard from "../components/OrderCard";
import "./OrderHistory.css";

/**
 * OrderHistory component to display a list of past orders and total spending.
 * Fetches the order history from Firebase and calculates the total amount spent.
 * Displays individual orders using the OrderCard component.
 *
 * @component
 * @example
 * <OrderHistory />
 */

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const orderList = await OrderFirebaseService.getOrderHistory();
      setOrders(orderList);
    };

    fetchOrders();
  }, []);

  const totalSpent = orders.reduce(
    (total, order) => total + order.totalPrice,
    0
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Meine Bestellungen</h1>
        <span className="badge bg-success fs-5">
          💰 {totalSpent.toFixed(2)} €
        </span>
      </div>

      {orders.length > 0 ? (
        <div className="scrollable-orders-container">
          <div className="row g-4">
            {orders.map((order, index) => (
              <OrderCard key={order.id} order={order} index={index} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-muted">
          Du hast noch keine Bestellungen.
        </p>
      )}
    </div>
  );
};

export default OrderHistory;
