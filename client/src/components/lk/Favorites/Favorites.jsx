'use client'

import { useState } from 'react'
import styles from './Favorites.module.css'

export default function Favorites({ user }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeStatus, setActiveStatus] = useState('all')
  
  const categories = [
    { id: 'business', label: 'Готовый бизнес' },
    { id: 'realty', label: 'Недвижимость' },
    { id: 'franchises', label: 'Франшизы' },
    { id: 'investments', label: 'Инвестиции' },
    { id: 'ideas', label: 'Бизнес-идеи' },
    { id: 'plans', label: 'Бизнес-планы' },
    { id: 'articles', label: 'Статьи' }
  ]

  const statuses = [
    { id: 'all', label: 'Все' },
    { id: 'for_sale', label: 'В продаже' },
    { id: 'not_for_sale', label: 'Не в продаже' }
  ]

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Избранное</h1>
      
      <div className={styles.categories}>
        {categories.map(category => (
          <button
            key={category.id}
            className={`${styles.categoryButton} ${activeCategory === category.id ? styles.active : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className={styles.statusFilters}>
        {statuses.map(status => (
          <button
            key={status.id}
            className={`${styles.statusButton} ${activeStatus === status.id ? styles.active : ''}`}
            onClick={() => setActiveStatus(status.id)}
          >
            {status.label}
          </button>
        ))}
      </div>

      <div className={styles.emptyState}>
        <div className={styles.emptyIllustration}>
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z" fill="#4CAF50" fillOpacity="0.2" stroke="#4CAF50" strokeWidth="1.5"/>
            <path d="M16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8Z" fill="#4CAF50" fillOpacity="0.2" stroke="#4CAF50" strokeWidth="1.5"/>
          </svg>
        </div>
        <p className={styles.emptyText}>У вас пока нет того что можно здесь отобразить</p>
      </div>
    </div>
  )
}