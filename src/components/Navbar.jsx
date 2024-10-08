import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi'; // Import ikon keranjang dari react-icons
import Avatar from "../assets/images/avatar.png";

function Navbar({ onSearch }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const searchInputRef = useRef(null);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };

    useEffect(() => {
        if (location.pathname === '/market' && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [location]);

    return (
        <div>
            <nav className="bg-white shadow">
                <div className="px-8 mx-auto max-w-7xl">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex-shrink-0 font-bold text-2xl">
                                E-SMK
                            </Link>
                        </div>

                        <div className="flex-grow hidden md:flex justify-center">
                            {location.pathname === '/' ? (
                                <button
                                    onClick={() => navigate('/market')}
                                    className="w-full md:mr-96 md:ml-8 px-4 py-2 border border-gray-200 text-gray-400 text-left rounded-md focus:outline-none"
                                >
                                    Cari Produk
                                </button>
                            ) : location.pathname.startsWith('/product/') || location.pathname.startsWith('/cart') ? (
                                null
                            ) : (
                                <input
                                    type="text"
                                    placeholder="Temukan Produk Disini"
                                    className="w-full md:mr-96 md:ml-8 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    ref={searchInputRef}
                                />
                            )}
                        </div>

                        <div className="flex items-center">
                            <Link to="/admin" className="relative">
                                <FiShoppingCart className="w-6 h-6 text-gray-800" />
                                {/* Optional: Add a badge for the number of items in the cart */}
                                {/* <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                                    3
                                </span> */}
                            </Link>

                            <div className="relative ml-4">
                                <div
                                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer"
                                    onClick={toggleDropdown}
                                >
                                    <img src={Avatar} alt="User Avatar" className="w-full h-full object-cover" />
                                </div>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                                        <Link to="/auth/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-center">
                                            Logout
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <div className="md:hidden ml-4">
                                <button onClick={toggleMobileMenu} className="text-gray-800 hover:text-gray-600 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white shadow-md">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {location.pathname === '/' || location.pathname === '/market' ? (
                                <button
                                    onClick={() => navigate('/market')}
                                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
                                >
                                    Cari Produk
                                </button>
                            ) : location.pathname.startsWith('/product/') ? (
                                null
                            ) : (
                                <input
                                    type="text"
                                    placeholder="Temukan Produk Disini"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    ref={searchInputRef}
                                />
                            )}
                            <Link to="/auth/logout" className="w-full text-white bg-slate-700 text-center block px-3 py-2 rounded-md text-base font-medium">
                                Logout
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
}

export default Navbar;
