'use client'

import { useState, useEffect } from 'react'
import styles from '@/app/lk/lk.module.css'

export default function Compare({ user }) {
  const [comparisons, setComparisons] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchComparisons = async () => {
      try {
        // Запрос к API
        // const response = await api.compare.get(user.id)
        setIsLoading(false)
        setComparisons([/* mock data */])
      } catch (error) {
        console.error('Ошибка загрузки сравнений:', error)
        setIsLoading(false)
      }
    }

    fetchComparisons()
  }, [user])

  return (
    <div>
      <h2 className={styles.sectionTitle}>Сравнение</h2>
      
      {isLoading ? (
        <div>Загрузка...</div>
      ) : comparisons.length > 0 ? (
        <div className={styles.compareTable}>
          <table>
            <thead>
              <tr>
                <th>Параметр</th>
                {comparisons.map(item => (
                  <th key={item.id}>{item.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Рендерим строки сравнения */}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>Нет объектов для сравнения</p>
        </div>
      )}
    </div>
  )
}