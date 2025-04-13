import React, { useState, useEffect } from 'react';
import categoryService from '../services/categoryService';

// Props:
// - categoryToEdit: The category object being edited { _id, name, itemCount, imageUrl }
// - onClose: Function to close the modal
// - onCategoryUpdated: Function to call after successfully updating

const EditCategoryForm = ({ categoryToEdit, onClose, onCategoryUpdated }) => {
    // Initialize state with the values from the category being edited
    const [name, setName] = useState('');
    const [itemCount, setItemCount] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    //Effect to pre-populate form when categoryToEdit changes
    useEffect(() => {
        if (categoryToEdit) {
            setName(categoryToEdit.name || '');
            setItemCount(categoryToEdit.itemCount !== undefined ? categoryToEdit.itemCount.toString() : '');
            setImageUrl(categoryToEdit.imageUrl || '');
            setError('');
        } else {
            // Reset form if categoryToEdit becomes null 
            setName('');
            setItemCount('');
            setImageUrl('');
            setError('');
        }
    }, [categoryToEdit]);


    // This handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!categoryToEdit?._id) {
            setError("Cannot update category: Missing ID.");
            return;
        }
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
            const updatedData = {
                name: name.trim(),
                itemCount: count,
                imageUrl: imageUrl.trim(),
            };

            await categoryService.updateCategory(categoryToEdit._id, updatedData);
            onCategoryUpdated();
            onClose();
        } catch (err) {
            console.error("Update category error:", err);
            setError(err.message || 'Failed to update category.');
            setLoading(false);
        }
    };


    if (!categoryToEdit) return null;


    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="text-red-600 bg-red-100 p-2 rounded mb-4 text-sm">{error}</p>}
            <div className="mb-4">
                <label htmlFor="editCategoryName" className="block text-sm font-medium text-gray-700 mb-1">
                    Category Name
                </label>
                <input
                    type="text"
                    id="editCategoryName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    disabled={loading}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="editItemCount" className="block text-sm font-medium text-gray-700 mb-1">
                    Item Count
                </label>
                <input
                    type="number"
                    id="editItemCount"
                    value={itemCount}
                    onChange={(e) => setItemCount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    min="0"
                    disabled={loading}
                />
            </div>
            <div className="mb-6">
                <label htmlFor="editImageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                </label>
                <input
                    type="url"
                    id="editImageUrl"
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
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                    {loading ? 'Updating...' : 'Update Category'}
                </button>
            </div>
        </form>
    );
};

export default EditCategoryForm;