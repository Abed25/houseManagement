'use client';

import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.dashboardHeader}>
        <h1>Property Management Dashboard</h1>
        <p>Welcome! Manage your tenants, rooms, and registrations with ease.</p>
      </div>
      <div className={styles.buttonGrid}>
        <div className={styles.dashboardCard} onClick={() => router.push('/tenants/register')}>
          <div className={styles.cardIcon}>📝</div>
          <div className={styles.cardTitle}>Register New Tenant</div>
          <div className={styles.cardDesc}>Add a new tenant to your property</div>
        </div>
        <div className={styles.dashboardCard} onClick={() => router.push('/rooms')}>
          <div className={styles.cardIcon}>🏠</div>
          <div className={styles.cardTitle}>Manage Rooms</div>
          <div className={styles.cardDesc}>View, add, or update room details</div>
        </div>
        <div className={styles.dashboardCard} onClick={() => router.push('/tenants')}>
          <div className={styles.cardIcon}>👥</div>
          <div className={styles.cardTitle}>View Tenants</div>
          <div className={styles.cardDesc}>See all tenants and manage their info</div>
        </div>
      </div>
    </div>
  );
}
