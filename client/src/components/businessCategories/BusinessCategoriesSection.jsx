'use client'

import Link from 'next/link'
import styles from './businessCategories.module.css'

export default function BusinessCategoriesSection() {
  const categories = [
    { name: 'Ресторанный бизнес', count: 320 },
    { name: 'Магазины и торговля', count: 192 },
    { name: 'Гостиничный бизнес', count: 181 },
    { name: 'Сфера красоты', count: 164 },
    { name: 'Производство', count: 123 },
    { name: 'Интернет магазины', count: 99 },
    { name: 'Детские центры и сады', count: '...' },
    { name: 'Бизнес в сфере услуг', count: 71 },
    { name: 'Арендный бизнес', count: 54 },
    { name: 'Прочее', count: 51 },
    { name: 'Медицинские центры', count: 45 },
    { name: 'Автобизнес', count: 32 }
  ]

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Продажа готового бизнеса в Санкт-Петербурге</h2>

        <div className={styles.categoriesGrid}>
          {categories.map((category, index) => (
            <div key={index} className={styles.categoryCard}>
              <div className={styles.categoryName}>{category.name}</div>
              <div className={styles.categoryCount}>({category.count})</div>
            </div>
          ))}
        </div>

        <div className={styles.investmentCard}>
          <h3 className={styles.investmentTitle}>
            Инвестиции в международную компанию полного цикла VIVA PHARMAGROUP с доходностью
          </h3>
          <div className={styles.investmentReturn}>
            <span>от 34% до 38% годовых</span>
          </div>
          <Link href="/investments/viva-pharmagroup" className={styles.investmentButton}>
            Подробнее
          </Link>
        </div>

        <div className={styles.sellBusiness}>
          <div>
            <h3 className={styles.sellTitle}>Продать бизнес</h3>
            <p className={styles.sellDescription}>Сопровождение сделки</p>
          </div>
          <Link href="/sell-business" className={styles.sellButton}>
            Начать продажу
          </Link>
        </div>
      </div>
    </section>
  )
}