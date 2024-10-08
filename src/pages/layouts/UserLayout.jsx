import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar.jsx';
import Sidebar from '../../components/Sidebar.jsx';
import Carousel from '../../components/Carousel.jsx';
import ProductGrid from '../../components/ProductGrid.jsx';
import ProductDetail from '../ProductDetail.jsx';
import Cart from '../Cart.jsx';
import Login from '../auth/Login.jsx';
import Home from '../Home.jsx';
import ProtectedRoute from '../../middleware/ProtectedRoute.jsx';

const UserLayout = ({ selectedCategory, handleSelectCategory, handleSearch, showCarousel, showSidebar, searchTerm }) => (
    <div className="min-h-screen">
        {location.pathname !== "/auth/login" && <Navbar onSearch={handleSearch} />}
        {showCarousel && <Carousel />}
        <div className="flex flex-col md:flex-row">
            {showSidebar && (
                <div className="w-full md:w-1/4 p-4 order-1 md:order-none">
                    <Sidebar onSelectCategory={handleSelectCategory} />
                </div>
            )}
            <div className={`flex-1 ${location.pathname !== "/auth/login" && !showCarousel ? 'p-4' : ''} order-2 md:order-none`}>
                <Routes>
                    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="/market" element={<ProtectedRoute><ProductGrid selectedCategory={selectedCategory} searchTerm={searchTerm} onCategorySelect={handleSelectCategory} /></ProtectedRoute>} />
                    <Route path="/product/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
                    <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </div>
    </div>
);

export default UserLayout;
