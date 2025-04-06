'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './header.module.css'
import { useSelector } from 'react-redux'
import { useState } from 'react'
// import Navbar from '../Navbar/Navbar'
export default function Header() {
  const pathname = usePathname()

  const user = useSelector(state => state.user.user)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Функция для формирования URL с параметром таба
  const getLkUrl = (tab) => {
    return `/lk?tab=${tab}`
  }
  
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          DCI CLUB
        </Link>

        <nav className={styles.nav}>
          {/* Контакты - остается без изменений */}
          <Link href="/contacts" className={styles.navLink}>
            <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Контакты
          </Link>
          
          {/* Задать вопрос - остается без изменений */}
          <button 
            onClick={() => setIsModalOpen(true)} 
            className={styles.navLink}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Задать вопрос
          </button>
          
          {/* Уведомления - теперь открывает соответствующий раздел ЛК */}
          <Link href={getLkUrl('notifications')} className={styles.navLink}>
            <div className="relative">
              <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              
            </div>
            Уведомления
          </Link>
          
          {/* Избранное - теперь открывает соответствующий раздел ЛК */}
          <Link href={getLkUrl('favorites')} className={styles.navLink}>
            <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Избранное
          </Link>
          
          {/* Сравнения - теперь открывает соответствующий раздел ЛК */}
          <Link href={getLkUrl('compare')} className={styles.navLink}>
            <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Сравнения
          </Link>
          
          {/* Личный кабинет - теперь открывает профиль в ЛК */}
          <Link href={getLkUrl('profile')} className={styles.authButton}>
            <svg className={styles.icon} stroke="white" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {user && user.name ? user.name : 'Вход'}
          </Link>
        </nav>
        <div className={styles.container}>
      <button className={styles.button}>Оставить заявку</button>
    </div>
        {/* Модальное окно остается без изменений */}
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h2>Записаться на консультацию</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className={styles.closeButton}
                >
                  &times;
                </button>
              </div>
              <div className={styles.modalBody}>
                <form>
                  <div className={styles.formGroup}>
                    <label>Укажите Имя (обязательно)</label>
                    <input type="text" placeholder="Имя" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Укажите Телефон (обязательно)</label>
                    <input type="tel" placeholder="+7 (999) 999-99-99" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Укажите E-mail</label>
                    <input type="email" placeholder="example@email.com" />
                  </div>
                  <div className={styles.checkboxGroup}>
                    <input type="checkbox" id="agree" required />
                    <label htmlFor="agree">Согласен на обработку персональных данных</label>
                  </div>
                  <button type="submit" className={styles.submitButton}>
                    Отправить заявку
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

    </header>
  )
}