import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const Goback = () => {
    const navigate = useNavigate(); 

   
    const handleGoBackClick = () => {
        navigate('/categories'); 
    };

    return (
        <div className="min-h-[84vh] p-6 flex flex-col justfy-center items-center"> 
            <h1 className="text-2xl font-semibold text-gray-800">Assignment for Category Management Dashboard</h1>
            <p className="mt-2 text-gray-600">Please click the button below to go back to the Categories Page.</p>
            <button
                onClick={handleGoBackClick} 
                className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 flex items-center transition duration-150 ease-in-out text-sm" // Added mt-4 for spacing
            >
                Go Back to Categories
            </button>
        </div>
    );
};

export default Goback;