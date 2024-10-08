import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AdminLayout from './pages/layouts/AdminLayout.jsx';
import UserLayout from './pages/layouts/UserLayout.jsx';
import { AuthProvider } from './middleware/AuthProvider.jsx';

function App() {
    const location = useLocation();
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

    const showCarousel = location.pathname === '/' || location.pathname === '/market';
    const showSidebar = location.pathname === '/market';

    return (
        <AuthProvider>
            <Routes>
                <Route path="/admin/*" element={<AdminLayout isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />} />
                <Route path="/*" element={<UserLayout
                    selectedCategory={selectedCategory}
                    handleSelectCategory={handleSelectCategory}
                    handleSearch={handleSearch}
                    showCarousel={showCarousel}
                    showSidebar={showSidebar}
                    searchTerm={searchTerm}
                />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
