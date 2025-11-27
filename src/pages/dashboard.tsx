// src/pages/dashboard.tsx

import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import ProgressCard from '@/components/Dashboard/ProgressCard';
import TaskCard from '@/components/Dashboard/TaskCard';
import AngkringanWidget from '@/components/Dashboard/AngkringanWidget';

// Dummy data untuk contoh
const dummyCourses = [
  { courseTitle: 'English Conversation', progress: 75, lastActivity: 'Last lesson: Introductions' },
  { courseTitle: 'English Conversation Masterclass', progress: 40, lastActivity: 'Last lesson: Modals' },
  { courseTitle: 'Grammar Boost Program', progress: 40, lastActivity: 'Last lesson: Tenses Overview' },
];

const dummyAngkringanMessages = [
  { author: 'Bambang', content: 'Ada yang tau tempat fotokopi murah?' },
  { author: 'Siti', content: 'Di dkt pos polisi, Mas!' },
  { author: 'Udin', content: 'Gabung no grup WA Angkringan yuk!' },
];

const DashboardPage: React.FC = () => {
  return (
    <MainLayout title="Dashboard Pelajar">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-java-brown-dark">Dashboard Pelajar</h1>
        {/* Placeholder untuk notifikasi atau profil user di pojok kanan atas */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Bagian Progress Belajarmu */}
        <div className="md:col-span-2 flex flex-col space-y-6">
          <h2 className="text-2xl font-semibold text-java-brown-dark mb-2">
            Progress Belajarmu{' '}
            {/* Ikon aksen Jawa di sebelah judul */}
            <span role="img" aria-label="Jawa ornament" className="inline-block align-middle ml-2 text-java-brown-medium opacity-70">
              &#10022; {/* Contoh karakter unicode yang menyerupai ornamen, bisa diganti SVG */}
            </span>
          </h2>
          {dummyCourses.map((course, index) => (
            <ProgressCard key={index} {...course} />
          ))}
        </div>

        {/* Bagian Tugas Harian & Angkringan */}
        <div className="md:col-span-1 flex flex-col space-y-6">
          <TaskCard
            title="Tugas Harian"
            description="Kerjakan Latihan Kosakata Bab 5 hari ini untuk mengasah kemampuanmu."
            onClick={() => alert('Buka halaman tugas!')}
          />
          <AngkringanWidget
            messages={dummyAngkringanMessages}
            onClick={() => alert('Buka halaman Angkringan Digital!')}
          />
        </div>
      </div>
    </MainLayout>
  );
};

// Next.js convention for layout in pages directory if not using _app.tsx
// DashboardPage.getLayout = (page) => <MainLayout>{page}</MainLayout>; // Ini jika Anda ingin layout per halaman

export default DashboardPage;
