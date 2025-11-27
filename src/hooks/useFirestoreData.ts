// src/hooks/useFirestoreData.ts

import { useState, useEffect } from 'react';
import { collection, query, QueryConstraint, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface FirestoreDataHook<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook untuk mengambil data secara real-time dari koleksi Firestore.
 * @param collectionName Nama koleksi yang akan diambil.
 * @param constraints Array of QueryConstraint untuk filter, order, limit.
 * @returns { data, loading, error }
 */
export function useFirestoreData<T>(collectionName: string, constraints: QueryConstraint[] = []): FirestoreDataHook<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const q = query(collection(db, collectionName), ...constraints);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedData: T[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Lakukan konversi Timestamp ke Date jika ada di data Anda
        // Contoh: timestamp: (doc.data().timestamp as any)?.toDate(),
      } as T));
      setData(fetchedData);
      setLoading(false);
    }, (err) => {
      console.error("Firestore data fetch error:", err);
      setError(err.message);
      setLoading(false);
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, [collectionName, JSON.stringify(constraints)]); // Stringify constraints untuk dependency array

  return { data, loading, error };
}
