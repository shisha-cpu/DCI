'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import styles from './lk.module.css'
import AuthForm from '../../components/lk/AuthForm/AuthForm'
import MyObjects from '../../components/lk/MyObjects/MyObjects'
import Favorites from '../../components/lk/Favorites/Favorites'
import Compare from '../../components/lk/Compare/Compare'
import Notifications from '../../components/lk/Notifications/Notifications'
import Profile from '../../components/lk/Profile/Profile'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/slices/userSlice'

export default function LKPage() {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('objects')
  const pathname = usePathname()

  const handleLogout = () => {
    dispatch(logout())
    router.push('/') // Перенаправляем на главную после выхода
  }

  const renderContent = () => {
    if (!user) {
      return <AuthForm />
    }

    switch (activeTab) {
      case 'objects': return <MyObjects user={user} />
      case 'favorites': return <Favorites user={user} />
      case 'compare': return <Compare user={user} />
      case 'notifications': return <Notifications user={user} />
      case 'profile': return <Profile user={user} />
      default: return <MyObjects user={user} />
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Личный кабинет</h3>
        
        {user ? (
          <>
            <button
              className={`${styles.sidebarLink} ${activeTab === 'objects' ? styles.sidebarLinkActive : ''}`}
              onClick={() => setActiveTab('objects')}
            >
              Мои объекты
            </button>
            
            <button
              className={`${styles.sidebarLink} ${activeTab === 'favorites' ? styles.sidebarLinkActive : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              Избранное
            </button>
            
            <button
              className={`${styles.sidebarLink} ${activeTab === 'compare' ? styles.sidebarLinkActive : ''}`}
              onClick={() => setActiveTab('compare')}
            >
              Сравнение
            </button>
            
            <button
              className={`${styles.sidebarLink} ${activeTab === 'notifications' ? styles.sidebarLinkActive : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              Уведомления
            </button>
            
            <button
              className={`${styles.sidebarLink} ${activeTab === 'profile' ? styles.sidebarLinkActive : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Мой профиль
            </button>
            <button
                className={styles.logoutButton}
                onClick={handleLogout}
              >
                Выйти
              </button>

        
  
          </>
        ) : (
          <button
            className={`${styles.sidebarLink} ${styles.sidebarLinkActive}`}
          >
            Авторизация
          </button>
        )}
      </div>
      
      <div className={styles.content}>
        {renderContent()}
      </div>
    </div>
  )
}