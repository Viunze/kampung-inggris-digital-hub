// src/pages/kos-homestay/[id].tsx

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '@/components/Layout/MainLayout';
import Image from 'next/image';
import { getDocById } from '@/lib/firestore'; // Impor fungsi dari firestore.ts
import { KosHomestay } from '@/types/models';

const FacilityDetailIcon = ({ name }: { name: string }) => {
  let iconComponent;
  switch (name.toLowerCase()) {
    case 'wifi': iconComponent = <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.003 9.003 0 01-4.878-1.333M12 3c4.418 0 8 4.03 8 9s-3.582 9-8 9-9-4.03-9-9 4.03-9 9-9z"></path></svg>; break;
    case 'km dalam': iconComponent = <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h.01M15 3h.01M15 7h.01M19 3h.01M19 7h.01M19 11h.01"></path></svg>; break;
    case 'ac': iconComponent = <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h1M3 12H2M15.536 8.464l-.707-.707M8.464 15.536l-.707-.707M15.536 15.536l-.707.707M8.464 8.464l-.707.707M6 12a6 6 0 1112 0 6 6 0 01-12 0z"></path></svg>; break;
    case 'dapur': iconComponent = <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>; break;
    case 'kasur': iconComponent = <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7H4a2 2 0 00-2 2v7a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6M12 10v6"></path></svg>; break; // Kasur
    case 'lemari': iconComponent = <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>; break; // Lemari
    default: iconComponent = <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2-2m0 0l2 2m-2-2v12a2 2 0 01-2 2H9a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2z"></path></svg>; break;
  }
  return iconComponent;
};


const KosDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [kos, setKos] = useState<KosHomestay | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKos = async () => {
      if (id && typeof id === 'string') {
        try {
          setLoading(true);
          const kosData = await getDocById<KosHomestay>('kosHomestay', id);
          if (kosData) {
            setKos(kosData);
          } else {
            setError('Kos/Homestay tidak ditemukan.');
          }
        } catch (err: any) {
          setError(err.message || 'Gagal memuat detail kos.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchKos();
  }, [id]);

  if (loading) {
    return <MainLayout title="Memuat..."><p className="text-center text-lg mt-10">Memuat detail kos...</p></MainLayout>;
  }

  if (error) {
    return <MainLayout title="Error"><p className="text-center text-red-500 text-lg mt-10">{error}</p></MainLayout>;
  }

  if (!kos) {
    return <MainLayout title="Tidak Ditemukan"><p className="text-center text-gray-600 text-lg mt-10">Kos/Homestay tidak ditemukan.</p></MainLayout>;
  }

  return (
    <MainLayout title={kos.name}>
      <div className="bg-white rounded-xl shadow-jawa-soft p-8">
        {/* Gambar Utama */}
        {kos.photos && kos.photos.length > 0 && (
          <div className="relative w-full h-96 bg-gray-200 overflow-hidden rounded-lg mb-6">
            <Image
              src={kos.photos[0]}
              alt={kos.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
              unoptimized
            />
            {kos.isVerified && (
              <span className="absolute top-4 left-4 bg-java-green-dark text-white text-base font-semibold px-3 py-1 rounded-full shadow-md">
                <svg className="w-5 h-5 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                Verified
              </span>
            )}
          </div>
        )}

        {/* Informasi Utama */}
        <div className="flex justify-between items-start mb-6 border-b pb-4 border-gray-100">
          <div>
            <h1 className="text-4xl font-bold text-java-brown-dark">{kos.name}</h1>
            <p className="text-gray-600 text-lg mt-2">{kos.address}</p>
            <div className="flex items-center text-gray-700 mt-3">
              <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span>{kos.distanceToCenter} menit dari pusat</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold text-java-green-dark">
              Rp {kos.pricePerMonth.toLocaleString('id-ID')}
            </span>
            <p className="text-sm text-gray-500">per bulan</p>
          </div>
        </div>

        {/* Deskripsi */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-java-brown-dark mb-3">Deskripsi</h2>
          <p className="text-gray-700 leading-relaxed">{kos.description}</p>
        </div>

        {/* Fasilitas */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-java-brown-dark mb-3">Fasilitas Tersedia</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {kos.facilities.map((facility, index) => (
              <div key={index} className="flex items-center text-gray-700">
                <FacilityDetailIcon name={facility} />
                <span className="text-lg">{facility}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Informasi Kontak */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-java-brown-dark mb-3">Kontak Pemilik</h2>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Telepon/WA:</span> {kos.ownerContact}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Alamat:</span> {kos.address}
          </p>
        </div>

        {/* Bagian Ulasan (Jika ada, mirip dengan kursus) */}
        {/*
        <div>
          <h2 className="text-2xl font-bold text-java-brown-dark mb-4">Ulasan Penyewa</h2>
          <p className="text-gray-500 italic">
            (Daftar ulasan penyewa akan ditampilkan di sini.)
          </p>
        </div>
        */}
      </div>
    </MainLayout>
  );
};

export default KosDetailPage;
