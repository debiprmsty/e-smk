import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import axios from 'axios';
import Loading from '../../components/Loader'; // Impor komponen Loading

function CategoryAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const token = localStorage.getItem('token');
    setIsLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
      $(document).ready(function () {
        $('#productTable').DataTable();
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (title, name = '', id = null) => {
    setModalTitle(title);
    setCategoryName(name);
    setCategoryId(id);
    setIsEdit(!!id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCategoryName('');
    setCategoryId(null);
    setIsEdit(false);
  };

  const openDeleteModal = (id) => {
    setCategoryId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCategoryId(null);
  };

  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setIsSubmitting(true);

    try {
      if (isEdit) {
        await axios.post(`${apiUrl}/category/${categoryId}`, { name_category: categoryName }, config);
      } else {
        await axios.post(`${apiUrl}/category`, { name_category: categoryName }, config);
      }
      fetchCategories();
      closeModal();
    } catch (error) {
      console.error('Error submitting category:', error);
    } finally {
      setIsSubmitting(false);
      window.location.reload();
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.get(`${apiUrl}/category/delete/${categoryId}`, config);
      fetchCategories();
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="p-5 bg-slate-900 h-full">
      {isLoading && <Loading />} {/* Menggunakan komponen Loading */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Manajemen Category</h2>

        {/* Tombol Tambah */}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 mb-4"
          onClick={() => openModal('Tambah Category')}
        >
          Tambah Category
        </button>

        {/* DataTable */}
        <table id="productTable" className="display min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b text-start">No</th>
              <th className="py-2 px-4 border-b text-left">Nama Kategori</th>
              <th className="py-2 px-4 border-b text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.id}>
                <td className="py-2 px-4 border-b text-start">{index + 1}</td>
                <td className="py-2 px-4 border-b text-left">{category.name_category}</td>
                <td className="py-2 px-4 border-b text-left">
                  <button
                    className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 transition duration-200 mr-2"
                    onClick={() => openModal('Ubah Category', category.name_category, category.id)}
                  >
                    Ubah
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-200"
                    onClick={() => openDeleteModal(category.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal untuk Tambah/Ubah Category */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-1/3 mt-10">
            <h2 className="text-2xl font-bold mb-4">{modalTitle}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryName">
                  Nama Category
                </label>
                <input
                  type="text"
                  id="categoryName"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={categoryName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200"
                  onClick={closeModal}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                  disabled={isSubmitting} // Disable button saat submit
                >
                  {isSubmitting ? 'Loading...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal untuk Konfirmasi Hapus Category */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-1/3 mt-10">
            <h2 className="text-2xl font-bold mb-4">Konfirmasi Hapus</h2>
            <p>Apakah Anda yakin ingin menghapus kategori ini?</p>
            <div className="flex items-center justify-between mt-4">
              <button
                type="button"
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200"
                onClick={closeDeleteModal}
              >
                Batal
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
                onClick={handleDelete}
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

export default CategoryAdmin;
