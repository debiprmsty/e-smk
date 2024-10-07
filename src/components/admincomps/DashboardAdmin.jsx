import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loader'; // Import komponen Loading

function DashboardAdmin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // State untuk loading
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    setLoading(true); // Set loading menjadi true saat mulai fetching data
    try {
      const response = await axios.get(`${apiUrl}/products`);
      if (response.status === 200) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false); // Set loading menjadi false setelah selesai
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-5 bg-gray-900 min-h-screen">
      {loading && <Loading />} {/* Tampilkan komponen Loading saat loading true */}
      <h2 className="text-3xl font-bold text-white mb-6">Dashboard Overview</h2>

      {/* Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-lg rounded-lg p-6 transform transition-transform duration-200 hover:scale-105">
          <h3 className="text-lg font-semibold text-gray-700">Total Produk</h3>
          <p className="text-3xl font-bold text-gray-900">{products.length}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 transform transition-transform duration-200 hover:scale-105">
          <h3 className="text-lg font-semibold text-gray-700">Total Promo</h3>
          <p className="text-3xl font-bold text-gray-900">12</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 transform transition-transform duration-200 hover:scale-105">
          <h3 className="text-lg font-semibold text-gray-700">Total Order</h3>
          <p className="text-3xl font-bold text-gray-900">200</p>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column for Order Graph */}
        <div className="col-span-2 bg-white shadow-lg rounded-lg p-6 transform transition-transform duration-200 hover:scale-105">
          <h3 className="text-lg font-semibold text-gray-700">Grafik Order</h3>
          {/* Placeholder for the graph */}
          <div className="h-60 bg-gray-300 flex items-center justify-center rounded-lg">
            <p className="text-gray-500">Grafik order akan ditampilkan di sini</p>
          </div>
        </div>

        {/* Column for About Admin System */}
        <div className="bg-white shadow-lg rounded-lg p-6 transform transition-transform duration-200 hover:scale-105">
          <h3 className="text-lg font-semibold text-gray-700">Tentang Sistem Admin</h3>
          <p className="text-gray-600">
            Sistem admin ini dirancang untuk mempermudah pengelolaan produk, kategori, dan order dalam aplikasi e-commerce.
            Anda dapat melihat statistik dan grafik untuk membantu dalam pengambilan keputusan.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;
