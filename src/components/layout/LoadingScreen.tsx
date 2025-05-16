"use client";

import { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate minimum loading time for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingContent}>
        <div className={styles.logo}>
          <span className={styles.logoText}>Uzuri</span>
        </div>
        <div className={styles.loadingBar}>
          <div className={styles.loadingBarInner} />
        </div>
      </div>
    </div>
  );
} 