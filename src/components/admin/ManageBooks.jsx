import React, { useState, useEffect } from 'react';
import { Plus, BookOpen } from 'lucide-react';
import { bookService } from '../../services/bookService';
import BookForm from './BookForm';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await bookService.getAllBooks();
      setBooks(data);
    } catch (err) {
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (bookData) => {
    if (submitting) return;

    setSubmitting(true);
    try {
      if (editingBook) {
        await bookService.updateBook(editingBook.id, bookData);
      } else {
        await bookService.createBook(bookData);
      }

      await fetchBooks();
      resetForm();
    } catch (err) {
      alert('Error saving book');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    try {
      await bookService.deleteBook(id);
      fetchBooks();
    } catch (err) {
      alert('Error deleting book');
      console.error(err);
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingBook(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16 text-gray-600 text-xl">
        Loading books...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Manage Books
        </h2>

        <button
          onClick={() => setShowForm(!showForm)}
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50"
        >
          <Plus className="w-5 h-5" />
          {showForm ? 'Cancel' : 'Add New Book'}
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <BookForm
          book={editingBook}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          submitting={submitting}
        />
      )}

      {/* BOOK GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            {/* IMAGE */}
            <div className="h-44 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center overflow-hidden">
              {book.imageUrl ? (
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.style.display = 'none')}
                />
              ) : (
                <BookOpen className="w-16 h-16 text-white opacity-80" />
              )}
            </div>

            {/* CONTENT */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {book.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                by {book.author}
              </p>

              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {book.description || 'No description available'}
              </p>

              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-indigo-600">
                  ${book.price}
                </span>
                <span className="text-sm text-gray-500">
                  Stock: {book.stockQuantity}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="mt-auto flex gap-2">
                <button
                  onClick={() => handleEdit(book)}
                  disabled={submitting}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium disabled:opacity-50"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(book.id)}
                  disabled={submitting}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition text-sm font-medium disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBooks;
