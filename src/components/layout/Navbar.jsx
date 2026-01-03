import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, ShoppingCart, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ cartCount }) => {
  const { currentUser, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
          
          {/* LEFT: LOGO + LINKS */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            {/* LOGO */}
            <Link to="/books" className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold text-white-800">
                Book Store
              </span>
            </Link>

            {/* NAV LINKS */}
            <div className="flex flex-wrap gap-2">
              <Link
                to="/books"
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isActive('/books')
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Books
              </Link>

              {!isAdmin() && (
                <Link
                  to="/orders"
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    isActive('/orders')
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  My Orders
                </Link>
              )}

              {isAdmin() && (
                <>
                  <Link
                    to="/admin/books"
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      isActive('/admin/books')
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Manage Books
                  </Link>

                  <Link
                    to="/admin/orders"
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      isActive('/admin/orders')
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    All Orders
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* RIGHT: USER + CART + LOGOUT */}
          <div className="flex items-center justify-between sm:justify-end gap-4">
            {/* USER */}
            <span className="text-sm font-medium text-white">
              {currentUser?.username}
              {isAdmin() && (
                <span className="ml-1 text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                  Admin
                </span>
              )}
            </span>

            {/* CART */}
            {!isAdmin() && (
              <Link
                to="/cart"
                className="relative p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
