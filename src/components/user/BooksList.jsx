import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { bookService } from '../../services/bookService';
import BookCard from './BookCard';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { cart, setCart } = useOutletContext();
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await bookService.getAllBooks();
      setBooks(data);
    } catch (err) {
      setError('Failed to load books');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (book) => {
    const existingItem = cart.find(item => item.id === book.id);

    if (existingItem) {
      if (existingItem.quantity >= book.stockQuantity) {
        toast.info('No more stock available ❌');
        return;
      }

      const updatedCart = cart.map(item =>
        item.id === book.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setCart(updatedCart);
      toast.success('Book added to cart 🛒');
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
      toast.success('Book added to cart 🛒');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh] text-gray-600 text-xl">
        Loading books...
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
    <div className="max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Available Books
        </h2>

        <p className="text-sm text-gray-500">
          {books.length} book{books.length !== 1 && 's'} available
        </p>
      </div>

      {/* CONTENT */}
      {books.length === 0 ? (
        <div className="text-center text-gray-500 text-xl py-16">
          No books available at the moment
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onAddToCart={addToCart}
              isAdmin={isAdmin()}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksList;
