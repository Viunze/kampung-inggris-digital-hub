// src/pages/locations.tsx

import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import Card from '@/components/UI/Card';
import { useFirestoreData } from '@/hooks/useFirestoreData';
import { Location } from '@/types/models';
import Link from 'next/link';

const LocationCard: React.FC<{ location: Location }> = ({ location }) => (
  <Card className="p-5 flex flex-col space-y-3">
    <h3 className="text-xl font-bold text-java-brown-dark">{location.name}</h3>
    <p className="text-gray-700 text-sm">{location.description}</p>
    <div className="flex items-center text-gray-600 text-sm">
      <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
      <span>{location.address}</span>
    </div>
    {location.googleMapsLink && (
      <a
        href={location.googleMapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-java-green-dark hover:underline text-sm font-medium mt-2"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        Lihat di Google Maps
      </a>
    )}
  </Card>
);

const LocationsPage: React.FC = () => {
  const { data: locations, loading, error } = useFirestoreData<Location>('locations');

  // Kategori unik untuk filter atau pengelompokan (opsional)
  const categories = Array.from(new Set(locations.map(loc => loc.category))).sort();

  return (
    <MainLayout title="Lokasi Penting">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-java-brown-dark">Lokasi Penting di Pare</h1>
      </div>

      <p className="text-lg text-gray-700 mb-6">
        Temukan berbagai lokasi penting dan fasilitas umum di sekitar Pare.
      </p>

      {loading && <p className="text-center text-gray-600 text-lg">Memuat lokasi...</p>}
      {error && <p className="text-center text-red-500 text-lg">Error: {error}</p>}
      {!loading && !error && locations.length === 0 && (
        <p className="text-center text-gray-600 text-lg">Tidak ada lokasi penting yang ditemukan.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </MainLayout>
  );
};

export default LocationsPage;
