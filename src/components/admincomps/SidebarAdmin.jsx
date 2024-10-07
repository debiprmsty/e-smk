import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaBox, FaThLarge, FaShoppingCart, FaCogs, FaTimes, FaTags, FaEllipsisH } from 'react-icons/fa';

function SidebarAdmin({ isSidebarVisible, toggleSidebar }) {
  return (
    <div>
      <div className={`bg-gray-800 shadow-lg min-h-screen p-4 sm:p-8 w-full sm:w-72 fixed sm:relative z-50 transition-transform duration-300 ${isSidebarVisible ? 'translate-x-0 mt-0' : '-translate-x-full sm:translate-x-0 -mt-16'} `}>
        <button
          className="sm:hidden text-white p-2 absolute top-4 right-4"
          onClick={toggleSidebar}
        >
          {isSidebarVisible ? <FaTimes /> : <FaEllipsisH />}
        </button>

        <h1 className="text-2xl font-bold text-white mb-2 text-center">Admin SMK</h1>
        <h2 className="text-lg text-gray-500 mb-4 mt-4 ml-5">Menu</h2>

        <ul>
          <li className="flex items-center py-3 hover:bg-gray-700 rounded-lg transition-colors duration-200 px-4">
            <FaTachometerAlt className="mr-2 text-white" />
            <Link to="/admin" className="text-white" onClick={toggleSidebar}>Dashboard</Link>
          </li>
          <li className="flex items-center py-3 hover:bg-gray-700 rounded-lg transition-colors duration-200 px-4">
            <FaBox className="mr-2 text-white" />
            <Link to="/admin/product" className="text-white" onClick={toggleSidebar}>Produk</Link>
          </li>
          <li className="flex items-center py-3 hover:bg-gray-700 rounded-lg transition-colors duration-200 px-4">
            <FaThLarge className="mr-2 text-white" />
            <Link to="/admin/category" className="text-white" onClick={toggleSidebar}>Kategori</Link>
          </li>
          <li className="flex items-center py-3 hover:bg-gray-700 rounded-lg transition-colors duration-200 px-4">
            <FaShoppingCart className="mr-2 text-white" />
            <Link to="/admin/order" className="text-white" onClick={toggleSidebar}>Order</Link>
          </li>
          <li className="flex items-center py-3 hover:bg-gray-700 rounded-lg transition-colors duration-200 px-4">
            <FaTags className="mr-2 text-white" />
            <Link to="/admin/promo" className="text-white" onClick={toggleSidebar}>Promo</Link>
          </li>
          <li className="flex items-center py-3 hover:bg-gray-700 rounded-lg transition-colors duration-200 px-4">
            <FaCogs className="mr-2 text-white" />
            <Link to="/admin/settings" className="text-white" onClick={toggleSidebar}>Pengaturan</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SidebarAdmin;
