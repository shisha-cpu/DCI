'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import AdminDashboard from '@/components/admin/Dashboard/Dashboard'
import AdminUsers from '@/components/admin/Users/Users'
// import AdminContent from './components/Content'
// import AdminSettings from './components/Settings'
import styles from './adminLayout.module.css'

type AdminSection = 'dashboard' | 'users' | 'content' | 'settings'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard')
  const [isPanelOpen, setIsPanelOpen] = useState(true)
//   const user = useSelector(state => state.user)

//   if (!user || user.role !== 'admin') {
//     return (
//       <div className={styles.unauthorized}>
//         <h1>Доступ запрещен</h1>
//         <p>У вас нет прав доступа к этой странице</p>
//       </div>
//     )
//   }

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard': return <AdminDashboard />
      case 'users': return <AdminUsers />
    //   case 'content': return <AdminContent />
    //   case 'settings': return <AdminSettings />
      default: return <AdminDashboard />
    }
  }

  return (
    <div className={styles.adminContainer}>
      <header className={styles.adminHeader}>
        <button 
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          className={styles.togglePanel}
        >
          {isPanelOpen ? '◄ Скрыть' : '► Панель'}
        </button>
        <h1>Админ панель GreenInvest</h1>
      </header>

      <div className={styles.adminContent}>
        <aside className={`${styles.adminPanel} ${isPanelOpen ? styles.open : ''}`}>
          <nav>
            <button 
              onClick={() => setActiveSection('dashboard')}
              className={`${styles.navButton} ${activeSection === 'dashboard' ? styles.active : ''}`}
            >
              Дашборд
            </button>
            <button 
              onClick={() => setActiveSection('users')}
              className={`${styles.navButton} ${activeSection === 'users' ? styles.active : ''}`}
            >
              Пользователи
            </button>
            <button 
              onClick={() => setActiveSection('content')}
              className={`${styles.navButton} ${activeSection === 'content' ? styles.active : ''}`}
            >
              Контент
            </button>
            <button 
              onClick={() => setActiveSection('settings')}
              className={`${styles.navButton} ${activeSection === 'settings' ? styles.active : ''}`}
            >
              Настройки
            </button>
          </nav>
        </aside>

        <main className={styles.adminMain}>
          {renderSection()}
        </main>
      </div>
    </div>
  )
}