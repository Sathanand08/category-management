import React from 'react';

// Props:
// - isOpen: boolean to control visibility
// - onClose: function to call when closing the modal (e.g., clicking backdrop or close button)
// - title: string for the modal title
// - children: React node(s) to render as the modal content (e.g., a form)

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    // Prevent closing when clicking inside the modal content
    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        // Backdrop (covers the whole screen)
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4"
            onClick={onClose} // Close modal when backdrop is clicked
        >
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 z-50"
                onClick={handleContentClick} // Prevent clicks inside from closing
            >
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{title || 'Modal Title'}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 text-2xl font-bold focus:outline-none"
                        aria-label="Close modal"
                    >
                        ×
                    </button>
                </div>

                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;