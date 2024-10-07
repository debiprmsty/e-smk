import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatRupiah } from "../utils/FormatRupiah.js";
import { truncateText } from "../utils/TruncateText.js";

function ProductCard({ product }) {
    const navigate = useNavigate(); // Inisialisasi useNavigate
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleCart = (e, productId) => {
        e.stopPropagation(); // Menghentikan event bubbling agar tidak mengganggu Link
        // Arahkan ke halaman produk
        navigate(`/product/${productId}`);
    };

    return (
        <div className="w-full p-2 mx-auto rounded-2xl border-2 border-slate-200">
            <Link to={`/product/${product.id}`}>
                <img
                    src={`${apiUrl}/products/images/${product.images}`}
                    alt={product.title}
                    className="w-full h-56 object-cover p-4 cursor-pointer"
                />
            </Link>
            <div className="p-4 bg-slate-600 rounded-lg">
                <p className="text-lg font-bold text-white cursor-pointer">
                    {truncateText(product.title, 30)} {/* Truncate title if too long */}
                </p>
                <p className="text-xs text-gray-300 truncate mt-2">
                    {truncateText(product.description, 50)} {/* Truncate description if too long */}
                </p>
                <div className="flex items-center justify-between mt-2">
                    <p className="md:text-lg text-md text-white">
                        {formatRupiah(product.price)}
                    </p>
                    <button
                        type="button"
                        onClick={(e) => handleCart(e, product.id)} // Pass product.id to handleCart
                        className="w-10 h-10 text-base font-medium text-white bg-slate-500 rounded-full hover:bg-slate-700 z-10"
                    >
                        <i className="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
