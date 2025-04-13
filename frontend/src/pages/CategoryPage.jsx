import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom'; // To receive Add Modal context
import categoryService from '../services/categoryService';
import Modal from '../components/Modal';
import AddCategoryForm from '../components/AddCategoryForm';
import EditCategoryForm from '../components/EditCategoryForm';
import ClipLoader from "react-spinners/ClipLoader";
import { LuSearch, LuPlus, LuTrash2 } from 'react-icons/lu';
import { MdOutlineEdit } from "react-icons/md";

const CategoryPage = () => {
    //Get Add Modal context from Layout
    const { isAddModalOpen, handleCloseAddModal, handleOpenAddModal } = useOutletContext();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [sortOrder, setSortOrder] = useState('');

    //State for Search
    const [searchInput, setSearchInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    //Fetch Categories
    const fetchCategories = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const data = await categoryService.getAllCategories();
            setCategories(data || []);
        } catch (err) {
            console.error("Fetch categories error:", err);
            setError(err.message || 'Failed to load categories.');
        } finally {
            setLoading(false);
        }
    }, []);

    //Fetch Categories on Initial Mount
    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    //Filtered and Sorted Categories
    const displayedCategories = useMemo(() => {
        let filtered = categories;

        if (searchTerm) {
            filtered = categories.filter(category =>
                category.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        // sorting
        if (sortOrder === 'count-asc') return [...filtered].sort((a, b) => (a.itemCount ?? 0) - (b.itemCount ?? 0));
        if (sortOrder === 'count-desc') return [...filtered].sort((a, b) => (b.itemCount ?? 0) - (a.itemCount ?? 0));
        if (sortOrder === 'name-asc') return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        if (sortOrder === 'name-desc') return [...filtered].sort((a, b) => b.name.localeCompare(a.name));
        return filtered;
    }, [categories, searchTerm, sortOrder]);

    const handleCategoryAdded = () => {
        fetchCategories();
        handleCloseAddModal();
    };
    const handleOpenEditModal = (category) => {
        setError('');
        setCurrentCategory(category);
        setIsEditModalOpen(true);
    };
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentCategory(null);
    };
    const handleCategoryUpdated = () => {
        fetchCategories();
        handleCloseEditModal();
    };
    const handleDeleteCategory = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            setError('');
            try {
                await categoryService.deleteCategory(id);
                fetchCategories();
            } catch (err) {
                console.error("Delete category error:", err);
                setError(err.message || 'Failed to delete category.');
            }
        }
    };

    //This updates search input value as user types
    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);

        if (e.target.value === '') {
            setSearchTerm('');
        }
    };

    //search filter on Enter key press
    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            setSearchTerm(searchInput);
        }
    };

    //search filter on Search Icon click
    const handleSearchIconClick = () => {
        setSearchTerm(searchInput);
    };

    return (
        <div className="min-h-[84vh]">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-4 border-b border-gray-200 gap-4 p-3">
                <div className="relative flex items-center border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 w-full md:w-auto">
                    <input
                        type="search"
                        placeholder="Search Categories..."
                        value={searchInput}
                        onChange={handleSearchInputChange}
                        onKeyDown={handleSearchKeyDown}
                        className="w-full md:w-64 pl-4 pr-10 py-2 text-sm focus:outline-none rounded-md"
                        aria-label="Search Categories"
                    />

                    <button
                        onClick={handleSearchIconClick}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                        aria-label="Submit search"
                    >
                        <LuSearch />
                    </button>
                </div>
                <div className="flex items-center space-x-4">
                    <label htmlFor="sort-categories" className="text-sm font-medium text-gray-700 hidden sm:block">Sort by:</label>
                    <select
                        id="sort-categories"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                        aria-label="Sort categories"
                    >
                        <option value="">Default</option>
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                        <option value="count-asc">Items (Low to High)</option>
                        <option value="count-desc">Items (High to Low)</option>
                    </select>
                </div>
                <button
                    onClick={() => handleOpenAddModal()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 flex items-center transition duration-150 ease-in-out text-sm"
                >
                    <LuPlus className="mr-1 h-5 w-5" />
                    Add Category
                </button>
            </div>

            {error && (
                <div className="mb-4 text-center p-3 text-red-600 bg-red-100 rounded shadow-sm text-sm">{error}</div>
            )}

            {loading && (
                <div className="flex justify-center items-center p-10">
                    <ClipLoader color="#3b82f6" loading={loading} size={50} aria-label="Loading Spinner" />
                </div>
            )}

            {!loading && (
                <>
                    {displayedCategories.length === 0 ? (
                        <div className="text-center p-8 bg-white rounded shadow-md">
                            <p className="text-gray-500 text-lg">No categories found.</p>
                            <p className="text-gray-400 mt-2">Use the "Add Category" button in the header to create one!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {displayedCategories.map((category) => (

                                <div key={category._id} className="bg-white rounded-lg shadow-lg overflow-hidden relative group transition transform hover:-translate-y-1 duration-300 ease-in-out hover:shadow-xl">

                                    <img
                                        src={category.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
                                        alt={category.name}
                                        className="w-full h-48 object-cover bg-gray-200"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error';
                                        }}
                                        loading="lazy"
                                    />

                                    <div className="p-4 min-w-0">
                                        <h3 className="font-semibold text-xl text-gray-800 truncate" title={category.name}>
                                            {category.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {category.itemCount ?? 0} items
                                        </p>
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex items-end justify-center space-x-4 pb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                                        <button
                                            onClick={() => handleOpenEditModal(category)}
                                            className="p-2 flex bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none transform transition-transform hover:scale-110"
                                            title="Edit Category"
                                        >
                                            <span className="flex items-center mr-1"><MdOutlineEdit size={14} /></span> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCategory(category._id)}
                                            className="p-2 flex bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none transform transition-transform hover:scale-110"
                                            title="Delete Category"
                                        >
                                            <span className="flex items-center mr-1"><LuTrash2 size={14} /></span> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            <Modal isOpen={isAddModalOpen} onClose={handleCloseAddModal} title="Add New Category">
                <AddCategoryForm onClose={handleCloseAddModal} onCategoryAdded={handleCategoryAdded} />
            </Modal>
            {currentCategory && (
                <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal} title={`Edit Category: ${currentCategory.name}`}>
                    <EditCategoryForm categoryToEdit={currentCategory} onClose={handleCloseEditModal} onCategoryUpdated={handleCategoryUpdated} />
                </Modal>
            )}

        </div>
    );
};

export default CategoryPage;