'use client'
import { useState } from 'react';
import styles from './AdminPanel.module.css';
import UsersSection from '@/components/admin/UsersSection/UsersSection'
import AdsSection from '@/components/admin/AdsSection/AdsSection'
import RequestsSection from '@/components/admin/RequestsSection/RequestsSection'
type AdminSection = 'users' | 'ads' | 'requests';







export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState<AdminSection>('users');

  const renderSection = () => {
    switch (activeSection) {
      case 'users': return <UsersSection />;
      case 'ads': return <AdsSection />;
      case 'requests': return <RequestsSection />;
      default: return <UsersSection />;
    }
  };

  return (
    <div className={styles.adminContainer}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1 className={styles.sidebarTitle}>Admin Dashboard</h1>
        </div>
        
        <nav>
          <ul className={styles.navList}>
            <li>
              <button
                onClick={() => setActiveSection('users')}
                className={`${styles.navButton} ${styles.users} ${
                  activeSection === 'users' ? styles.navButtonActive : ''
                }`}
              >
                Пользователи
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('ads')}
                className={`${styles.navButton} ${styles.ads} ${
                  activeSection === 'ads' ? styles.navButtonActive : ''
                }`}
              >
                Объявления
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('requests')}
                className={`${styles.navButton} ${styles.requests} ${
                  activeSection === 'requests' ? styles.navButtonActive : ''
                }`}
              >
                Заявки
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <main className={styles.contentArea}>
        {renderSection()}
      </main>
    </div>
  );
}