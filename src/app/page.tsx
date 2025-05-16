'use client';

import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <div className={styles.buttonGrid}>
        <button 
          className={`${styles.dashboardButton} ${styles.registerButton}`}
          onClick={() => router.push('/tenants/register')}
        >
          <span>Register New Tenant</span>
        </button>
        <button 
          className={`${styles.dashboardButton} ${styles.roomsButton}`}
          onClick={() => router.push('/rooms')}
        >
          <span>Manage Rooms</span>
        </button>
        <button 
          className={`${styles.dashboardButton} ${styles.tenantsButton}`}
          onClick={() => router.push('/tenants')}
        >
          <span>View Tenants</span>
        </button>
      </div>
    </div>
  );
}
