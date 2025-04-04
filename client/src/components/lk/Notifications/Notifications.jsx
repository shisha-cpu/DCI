'use client'

import { useState, useEffect } from 'react'
import styles from '@/app/lk/lk.module.css'

export default function Notifications({ user }) {
  const [notifications, setNotifications] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Запрос к API
        // const response = await api.notifications.get(user.id)
        setIsLoading(false)
        setNotifications([/* mock data */])
      } catch (error) {
        console.error('Ошибка загрузки уведомлений:', error)
        setIsLoading(false)
      }
    }

    fetchNotifications()
  }, [user])

  const markAsRead = (id) => {
    // Логика отметки как прочитанного
  }

  return (
    <div>
      <h2 className={styles.sectionTitle}>Уведомления</h2>
      
      {isLoading ? (
        <div>Загрузка...</div>
      ) : notifications.length > 0 ? (
        <div className={styles.notificationsList}>
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''}`}
            >
              <p>{notification.message}</p>
              <span>{new Date(notification.date).toLocaleString()}</span>
              {!notification.read && (
                <button 
                  onClick={() => markAsRead(notification.id)}
                  className={styles.readButton}
                >
                  Прочитано
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>Новых уведомлений нет</p>
        </div>
      )}
    </div>
  )
}