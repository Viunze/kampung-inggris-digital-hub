// src/components/Dashboard/AngkringanWidget.tsx

import React from 'react';
import Card from '../UI/Card';
import { useFirestoreData } from '@/hooks/useFirestoreData'; // Impor hook
import { ForumPost } from '@/types/models'; // Impor tipe ForumPost
import { limit, orderBy } from 'firebase/firestore'; // Impor QueryConstraint

// Ikon Lonceng/Notifikasi (Anda bisa mengganti dengan SVG kustom)
const BellIcon = () => (
  <svg
    className="w-6 h-6 text-java-gold"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 17h5l-1.405-1.405A2.003 2.003 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    ></path>
  </svg>
);

interface AngkringanWidgetProps {
  onClick?: () => void;
}

const AngkringanWidget: React.FC<AngkringanWidgetProps> = ({ onClick }) => {
  // Gunakan useFirestoreData untuk mengambil 3 postingan forum terbaru
  const { data: messages, loading, error } = useFirestoreData<ForumPost>(
    'forumPosts',
    [orderBy('timestamp', 'desc'), limit(3)]
  );

  return (
    <Card className="flex flex-col space-y-4 bg-java-orange/10 border border-java-orange/30 cursor-pointer hover:bg-java-orange/20" onClick={onClick}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-java-brown-dark">Angkringan Digital</h3>
        <BellIcon />
      </div>
      <div className="space-y-3">
        {loading && <p className="text-gray-500 text-sm">Memuat pesan...</p>}
        {error && <p className="text-red-500 text-sm">Error: {error}</p>}
        {!loading && !error && messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className="bg-white p-3 rounded-lg shadow-sm text-sm border-l-4 border-java-gold">
              <p className="font-semibold text-java-brown-dark">{msg.authorName}:</p>
              <p className="text-gray-700">{msg.content}</p>
            </div>
          ))
        ) : (
          !loading && !error && <p className="text-gray-500 text-sm">Belum ada aktivitas di Angkringan.</p>
        )}
      </div>
    </Card>
  );
};

export default AngkringanWidget;
