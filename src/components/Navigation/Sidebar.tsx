// src/components/Navigation/Sidebar.tsx

import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

// Import ikon SVG kustom atau gunakan ikon dari library seperti react-icons
// Untuk contoh ini, kita pakai placeholder SVG atau Anda bisa menggantinya dengan ikon asli
const HomeIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);
const CoursesIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 3L1 9l11 6 11-6zm0 11.5l-9-5 9-5 9 5-9 5z" />
  </svg>
); // Icon Topi Wisuda/E-learning
const LocationsIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
); // Icon Peta

const Sidebar: React.FC = () => {
  const router = useRouter();

  const navItems = [
    { name: 'Home', href: '/dashboard', icon: <HomeIcon /> },
    { name: 'Courses', href: '/courses', icon: <CoursesIcon /> },
    { name: 'Locations', href: '/locations', icon: <LocationsIcon /> },
    { name: 'Angkringan', href: '/angkringan', icon: <CoursesIcon /> }, // Contoh ikon sementara
    { name: 'Kos/Homestay', href: '/kos-homestay', icon: <LocationsIcon /> }, // Contoh ikon sementara
  ];

  return (
    <aside className="w-64 bg-java-brown-dark text-java-cream h-screen fixed top-0 left-0 flex flex-col shadow-lg">
      {/* Logo Section */}
      <div className="p-6 flex items-center justify-center border-b border-java-brown-medium">
        {/* Anda bisa menambahkan logo dengan aksen Jawa di sini */}
        <h1 className="text-2xl font-serif text-java-cream">
          Kampung Inggris{' '}
          <span className="block text-sm text-java-green-light">Digital Hub</span>
        </h1>
      </div>

      {/* Navigasi Utama */}
      <nav className="flex-1 px-4 py-6">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link href={item.href} legacyBehavior>
                <a
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200
                    ${router.pathname === item.href
                      ? 'bg-java-green-dark text-java-cream shadow-jawa-soft border-l-4 border-java-gold'
                      : 'hover:bg-java-brown-medium hover:text-white'
                    }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Sidebar (opsional, misal user info atau settings) */}
      <div className="p-4 border-t border-java-brown-medium text-sm text-center text-java-cream opacity-75">
        &copy; {new Date().getFullYear()} Kampung Inggris.
      </div>
    </aside>
  );
};

export default Sidebar;
