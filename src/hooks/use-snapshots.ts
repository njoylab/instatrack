"use client";

import type { Snapshot } from '@/lib/types';
import { useState, useEffect, useCallback } from 'react';

const SNAPSHOTS_KEY = 'instaTrackSnapshots';

export function useSnapshots() {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(SNAPSHOTS_KEY);
      if (item) {
        setSnapshots(JSON.parse(item));
      }
    } catch (error) {
      console.error("Failed to load snapshots from localStorage", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveSnapshotsToLocalStorage = (snapshotsToSave: Snapshot[]) => {
    try {
      window.localStorage.setItem(SNAPSHOTS_KEY, JSON.stringify(snapshotsToSave));
    } catch (error) {
      console.error("Failed to save snapshots to localStorage", error);
    }
  };

  const addSnapshot = useCallback((newSnapshot: Snapshot) => {
    const updatedSnapshots = [...snapshots, newSnapshot].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setSnapshots(updatedSnapshots);
    saveSnapshotsToLocalStorage(updatedSnapshots);
  }, [snapshots]);

  const clearSnapshots = useCallback(() => {
    setSnapshots([]);
    try {
      window.localStorage.removeItem(SNAPSHOTS_KEY);
    } catch (error) {
      console.error("Failed to clear snapshots from localStorage", error);
    }
  }, []);

  const restoreSnapshots = useCallback((snapshotsToRestore: Snapshot[]) => {
    const sortedSnapshots = snapshotsToRestore.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setSnapshots(sortedSnapshots);
    saveSnapshotsToLocalStorage(sortedSnapshots);
  }, []);


  return { snapshots, addSnapshot, clearSnapshots, isLoaded, restoreSnapshots };
}
