import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import SidebarAdmin from './components/admincomps/SidebarAdmin.jsx';
import HeaderAdmin from './components/admincomps/HeaderAdmin.jsx';
import Carousel from './components/Carousel.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Login from './pages/auth/Login.jsx';
import Home from './pages/Home.jsx';
import HomeAdmin from './pages/admin/HomeAdmin.jsx';
import ProductAdmin from './pages/admin/ProductAdmin.jsx';
import CategoryAdmin from './pages/admin/CategoryAdmin.jsx';
import ProtectedRoute from './middleware/ProtectedRoute.jsx';
import { AuthProvider } from './middleware/AuthProvider.jsx';

function App() {
    const location = useLocation();
    const isAdminPage = location.pathname.startsWith('/admin'); // Change to startsWith to catch all /admin paths
    const showCarousel = location.pathname === '/' || location.pathname === '/market';
    const showSidebar = location.pathname === '/market';

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const handleSelectCategory = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleSearch = (term) => {
        if (location.pathname === '/market') {
            setSearchTerm(term);
        }
    };

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return (
        <AuthProvider>
            <>
                {isAdminPage ? (
                    <div className="flex flex-col min-h-screen bg-green-500">
                        <HeaderAdmin toggleSidebar={toggleSidebar} />
                        <div className="flex flex-1">
                            <SidebarAdmin isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
                            <div className="flex-1">
                                <Routes>
                                    <Route path="/admin" element={<ProtectedRoute><HomeAdmin /></ProtectedRoute>} />
                                    <Route path="/admin/product" element={<ProtectedRoute><ProductAdmin /></ProtectedRoute>} />
                                    <Route path="/admin/category" element={<ProtectedRoute><CategoryAdmin /></ProtectedRoute>} />
                                    <Route path="*" element={<Navigate to="/admin" />} /> {/* Add a wildcard route */}
                                </Routes>
                            </div>
                        </div>
                    </div>
                ) : (
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
                                    <Route path="*" element={<Navigate to="/" />} /> {/* Add a wildcard route for non-admin pages */}
                                </Routes>
                            </div>
                        </div>
                    </div>
                )}
            </>
        </AuthProvider>
    );
}

export default App;
