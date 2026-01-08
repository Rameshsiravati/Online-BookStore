import React, { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import { orderService } from '../../services/orderService';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    fetchOrders();

    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await orderService.getMyOrders();
      console.log("Fetched orders:", data);
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700';
      case 'COMPLETED':
        return 'bg-green-100 text-green-700';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh] text-gray-600 text-xl">
        Loading orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[40vh] text-red-600 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Package className="w-24 h-24 mb-4 opacity-50" />
          <p className="text-xl">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6"
            >
              {/* HEADER */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    Order #{order.id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleString()
                      : '—'}
                  </p>
                </div>

                {/* <span className={`px-3 py-1 rounded-full text-sm font-semibold
  ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                    order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'}
`}>
                  {order.status}
                </span> */}

                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>

              </div>

              {/* ITEMS */}
              <div className="space-y-3">
                {(order.orderItems || []).map(item => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start border-t pt-3"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
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
                <span className="text-lg font-bold text-gray-800">
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

export default MyOrders;
