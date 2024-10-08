import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null); // State untuk menyimpan pesan error
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL; 

  const handleLogin = async (event) => {
    event.preventDefault();

    // Pastikan email diisi
    if (!email) {
      setError('Email harus diisi!');
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email, // Kirim email
      });

      // Jika login berhasil, ambil token dari response
      localStorage.setItem('token', response.data.token); // Simpan token di localStorage

      // Redirect ke halaman home
      navigate('/');
    } catch (err) {
      if (err.response) {
        // Jika ada kesalahan dari server
        setError(err.response.data.message || 'Login gagal!');
      } else {
        // Menangani kesalahan jaringan
        setError('Terjadi kesalahan saat login!');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-800 to-gray-500">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">Login E-SMK</h1>
        {error && <p className="text-red-500 text-center">{error}</p>} {/* Tampilkan pesan error */}
        <form noValidate onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="Email Anda.." 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-gray-100 border-2 border-gray-600" 
            />
          </div>
          <button type="submit" className="block w-full p-3 text-center rounded-sm bg-gray-800 text-white font-semibold">LOGIN</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
