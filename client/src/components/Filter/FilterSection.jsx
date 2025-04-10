'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './filter.module.css'

export default function FilterSection({ onCategoryChange }) {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState('Готовый арендный бизнес (ГАБ)')
  const [minInvestment, setMinInvestment] = useState('')
  const [maxInvestment, setMaxInvestment] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const categories = [
    'Готовый арендный бизнес (ГАБ)',
    'Жилая недвижимость',
    'Земельные участки',
    'Производство',
    'Агро бизнес',
    'Банковские услуги',
    'Сферы услуг',
    'Инвестиции',
    'Для состоятельных клиентов',
    'Реабилитация компаний'
  ];

  // Map categories to background image URLs
  const categoryBackgrounds = {
    'Готовый арендный бизнес (ГАБ)': './filter/1.jpg',
    'Жилая недвижимость': './filter/2.jpg',
    'Земельные участки': './filter/3.jpg',
    'Агро бизнес': './filter/4.jpg',
    'Производство' : './filter/5.jpg',
    'Банковские услуги':'./filter/6.jpg',
    'Сферы услуг': './filter/7.jpg',
    'Инвестиции': './filter/7.jpg',
    'Для состоятельных клиентов': './filter/9.jpg',
    'Реабилитация компаний': './filter/10.jpg'
  }

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    onCategoryChange(category)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  

    const categorySlug = activeCategory.toLowerCase().replace(/\s+/g, '-')
  
    // Формируем параметры URL
    const queryParams = new URLSearchParams()
    if (minInvestment) {
      queryParams.set('min', minInvestment)
    }
    if (maxInvestment) {
      queryParams.set('max', maxInvestment)
    }
  
    // Перенаправляем на страницу с категорией и параметрами
    router.push(`/category/${categorySlug}?${queryParams.toString()}`)
  }
  
  return (
    <div 
      className={styles.filterContainer}
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(240, 253, 244, 0.9) 100%), url(${categoryBackgrounds[activeCategory]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className={styles.filterContent}>
        <div className={styles.headerWrapper}>
          <h1 className={styles.headerTitle}>
            <span className={styles.titleGradient}>DSI CLUB</span> | Работаем по всей России
          </h1>
          <p className={styles.headerSubtitle}>Инвестиции в бизнес для каждого</p>
        </div>
      
        {/* <div className={styles.categories}>
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
        </form> */}
       
      </div>

    </div>
  )
}