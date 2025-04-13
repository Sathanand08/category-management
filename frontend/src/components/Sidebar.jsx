import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation(); // To highlight active link

    const navItems = [
        { id: 'dashboard', name: 'Dashboard', path: '/dashboard' },
        { id: 'categories', name: 'Categories', path: '/categories' },
        { id: 'orders', name: 'Orders', path: '/goback' },
        { id: 'products', name: 'Products', path: '/goback' },
        { id: 'customers', name: 'Customers', path: '/goback' },
        { id: 'reports', name: 'Reports', path: '/goback' },
        { id: 'coupons', name: 'Coupons', path: '/goback' },
        { id: 'inbox', name: 'Inbox', path: '/goback' },
    ];

    const otherInfoItems = [
        { name: 'Knowledge Base', path: '/knowledge-base' },
        { name: 'Product Updates', path: '/product-updates' },
    ];

    const settingsItems = [
        { name: 'Personal Settings', path: '/settings/personal' },
        { name: 'Global Settings', path: '/settings/global' },
    ];


    const isActive = (itemPath) => {
        // Exact match for unique paths like /dashboard or /categories
        if (itemPath !== '/goback' && location.pathname === itemPath) {
            return true;
        }
    }

    return (
        <div className="w-64 h-screen bg-gray-900 text-gray-300 flex flex-col fixed top-0 left-0 shadow-lg">

            <div className="p-4 text-xl font-bold text-white border-b border-gray-700">
                Revisit Admin
            </div>
            <nav className="flex-grow p-4 overflow-y-auto sidebar-nav">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.name} className="mb-2">
                            <Link
                                to={item.path}
                                className={`flex items-center px-3 py-2 rounded hover:bg-gray-700 hover:text-white transition-colors duration-200 ${isActive(item.path) ? 'bg-blue-600 text-white' : ''
                                    }`}
                            >
                                <span className="ml-3">{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-gray-700">
                    <h3 className="px-3 text-xs uppercase text-gray-500 font-semibold tracking-wider mb-2">Other Information</h3>
                    <ul>
                        {otherInfoItems.map((item) => (
                            <li key={item.name} className="mb-2">
                                <Link to={item.path} className={`flex items-center px-3 py-2 rounded hover:bg-gray-700 hover:text-white transition-colors duration-200 ${isActive(item.path) ? 'bg-blue-600 text-white' : ''}`}>

                                    <span className="ml-3">{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700">
                    <h3 className="px-3 text-xs uppercase text-gray-500 font-semibold tracking-wider mb-2">Settings</h3>
                    <ul>
                        {settingsItems.map((item) => (
                            <li key={item.name} className="mb-2">
                                <Link to={item.path} className={`flex items-center px-3 py-2 rounded hover:bg-gray-700 hover:text-white transition-colors duration-200 ${isActive(item.path) ? 'bg-blue-600 text-white' : ''}`}>

                                    <span className="ml-3">{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

            </nav>
        </div>
    );
};

export default Sidebar;