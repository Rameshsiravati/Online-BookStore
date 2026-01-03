import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

import Layout from "./components/layout/Layout";
import BooksList from "./components/user/BooksList";
import Cart from "./components/user/Cart";
import MyOrders from "./components/user/MyOrders";
import ManageBooks from "./components/admin/ManageBooks";
import AllOrders from "./components/admin/AllOrders";
import AuthPage from "./pages/AuthPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <ToastContainer position="top-right" autoClose={2000} />
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/login" element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          } />

          <Route path="/register" element={
            <PublicRoute>
              <AuthPage isRegister />
            </PublicRoute>
          } />

          {/* Protected */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/books" replace />} />
            <Route path="books" element={<BooksList />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<MyOrders />} />

            <Route path="admin/books" element={
              <ProtectedRoute adminOnly>
                <ManageBooks />
              </ProtectedRoute>
            } />

            <Route path="admin/orders" element={
              <ProtectedRoute adminOnly>
                <AllOrders />
              </ProtectedRoute>
            } />
          </Route>

          <Route path="*" element={<Navigate to="/books" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
