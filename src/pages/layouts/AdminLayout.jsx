import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SidebarAdmin from '../../components/admincomps/SidebarAdmin.jsx';
import HeaderAdmin from '../../components/admincomps/HeaderAdmin.jsx';
import HomeAdmin from '../admin/HomeAdmin.jsx';
import ProductAdmin from '../admin/ProductAdmin.jsx';
import CategoryAdmin from '../admin/CategoryAdmin.jsx';
import ProtectedRoute from '../../middleware/ProtectedRoute.jsx';

const AdminLayout = ({ isSidebarVisible, toggleSidebar }) => (
    <div className="flex flex-col min-h-screen">
        <HeaderAdmin toggleSidebar={toggleSidebar} />
        <div className="flex flex-1">
            <SidebarAdmin isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
            <div className="flex-1">
                <Routes>
                    <Route path="/admin" element={<ProtectedRoute><HomeAdmin /></ProtectedRoute>} />
                    <Route path="/admin/product" element={<ProtectedRoute><ProductAdmin /></ProtectedRoute>} />
                    <Route path="/admin/category" element={<ProtectedRoute><CategoryAdmin /></ProtectedRoute>} />
                    <Route path="*" element={<Navigate to="/admin" />} />
                </Routes>
            </div>
        </div>
    </div>
);

export default AdminLayout;
