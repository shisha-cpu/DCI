'use client'

import styles from './in.module.css'

export default function AdminDashboard() {
  return (
    <div className={styles.dashboard}>
      <h2>Статистика</h2>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Пользователи</h3>
          <p>1,024</p>
        </div>
        <div className={styles.statCard}>
          <h3>Консультации</h3>
          <p>256</p>
        </div>
        <div className={styles.statCard}>
          <h3>Посещения</h3>
          <p>5,432</p>
        </div>
      </div>

      <div className={styles.recentActivity}>
        <h3>Последние действия</h3>
        <ul>
          <li>Новый пользователь: Иван Иванов</li>
          <li>Запрос на консультацию #1234</li>
          <li>Обновление контента "Инвестиции"</li>
        </ul>
      </div>
    </div>
  )
}