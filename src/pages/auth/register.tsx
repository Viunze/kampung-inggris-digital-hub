// src/pages/auth/register.tsx

import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useAuth } from '@/hooks/useAuth';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState(''); // Untuk nama tampilan
  const { signUp, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !displayName) {
      alert('Semua kolom harus diisi!');
      return;
    }
    try {
      await signUp(email, password, displayName);
    } catch (err) {
      // Error ditangani oleh useAuth
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-java-cream">
      <Head>
        <title>Daftar - Kampung Inggris Digital Hub</title>
      </Head>
      <div className="bg-white p-8 rounded-xl shadow-jawa-deep w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-java-brown-dark mb-6">Daftar Akun Baru</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="displayName" className="block text-gray-700 text-sm font-semibold mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="displayName"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-java-green-light focus:outline-none transition-colors"
              placeholder="Nama Anda"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-java-green-light focus:outline-none transition-colors"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-java-green-light focus:outline-none transition-colors"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-java-green-dark text-white py-2 rounded-lg font-semibold hover:bg-java-green-light transition-colors duration-300"
            disabled={loading}
          >
            {loading ? 'Memuat...' : 'Daftar'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Sudah punya akun?{' '}
          <Link href="/auth/login" legacyBehavior>
            <a className="text-java-green-dark hover:underline font-semibold">Login di sini</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

RegisterPage.displayName = 'RegisterPage'; // Untuk pengecualian layout

export default RegisterPage;
