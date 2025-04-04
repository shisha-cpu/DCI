'use client'

import { useState } from 'react'
import styles from './filter.module.css'

export default function FilterSection() {
  const [activeCategory, setActiveCategory] = useState('Готовый бизнес')
  const [minInvestment, setMinInvestment] = useState('')
  const [maxInvestment, setMaxInvestment] = useState('')

  const categories = [
    'Готовый бизнес',
    'Франшизы',
    'Инвестиции',
    'Недвижимость',
    'Бизнес-идея',
    'Бизнес-планы'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
   
    console.log({ activeCategory, minInvestment, maxInvestment })
  }

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterContent}>
        <h1 className={styles.headerTitle}>
          Альтера Инвест в Санкт-Петербурге - Инвестиции в бизнес для каждого
        </h1>
        
        <div className={styles.categories}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                activeCategory === category ? styles.categoryButtonActive : ''
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className={styles.filterForm}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Инвестиция от</label>
            <input
              type="number"
              placeholder="₽"
              className={styles.filterInput}
              value={minInvestment}
              onChange={(e) => setMinInvestment(e.target.value)}
            />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Инвестиции до</label>
            <input
              type="number"
              placeholder="₽"
              className={styles.filterInput}
              value={maxInvestment}
              onChange={(e) => setMaxInvestment(e.target.value)}
            />
          </div>

          <button type="submit" className={styles.filterButton}>
            Показать результаты
          </button>
        </form>
      </div>
    </div>
  )
}