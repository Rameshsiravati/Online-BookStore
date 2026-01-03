import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  const [cart, setCart] = useState([]);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100">
      {/* NAVBAR */}
      <Navbar cartCount={cartCount} />

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Outlet context={{ cart, setCart }} />
        </div>
      </main>

      {/* OPTIONAL FOOTER SPACE (future-proof) */}
      <div className="h-4" />
    </div>
  );
};

export default Layout;
