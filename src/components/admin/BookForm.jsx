import React, { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';

const BookForm = ({ book, onSubmit, onCancel, submitting }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    stockQuantity: '',
    imageUrl: ''
  });

  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (book) {
      setFormData(book);
      setImagePreview(book.imageUrl || '');
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookData = {
      ...formData,
      price: parseFloat(formData.price),
      stockQuantity: parseInt(formData.stockQuantity)
    };

    onSubmit(bookData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'imageUrl') {
      setImagePreview(value);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-8 mb-10">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        {book ? 'Edit Book' : 'Add New Book'}
      </h3>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* IMAGE SECTION */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Book Cover Image
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* IMAGE URL INPUT */}
            <div>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                disabled={submitting}
                placeholder="https://example.com/book.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              />
              <p className="text-xs text-gray-500 mt-1">
                Paste an image URL
              </p>
            </div>

            {/* IMAGE PREVIEW */}
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 min-h-[160px]">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-40 rounded object-contain"
                    onError={(e) => {
                      e.target.src =
                        'https://via.placeholder.com/150?text=Invalid+Image';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, imageUrl: '' });
                      setImagePreview('');
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <Upload className="w-10 h-10 mx-auto mb-2" />
                  <p className="text-sm">Preview appears here</p>
                </div>
              )}
            </div>
          </div>

          {/* IMAGE SOURCES */}
          <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-lg p-4">
            <p className="text-xs font-semibold text-indigo-700 mb-2">
              💡 Free Image Sources
            </p>
            <ul className="text-xs text-indigo-600 space-y-1">
              <li>
                • <a href="https://covers.openlibrary.org" target="_blank" rel="noreferrer" className="underline">
                  Open Library Covers
                </a>
              </li>
              <li>
                • <a href="https://unsplash.com/s/photos/books" target="_blank" rel="noreferrer" className="underline">
                  Unsplash
                </a>
              </li>
              <li>
                • <a href="https://www.pexels.com/search/books/" target="_blank" rel="noreferrer" className="underline">
                  Pexels
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* TITLE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            disabled={submitting}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            required
          />
        </div>

        {/* AUTHOR */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author *
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            disabled={submitting}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            required
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price *
          </label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            disabled={submitting}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            required
          />
        </div>

        {/* STOCK */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock Quantity *
          </label>
          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleChange}
            disabled={submitting}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={submitting}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50"
          >
            {submitting ? 'Saving...' : book ? 'Update Book' : 'Add Book'}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-lg hover:bg-gray-300 transition font-medium disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
