import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/Loader';
import { formatRupiah } from "../utils/FormatRupiah.js";

function Cart() {
  // State untuk mengatur modal dan data form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [cartItems, setCartItems] = useState([]); // Daftar item keranjang
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL; // URL API
  const [totalAmount, setTotalAmount] = useState(0); // Total harga keranjang

  // Fungsi untuk mengambil item keranjang
  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/carts/me-cart`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCartItems(response.data.data); // Set item keranjang
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setIsLoading(false); // Ubah status loading
    }
  };

  // Menghitung total harga ketika item keranjang berubah
  useEffect(() => {
    const total = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    setTotalAmount(total);
  }, [cartItems]);

  // Fungsi untuk menghapus item dari keranjang
  const handleDelete = async () => {
    if (itemToDelete) {
      setIsDeleting(true);
      try {
        const token = localStorage.getItem('token');
        await axios.get(`${apiUrl}/carts/delete/${itemToDelete}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        fetchCartItems(); // Ambil kembali item keranjang
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error('Error deleting cart item:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Fungsi untuk menangani pengiriman order
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const data = {
      "no_hp": phone,
      "alamat": address,
      "metode_pembayaran": paymentMethod,
      "nama_akun": bank,
      "total": totalAmount, // Sertakan total harga
    }

    const response = await axios.post(
      `${apiUrl}/order`,
      {
        no_hp: phone,
        alamat: address,
        metode_pembayaran: paymentMethod,
        nama_akun: bank,
        total: totalAmount, // Sertakan total harga
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status == 200) {
      setIsModalOpen(false);
      alert('Order berhasil dibuat dan dikirim ke WhatsApp admin!');
    }

    console.log(response);




  };

  // Ambil item keranjang saat komponen dimuat
  useEffect(() => {
    fetchCartItems();
  }, []);

  // Fungsi untuk membuka modal konfirmasi hapus
  const openDeleteModal = (itemId) => {
    setItemToDelete(itemId);
    setIsDeleteModalOpen(true);
  };

  // Fungsi untuk menutup modal konfirmasi hapus
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  // Daftar bank untuk metode pembayaran
  const banks = [
    "Bank Central Asia (BCA)",
    "Bank Negara Indonesia (BNI)",
    "Bank Rakyat Indonesia (BRI)",
    "Bank Mandiri",
    "CIMB Niaga",
    "Bank Danamon",
    "Bank Permata",
    "OCBC NISP",
    "Maybank Indonesia",
    "Bank Syariah Indonesia (BSI)",
    "Bank Mega",
    "Bank Sinarmas",
    "BNI Syariah",
    "BTPN",
    "Bank Artha Graha",
  ];

  // Jika masih loading, tampilkan loader
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col max-w-6xl p-6 space-y-4 sm:p-10 bg-slate-200 my-14">
        <h2 className="text-xl font-semibold">Keranjang Anda</h2>
        {cartItems.length > 0 ? (
          <ul className="flex flex-col">
            {cartItems.map((item, index) => (
              <li key={index} className="flex flex-col sm:flex-row sm:justify-between mt-5 border-b-2 border-gray-300">
                <div className="flex w-full space-x-2 sm:space-x-4">
                  <img
                    className="flex-shrink-0 object-cover w-20 h-20 rounded outline-none sm:w-32 sm:h-32"
                    src={`${apiUrl}/products/images/${item.product.images}`}
                    alt={item.product.title}
                  />
                  <div className="flex flex-col justify-between w-full pb-4">
                    <div className="flex justify-between w-full pb-2 space-x-2">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold leading-snug">{item.product.title}</h3>
                        <p className="text-sm">{item.product.category.name_category}</p>
                      </div>
                    </div>
                    <div className="w-full flex justify-between">
                      <p className="md:text-lg text-sm font-semibold">{formatRupiah(item.product.price)}</p>
                      <p className="md:text-md text-xs">Qty: {item.quantity}</p>
                    </div>
                    <div className="flex text-sm mt-5">
                      <button type="button" className="flex items-center px-2 py-1 pl-0 space-x-1" onClick={() => openDeleteModal(item.id)}>
                        <svg className="w-5 h-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M6 2a1 1 0 00-1 1v1H3a1 1 0 100 2h14a1 1 0 100-2h-2V3a1 1 0 00-1-1H6zM5 6a1 1 0 00-1 1v9a2 2 0 002 2h8a2 2 0 002-2V7a1 1 0 00-1-1H5zm2 3a1 1 0 112 0v6a1 1 0 11-2 0V9zm4 0a1 1 0 112 0v6a1 1 0 11-2 0V9z" />
                        </svg>
                        <span className="text-red-500">Hapus</span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">Keranjang Anda kosong</p>
        )}

        <div className="flex justify-between mt-5">
          <p className="text-lg font-semibold">
            Total: {formatRupiah(totalAmount)} {/* Tampilkan total harga di sini */}
          </p>
          <button
            type="button"
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            onClick={() => setIsModalOpen(true)}
          >
            Buat Pesanan
          </button>
        </div>
      </div>

      {/* Modal untuk konfirmasi hapus */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="w-1/3 p-4 bg-white rounded shadow-md">
            <h3 className="text-lg font-semibold">Hapus Item</h3>
            <p>Apakah Anda yakin ingin menghapus item ini dari keranjang?</p>
            <div className="flex justify-between mt-4">
              <button className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700" onClick={handleDelete}>
                {isDeleting ? 'Menghapus...' : 'Hapus'}
              </button>
              <button className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-200" onClick={closeDeleteModal}>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal untuk membuat pesanan */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="w-1/3 p-4 bg-white rounded shadow-md">
            <h3 className="text-lg font-semibold">Buat Pesanan</h3>
            <form onSubmit={handleOrderSubmit}>
              <label className="block mt-4">
                No. HP:
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="block w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <label className="block mt-4">
                Alamat:
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="block w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <label className="block mt-4">
                Metode Pembayaran:
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded"
                >
                  <option value="cash">Cash</option>
                  <option value="transfer">Transfer Bank</option>
                </select>
              </label>
              {paymentMethod === 'transfer' && (
                <>
                  <label className="block mt-4">
                    Nama Bank:
                    <select
                      value={bank}
                      onChange={(e) => setBank(e.target.value)}
                      className="block w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="">Pilih Bank</option>
                      {banks.map((bank, index) => (
                        <option key={index} value={bank}>{bank}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block mt-4">
                    Nomor Rekening:
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      required
                      className="block w-full p-2 border border-gray-300 rounded"
                    />
                  </label>
                </>
              )}
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Kirim Pesanan
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-200"
                  onClick={() => setIsModalOpen(false)}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
