import React, { useState } from 'react';
import categoryService from '../services/categoryService';

// Props:
// - onClose: Function to close the modal containing this form
// - onCategoryAdded: Function to call after successfully adding a category (to trigger refresh)

const AddCategoryForm = ({ onClose, onCategoryAdded }) => {
  const [name, setName] = useState('');
  const [itemCount, setItemCount] = useState(''); 
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    
    const count = parseInt(itemCount, 10);
    if (isNaN(count) || count < 0) {
      setError('Item count must be a non-negative number.');
      setLoading(false);
      return;
    }
    if (!name.trim() || !imageUrl.trim()) {
        setError('Name and Image URL are required.');
        setLoading(false);
        return;
    }


    try {
      const categoryData = {
        name: name.trim(),
        itemCount: count, 
        imageUrl: imageUrl.trim(),
      };
      await categoryService.createCategory(categoryData);
      onCategoryAdded(); 
      onClose(); 
    } catch (err) {
      console.error("Add category error:", err);
      setError(err.message || 'Failed to add category.');
      setLoading(false); 
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-600 bg-red-100 p-2 rounded mb-4 text-sm">{error}</p>}
      <div className="mb-4">
        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
          Category Name
        </label>
        <input
          type="text"
          id="categoryName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="itemCount" className="block text-sm font-medium text-gray-700 mb-1">
          Item Count
        </label>
        <input
          type="number" 
          id="itemCount"
          value={itemCount}
          onChange={(e) => setItemCount(e.target.value)} 
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
          min="0" 
          disabled={loading}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
          Image URL
        </label>
        <input
          type="url" 
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
          disabled={loading}
        />
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button" 
          onClick={onClose}
          disabled={loading}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Category'}
        </button>
      </div>
    </form>
  );
};

export default AddCategoryForm;