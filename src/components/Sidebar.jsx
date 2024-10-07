import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Sidebar({ onSelectCategory }) { // Menambahkan prop untuk callback
    const [activeItem, setActiveItem] = useState("Dashboard");
    const [categories, setCategories] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${apiUrl}/category`);
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCategoryClick = (categoryId) => {
        setActiveItem(categoryId);
        if (categoryId === "Dashboard") {
            onSelectCategory(null); // Pass null to indicate that no category is selected
        } else {
            onSelectCategory(categoryId); // Memanggil callback untuk update kategori
        }
    };

    return (
        <div>
            <div className="relative hidden h-screen mb-4 mt-20 mr-12 ml-4 shadow-xl lg:block w-80">
                <div className="h-full bg-white rounded-2xl">
                    <div className="flex items-center justify-center pt-6">
                        <h3 className="text-slate-500 font-bold text-2xl">CATEGORY PRODUCT</h3>
                    </div>
                    <nav className="mt-6">
                        <div>
                            <Link
                                className={`flex items-center justify-start w-full p-4 my-2 font-thin text-slate-500 uppercase transition-colors duration-200 ${
                                    activeItem === "Dashboard"
                                        ? "border-r-4 border-blue-500 bg-gradient-to-r from-white to-blue-100"
                                        : "hover:text-blue-500"
                                }`}
                                href="/market"
                                onClick={() => handleCategoryClick("Dashboard")}
                            >
                                <span className="text-left">
                                    <svg
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="m-auto"
                                        viewBox="0 0 2048 1792"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        {/* Ganti dengan ikon kategori sesuai kebutuhan */}
                                        <path d="M1024 1131q0-64-9-117.5t-29.5-103-60.5-78-97-28.5q-6 4-30 18t-37.5 21.5-35.5 17.5-43 14.5-42 4.5-42-4.5-43-14.5-35.5-17.5-37.5-21.5-30-18q-57 0-97 28.5t-60.5 78-29.5 103-9 117.5 37 106.5 91 42.5h512q54 0 91-42.5t37-106.5zm-157-520q0-94-66.5-160.5t-160.5-66.5-160.5 66.5-66.5 160.5 66.5 160.5 160.5 66.5 160.5-66.5 66.5-160.5zm925 509v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm0-260v-56q0-15-10.5-25.5t-25.5-10.5h-568q-15 0-25.5 10.5t-10.5 25.5v56q0 15 10.5 25.5t25.5 10.5h568q15 0 25.5-10.5t10.5-25.5zm0-252v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm256-320v1216q0 66-47 113t-113 47h-352v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-768v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-352q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1728q66 0 113 47t47 113z"></path>
                                    </svg>
                                </span>
                                <span className="mx-4 text-sm font-normal">Dashboard</span>
                            </Link>
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    className={`flex items-center justify-start w-full p-4 my-2 font-thin text-slate-500 uppercase transition-colors duration-200 ${
                                        activeItem === category.id
                                            ? "border-r-4 border-blue-500 bg-gradient-to-r from-white to-blue-100"
                                            : "hover:text-blue-500"
                                    }`}
                                    href="#"
                                    onClick={() => handleCategoryClick(category.id)}
                                >
                                    <span className="text-left">
                                        <svg
                                            width="20"
                                            height="20"
                                            fill="currentColor"
                                            className="m-auto"
                                            viewBox="0 0 2048 1792"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            {/* Ganti dengan ikon kategori sesuai kebutuhan */}
                                            <path d="M1024 1131q0-64-9-117.5t-29.5-103-60.5-78-97-28.5q-6 4-30 18t-37.5 21.5-35.5 17.5-43 14.5-42 4.5-42-4.5-43-14.5-35.5-17.5-37.5-21.5-30-18q-57 0-97 28.5t-60.5 78-29.5 103-9 117.5 37 106.5 91 42.5h512q54 0 91-42.5t37-106.5zm-157-520q0-94-66.5-160.5t-160.5-66.5-160.5 66.5-66.5 160.5 66.5 160.5 160.5 66.5 160.5-66.5 66.5-160.5zm925 509v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm0-260v-56q0-15-10.5-25.5t-25.5-10.5h-568q-15 0-25.5 10.5t-10.5 25.5v56q0 15 10.5 25.5t25.5 10.5h568q15 0 25.5-10.5t10.5-25.5zm0-252v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm256-320v1216q0 66-47 113t-113 47h-352v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-768v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-352q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1728q66 0 113 47t47 113z"></path>
                                        </svg>
                                    </span>
                                    <span className="mx-4 text-sm font-normal">{category.name_category}</span>
                                </Link>
                            ))}
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
