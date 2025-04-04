'use client'

import { useEffect, useState } from 'react'
import styles from './admin.module.css'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    consultations: 0,
    visits: 0
  })

  useEffect(() => {
    // Здесь будет запрос к API для получения статистики
    const fetchStats = async () => {
      // Пример:
      // const data = await fetch('/api/admin/stats').then(res => res.json())
      setStats({
        users: 1024,
        consultations: 256,
        visits: 5432
      })
    }
    fetchStats()
  }, [])

  return (
    <div className={styles.dashboard}>
      <h2>Общая статистика</h2>
      
      <div className={styles.statsGrid}>
        <StatCard title="Пользователи" value={stats.users} icon="👥" />
        <StatCard title="Консультации" value={stats.consultations} icon="💬" />
        <StatCard title="Посещения" value={stats.visits} icon="👀" />
      </div>

      <RecentActivity />
    </div>
  )
}

function StatCard({ title, value, icon }: { title: string; value: number; icon: string }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{value.toLocaleString()}</p>
    </div>
  )
}

function RecentActivity() {
  const [activities, setActivities] = useState<string[]>([])

  useEffect(() => {
    // Запрос к API для получения последних действий
    setActivities([
      'Новый пользователь: Иван Иванов',
      'Запрос на консультацию #1234',
      'Обновление контента "Инвестиции"'
    ])
  }, [])

  return (
    <div className={styles.recentActivity}>
      <h3>Последние действия</h3>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>
    </div>
  )
}