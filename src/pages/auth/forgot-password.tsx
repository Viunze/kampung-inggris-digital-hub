// src/pages/auth/forgot-password.tsx

import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useAuth } from '@/hooks/useAuth';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [resetError, setResetError] = useState<string | null>(null);
  const { resetPassword, loading } = useAuth(); // Ambil resetPassword dari useAuth

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setResetError('Email harus diisi!');
      return;
    }
    setMessage(null);
    setResetError(null);
    try {
      await resetPassword(email);
      setMessage('Link reset password telah dikirim ke email Anda. Silakan cek kotak masuk Anda.');
    } catch (err: any) {
      setResetError(err.message || 'Terjadi kesalahan saat mengirim link reset.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-java-cream">
      <Head>
        <title>Lupa Password - Kampung Inggris Digital Hub</title>
      </Head>
      <div className="bg-white p-8 rounded-xl shadow-jawa-deep w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-java-brown-dark mb-6">Lupa Password?</h2>
        <p className="text-center text-gray-600 mb-6">
          Masukkan email Anda dan kami akan mengirimkan link untuk mereset password Anda.
        </p>
        {message && <p className="text-green-600 text-center mb-4">{message}</p>}
        {resetError && <p className="text-red-500 text-center mb-4">{resetError}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button
            type="submit"
            className="w-full bg-java-green-dark text-white py-2 rounded-lg font-semibold hover:bg-java-green-light transition-colors duration-300"
            disabled={loading}
          >
            {loading ? 'Mengirim...' : 'Kirim Link Reset'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          <Link href="/auth/login" legacyBehavior>
            <a className="text-java-green-dark hover:underline font-semibold">Kembali ke Login</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

ForgotPasswordPage.displayName = 'ForgotPasswordPage'; // Untuk pengecualian layout

export default ForgotPasswordPage;
