import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const DashboardLayout = () => {

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Handlers for Add Category Modal
    const handleOpenAddModal = () => {

        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    // Context to pass down to child routes (like CategoryPage)
    const outletContext = {
        isAddModalOpen,
        handleCloseAddModal,
        handleOpenAddModal
    };

    return (
        <div className="relative min-h-screen ">
            <Sidebar />
            <div className="flex flex-col md:pl-64">
                <Header />
                <main className="flex-1 bg-gray-100 pt-16 px-6 py-8">
                    <div className="container mx-auto max-w-7xl">
                        <Outlet context={outletContext} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;