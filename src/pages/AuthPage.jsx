import React from 'react';
import { BookOpen } from 'lucide-react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

const AuthPage = ({ isRegister = false }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 px-4">
      
      {/* Card Wrapper */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
            <BookOpen className="h-8 w-8 text-indigo-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Book Store
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            {isRegister
              ? 'Create your account to start reading 📚'
              : 'Welcome back! Login to continue 📖'}
          </p>
        </div>

        {/* Auth Form */}
        <div className="mt-6">
          {isRegister ? <Register /> : <Login />}
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
