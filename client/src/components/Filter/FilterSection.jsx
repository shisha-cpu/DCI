'use client'

import { useState } from 'react'
import styles from './filter.module.css'

export default function FilterSection({ onCategoryChange }) {
  const [activeCategory, setActiveCategory] = useState('Готовый бизнес')
  const [minInvestment, setMinInvestment] = useState('')
  const [maxInvestment, setMaxInvestment] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const categories = [
    'Готовый бизнес',
    'Франшизы',
    'Инвестиции',
    'Недвижимость',
    'Бизнес-идея',
    'Бизнес-планы'
  ]

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    onCategoryChange(category)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ activeCategory, minInvestment, maxInvestment })
  }

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterContent}>
        <div className={styles.headerWrapper}>
          <h1 className={styles.headerTitle}>
            <span className={styles.titleGradient}>GreenInvest</span> | Работаем по всей России
          </h1>
          <p className={styles.headerSubtitle}>Инвестиции в бизнес для каждого</p>
        </div>
        
        <div className={styles.categories}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                activeCategory === category ? styles.categoryButtonActive : ''
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
              <span className={styles.buttonHoverEffect}></span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className={styles.filterForm}>
          <div className={styles.inputsContainer}>
            <div 
              className={`${styles.filterGroup} ${isFocused ? styles.focused : ''}`}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            >
              <label className={styles.filterLabel}>Инвестиция от</label>
              <div className={styles.inputWrapper}>
                <input
                  type="number"
                  placeholder="100 000"
                  className={styles.filterInput}
                  value={minInvestment}
                  onChange={(e) => setMinInvestment(e.target.value)}
                />
                <span className={styles.currency}>₽</span>
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Инвестиции до</label>
              <div className={styles.inputWrapper}>
                <input
                  type="number"
                  placeholder="10 000 000"
                  className={styles.filterInput}
                  value={maxInvestment}
                  onChange={(e) => setMaxInvestment(e.target.value)}
                />
                <span className={styles.currency}>₽</span>
              </div>
            </div>
          </div>

          <button type="submit" className={styles.filterButton}>
            Показать результаты
            <span className={styles.buttonArrow}>&rarr;</span>
          </button>
        </form>
      </div>
    </div>
  )
}