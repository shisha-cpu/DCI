'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from './businessCategories.module.css'

export default function BusinessCategoriesSection({ activeCategory }) {
  const [categories, setCategories] = useState([])

  const allCategories = {
    'Готовый бизнес': [
      { name: 'Ресторанный бизнес', count: 320 },
      { name: 'Магазины и торговля', count: 192 },
      { name: 'Гостиничный бизнес', count: 181 },
      { name: 'Сфера красоты', count: 164 },
      { name: 'Производство', count: 123 },
      { name: 'Интернет магазины', count: 99 }
    ],
    'Франшизы': [
      { name: 'Франшизы ресторанов', count: 120 },
      { name: 'Франшизы магазинов', count: 95 },
      { name: 'Франшизы услуг', count: 78 },
      { name: 'Производственные франшизы', count: 45 }
    ],
    'Инвестиции': [
      { name: 'Стартапы', count: 65 },
      { name: 'Недвижимость', count: 89 },
      { name: 'Акции компаний', count: 42 }
    ],
    'Недвижимость': [
      { name: 'Коммерческая недвижимость', count: 156 },
      { name: 'Жилая недвижимость', count: 231 },
      { name: 'Земельные участки', count: 87 }
    ],
    'Бизнес-идея': [
      { name: 'Инновационные идеи', count: 34 },
      { name: 'Проверенные модели', count: 56 }
    ],
    'Бизнес-планы': [
      { name: 'Готовые бизнес-планы', count: 42 },
      { name: 'Индивидуальные разработки', count: 28 }
    ]
  }

  useEffect(() => {
    setCategories(allCategories[activeCategory] || [])
  }, [activeCategory])

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.titleHighlight}>Продажа {activeCategory.toLowerCase()}</span> 
          </h2>
          <p className={styles.subtitle}>Выберите интересующую вас категорию</p>
        </div>

        <div className={styles.categoriesGrid}>
          {categories.map((category, index) => (
            <Link 
              href={`/listings?category=${encodeURIComponent(category.name)}`} 
              key={index} 
              className={styles.categoryCard}
            >
              <div className={styles.categoryContent}>
                <h3 className={styles.categoryName}>{category.name}</h3>
                {/* <div className={styles.categoryCount}>{category.count}+</div> */}
              </div>
              <div className={styles.categoryHover}>
                <span>Смотреть предложения</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.sellBusiness}>
          <div className={styles.sellContent}>
            <h3 className={styles.sellTitle}>Продать бизнес</h3>
            <p className={styles.sellDescription}>Профессиональное сопровождение сделки</p>
          </div>
          <Link href="/lk" className={styles.sellButton}>
            Начать продажу
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}