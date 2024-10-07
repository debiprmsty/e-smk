import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import Loading from '../components/Loader';
import { formatRupiah } from "../utils/FormatRupiah.js";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${apiUrl}/products/${id}`);
        setProduct(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${apiUrl}/carts`, {
        id_product: product.id,
        quantity: quantity
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Product added to cart:', response.data);

      // Arahkan ke halaman cart
      navigate('/cart');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  if (loading) {
    return <Loading />; // Tampilkan komponen Loading
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-4 m-2 bg-slate-900 text-white rounded-lg mx-auto max-w-5xl my-12 shadow-lg">
      <img src={`${apiUrl}/products/images/${product.images}`} alt={product.title} className="w-full h-72 object-cover rounded-lg mb-4" />
      <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
      <p className="text-lg text-gray-400 mb-2">{formatRupiah(product.price)}</p>
      <p className="text-md text-gray-300 mb-4">{product.description}</p>
      <div className="flex items-center mb-4 space-x-2">
        <button
          onClick={decreaseQuantity}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-l-lg"
        >
          -
        </button>
        <span className="px-4 py-2 bg-slate-800 text-white rounded-lg">{quantity}</span>
        <button
          onClick={increaseQuantity}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-r-lg"
        >
          +
        </button>
      </div>
      <button
        onClick={handleCart}
        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded flex justify-between gap-4 items-center"
      >
        <i className="fas fa-shopping-cart text-white text-md"></i>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
