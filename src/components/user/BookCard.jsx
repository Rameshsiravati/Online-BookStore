import React from 'react';
import { BookOpen } from 'lucide-react';

const BookCard = ({ book, onAddToCart, isAdmin }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col">
      
      {/* IMAGE */}
      <div className="h-60 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center overflow-hidden">
        {book.imageUrl ? (
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <BookOpen className="w-20 h-20 text-white opacity-80" />
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
          {book.title}
        </h3>

        <p className="text-sm text-gray-600 mb-2">
          by {book.author}
        </p>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {book.description || 'No description available'}
        </p>

        {/* PRICE + ACTION */}
        <div className="mt-auto flex justify-between items-center">
          <span className="text-2xl font-bold text-indigo-600">
            ${book.price}
          </span>

          {!isAdmin && (
            <button
              onClick={() => onAddToCart(book)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
            >
              Add to Cart
            </button>
          )}
        </div>

        {/* STOCK */}
        <div className="mt-3 text-xs text-gray-500">
          Stock: <span className="font-medium">{book.stockQuantity}</span> available
        </div>
      </div>
    </div>
  );
};

export default BookCard;
