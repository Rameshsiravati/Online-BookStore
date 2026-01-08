import React, { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import { orderService } from '../../services/orderService';
import api from '../../services/api';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await orderService.getAllOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const normalizedStatus = newStatus.toUpperCase().trim();

      await api.put(
        `/orders/${orderId}/status?status=${normalizedStatus}`
      );

      fetchOrders(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to update order status");
    }
  };



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-gray-600 text-lg">
        Loading orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-red-600 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        All Orders
      </h2>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <Package className="w-20 h-20 mb-4 opacity-50" />
          <p className="text-xl">No orders yet</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col justify-between"
            >
              {/* HEADER */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Order #{order.id}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Customer: {order.user?.username} ({order.user?.email})
                  </p>

                  <p className="text-sm text-gray-500">
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleString()
                      : 'N/A'}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="font-semibold">
                    Order #{order.id}
                  </span>

                  {/* STATUS DROPDOWN */}
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order.id, e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="PLACED">PLACED</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>

              </div>

              {/* ORDER ITEMS */}
              <div className="divide-y">
                {(order.orderItems || []).map(item => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-3"
                  >
                    <div>
                      <p className="font-medium text-gray-700">
                        {item.book?.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <span className="font-semibold text-indigo-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-700">
                  Total
                </span>
                <span className="text-xl font-bold text-indigo-600">
                  ${order.totalAmount?.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrders;
