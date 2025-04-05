'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState('objects')

  // Получаем параметр tab из URL при загрузке
  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab && ['objects', 'favorites', 'compare', 'notifications', 'profile'].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const handleLogout = () => {
    dispatch(logout())
    router.push('/')
  }

  // Функция для изменения активного таба
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    // Обновляем URL без перезагрузки страницы
    router.push(`/lk?tab=${tab}`, { scroll: false })
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
              onClick={() => handleTabChange('objects')}
            >
              Мои объекты
            </button>
            
            <button
              className={`${styles.sidebarLink} ${activeTab === 'favorites' ? styles.sidebarLinkActive : ''}`}
              onClick={() => handleTabChange('favorites')}
            >
              Избранное
            </button>
            
            <button
              className={`${styles.sidebarLink} ${activeTab === 'compare' ? styles.sidebarLinkActive : ''}`}
              onClick={() => handleTabChange('compare')}
            >
              Сравнение
            </button>
            
            <button
              className={`${styles.sidebarLink} ${activeTab === 'notifications' ? styles.sidebarLinkActive : ''}`}
              onClick={() => handleTabChange('notifications')}
            >
              Уведомления
            </button>
            
            <button
              className={`${styles.sidebarLink} ${activeTab === 'profile' ? styles.sidebarLinkActive : ''}`}
              onClick={() => handleTabChange('profile')}
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