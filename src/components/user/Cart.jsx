import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ShoppingCart, Trash2, Package, BookOpen } from 'lucide-react';
import { orderService } from '../../services/orderService';

const Cart = () => {
  const { cart, setCart } = useOutletContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // REMOVE ITEM
  const removeFromCart = (bookId) => {
    setCart(cart.filter(item => item.id !== bookId));
  };

  // COUNTS
  const differentBooksCount = cart.length;

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // PLACE ORDER
  const placeOrder = async () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        books: cart.map(item => ({
          book: { id: item.id },
          quantity: item.quantity
        }))
      };

      await orderService.createOrder(orderData);

      setOrderPlaced(true);
      setCart([]);

      setTimeout(() => {
        navigate('/orders');
      }, 1500);

    } catch (err) {
      console.error('Order error:', err);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS STATE
  if (orderPlaced) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] px-4">
        <div className="bg-green-100 text-green-700 p-8 rounded-2xl text-center shadow-md max-w-md w-full">
          <Package className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">
            Order Placed Successfully!
          </h2>
          <p>Redirecting to your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* HEADER */}
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Shopping Cart
      </h2>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <ShoppingCart className="w-24 h-24 mb-4 opacity-50" />
          <p className="text-xl">Your cart is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="text-white w-7 h-7" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <span className="font-bold text-indigo-600 text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ORDER SUMMARY */}
          <div>
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6 text-gray-600">
                <div className="flex justify-between">
                  <span>Books</span>
                  <span>{differentBooksCount}</span>
                </div>

                <div className="flex justify-between">
                  <span>Items</span>
                  <span>{totalItems}</span>
                </div>

                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Total</span>
                  <span className="text-indigo-600">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={placeOrder}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;
