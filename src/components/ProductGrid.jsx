import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard.jsx";
import Loading from "./Loader";
import axios from "axios";

const ProductGrid = ({ selectedCategory, searchTerm, onCategorySelect }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const url = selectedCategory
                ? `${apiUrl}/products/category/${selectedCategory}`
                : `${apiUrl}/products`;
            const response = await axios.get(url);
            if (response.status === 200) {
                setProducts(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${apiUrl}/category`);
            if (response.status === 200) {
                // Menambahkan kategori khusus "All" di awal daftar kategori
                setCategories([{ id: null, name_category: 'All' }, ...response.data]);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory]);

    useEffect(() => {
        fetchCategories();
    }, []);

    // Filter products based on the searchTerm
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto py-8 w-full md:mt-20">
            <div className="block md:hidden overflow-x-auto whitespace-nowrap py-2 mb-4">
                {categories.map(category => (
                    <span
                        key={category.id}
                        className={`inline-block px-4 py-2 mr-2 rounded-full cursor-pointer ${selectedCategory === category.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                        onClick={() => onCategorySelect(category.id)}
                    >
                        {category.name_category}
                    </span>
                ))}
            </div>
            {loading ? (
                <div className="flex justify-center">
                    <Loading />
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:ml-12">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p>No products found</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductGrid;
