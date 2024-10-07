import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net';
import axios from 'axios';
import SidebarAdmin from '../../components/admincomps/SidebarAdmin';
import HeaderAdmin from '../../components/admincomps/HeaderAdmin';
import Loading from '../../components/Loader';
import { formatRupiah } from '../../utils/FormatRupiah.js';

function ProductAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [code, setCode] = useState('');
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [sold, setSold] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [productId, setProductId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/products`);
      if (response.status === 200) {
        setProducts(response.data.data);
      }
      $(document).ready(function () {
        $('#productTable').DataTable({
          responsive: true,
        });
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/category`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (title, product = null) => {
    setModalTitle(title);
    if (product) {
      setProductId(product.id);
      setProductName(product.title);
      setProductImage(product.images);
      setCategory(product.id_category);
      setPrice(product.price);
      setDescription(product.description);
      setStock(product.stock);
      setSold(product.sold);
      setCode(product.code); // Set code when editing
      setIsEdit(true);
    } else {
      resetForm();
      setIsEdit(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    resetForm();
    setIsModalOpen(false);
  };

  const resetForm = () => {
    setProductId(null);
    setProductName('');
    setProductImage(null);
    setCategory('');
    setPrice('');
    setDescription('');
    setStock('');
    setCode('');
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'productImage') {
      setProductImage(files[0]);
    } else {
      switch (name) {
        case 'productName':
          setProductName(value);
          break;
        case 'category':
          setCategory(value);
          break;
        case 'price':
          setPrice(value);
          break;
        case 'description':
          setDescription(value);
          break;
        case 'stock':
          setStock(value);
          break;
        case 'code':
          setCode(value);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', productName);
    formData.append('file', productImage);
    formData.append('id_category', category);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('stock', stock);
    formData.append('sold', sold);
    formData.append('code', code);

    setLoading(true);
    try {
      let response;
      if (isEdit) {
        response = await axios.post(`${apiUrl}/products/update/${productId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
      } else {
        response = await axios.post(`${apiUrl}/products/${category}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
      }

      setProducts((prevProducts) => {
        if (isEdit) {
          return prevProducts.map((product) =>
            product.id === response.data.data.id ? response.data.data : product
          );
        } else {
          return [response.data.data, ...prevProducts];
        }
      });
      closeModal();
      window.location.reload()
    } catch (error) {
      console.error('Error submitting product:', error);
    } finally {
      setLoading(true)
      window.location.reload()
    }
  };

  const handleDelete = (id) => {
    setProductToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      await axios.get(`${apiUrl}/products/delete/${productToDelete}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productToDelete)
      );

      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Terjadi kesalahan saat menghapus produk. Silakan coba lagi.');
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <div className="flex h-screen bg-slate-900">
      {/* <SidebarAdmin isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <HeaderAdmin /> */}
        <div className="flex-1 p-5 overflow-auto">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Manajemen Produk</h2>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 mb-4"
              onClick={() => openModal('Tambah Produk')}
            >
              Tambah Produk
            </button>
            {loading && <Loading />}
            {!loading && (
              <table id="productTable" className="display min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4 border-b text-start">No</th>
                    <th className="py-2 px-4 border-b text-left">Nama Produk</th>
                    <th className="py-2 px-4 border-b text-left">Kode Produk</th>
                    <th className="py-2 px-4 border-b text-left">Gambar</th>
                    <th className="py-2 px-4 border-b text-left">Kategori</th>
                    <th className="py-2 px-4 border-b text-left">Harga</th>
                    <th className="py-2 px-4 border-b text-left">Deskripsi</th>
                    <th className="py-2 px-4 border-b text-start">Stok</th>
                    <th className="py-2 px-4 border-b text-start">Sold</th>
                    <th className="py-2 px-4 border-b text-left">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product.id}>
                      <td className="py-2 px-4 border-b text-start">{index + 1}</td>
                      <td className="py-2 px-4 border-b text-left">{product.title}</td>
                      <td className="py-2 px-4 border-b text-left">{product.code}</td>
                      <td className="py-2 px-4 border-b text-left">
                        <img
                          src={`${apiUrl}/products/images/${product.images}`}
                          alt={product.title}
                          className="w-20"
                        />
                      </td>
                      <td className="py-2 px-4 border-b text-left">{product.category.name_category}</td>
                      <td className="py-2 px-4 border-b text-left">{formatRupiah(product.price)}</td>
                      <td className="py-2 px-4 border-b text-left">{product.description}</td>
                      <td className="py-2 px-4 border-b text-start">{product.stock}</td>
                      <td className="py-2 px-4 border-b text-start">{product.sold}</td>
                      <td className="py-2 px-4 border-b text-left">
                        <button
                          className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 transition duration-200 mr-2"
                          onClick={() => openModal('Edit Produk', product)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-200"
                          onClick={() => handleDelete(product.id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div className="bg-white rounded-lg p-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">{modalTitle}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Nama Produk</label>
                <input
                  type="text"
                  name="productName"
                  value={productName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              {isEdit && (
                <div className="mb-4">
                  <label className="block mb-2 hidden">Kode Produk</label>
                  <input
                    type="hidden"
                    name="code"
                    value={code}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="block mb-2">Gambar Produk</label>
                <input
                  type="file"
                  name="productImage"
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Kategori</label>
                <select
                  name="category"
                  value={category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name_category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Harga</label>
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Deskripsi</label>
                <textarea
                  name="description"
                  value={description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Stok</label>
                <input
                  type="number"
                  name="stock"
                  value={stock}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              {isEdit && (
                <div className="mb-4">
                  <label className="block mb-2">Sold</label>
                  <input
                    type="number"
                    name="sold"
                    value={sold}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 bg-gray-300 rounded px-3 py-2"
                    required
                    disabled
                  />
                </div>
              )}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200 mr-2"
                  onClick={closeModal}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          <div className="bg-white rounded-lg p-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">Konfirmasi Hapus</h2>
            <p>Apakah Anda yakin ingin menghapus produk ini?</p>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200 mr-2"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Batal
              </button>
              <button
                type="button"
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
                onClick={confirmDelete}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductAdmin;
