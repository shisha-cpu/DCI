'use client'

import Link from 'next/link'
import styles from './app.module.css'
import FilterSection from '../components/Filter/FilterSection'
import BusinessCategoriesSection from '../components/businessCategories/BusinessCategoriesSection'
import Navbar from '../components/Navbar/Navbar'
import { useState } from 'react'

export default function Home() {
  // Данные по категориям
  const categories = {
    'Готовый бизнес': [
      {
        id: 1,
        title: 'Готовый бизнес - кофейня в центре',
        price: 5000000,
        location: { city: 'Москва' },
        images: [{ path: '/placeholder.jpg' }],
        details: 'Годовая прибыль: 1.2 млн руб'
      },
      {
        id: 2,
        title: 'Автомойка с оборудованием',
        price: 3500000,
        location: { city: 'Санкт-Петербург' },
        images: [{ path: '/placeholder.jpg' }],
        details: 'Окупаемость: 1.5 года'
      },
      {
        id: 7,
        title: 'Мини-пекарня',
        price: 2800000,
        location: { city: 'Казань' },
        images: [{ path: '/placeholder.jpg' }],
        details: 'Налаженные поставки'
      }
    ],
    'Франшизы': [
      {
        id: 3,
        title: 'Франшиза пекарни',
        price: 2500000,
        location: { city: 'Новосибирск' },
        images: [{ path: '/placeholder.jpg' }],
        details: 'Роялти: 5%'
      },
      {
        id: 4,
        title: 'Франшиза фитнес-центра',
        price: 6000000,
        location: { city: 'Казань' },
        images: [{ path: '/placeholder.jpg' }],
        details: 'Поддержка на всех этапах'
      },
      {
        id: 8,
        title: 'Франшиза детского центра',
        price: 1800000,
        location: { city: 'Екатеринбург' },
        images: [{ path: '/placeholder.jpg' }],
        details: 'Окупаемость 8 месяцев'
      }
    ],
    'Инвестиции': [
      {
        id: 5,
        title: 'Инвестиции в коммерческую недвижимость',
        price: 10000000,
        location: { city: 'Сочи' },
        images: [{ path: '/placeholder.jpg' }],
        details: 'Доходность 12% годовых'
      },
      {
        id: 6,
        title: 'Долевое участие в строительстве',
        price: 3000000,
        location: { city: 'Краснодар' },
        images: [{ path: '/placeholder.jpg' }],
        details: 'Срок реализации: 2 года'
      },
      {
        id: 9,
        title: 'Инвестиции в стартап',
        price: 1500000,
        location: { city: 'Москва' },
        images: [{ path: '/placeholder.jpg' }],
        details: 'Перспективная ниша'
      }
    ]
  }

  const [activeCategory, setActiveCategory] = useState('Готовый бизнес')

  return (
    <div className={styles.container}>
      <Navbar />
      <FilterSection 
        onCategoryChange={(category) => setActiveCategory(category)} 
      />
      <BusinessCategoriesSection 
        activeCategory={activeCategory} 
      />
      
      {/* Категории объявлений */}
      <div className={styles.categoriesContainer}>
        {Object.entries(categories).map(([category, items]) => (
          <section key={category} className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <h2 className={styles.categoryTitle}>{category}</h2>
              <Link 
                href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`} 
                className={styles.viewAllButton}
              >
                Все объекты {category.toLowerCase()}
              </Link>
            </div>
            
            <div className={styles.listingsGrid}>
              {items.map(item => (
                <div key={item.id} className={styles.listingCard}>
                  <div className={styles.listingImage}>
                    <img 
                      src={item.images[0].path} 
                      alt={item.title}
                      className={styles.image}
                    />
                    <span className={styles.listingBadge}>
                      {category}
                    </span>
                  </div>
                  <div className={styles.listingContent}>
                    <h3 className={styles.listingTitle}>{item.title}</h3>
                    <p className={styles.listingLocation}>{item.location.city}</p>
                    <p className={styles.listingDetails}>{item.details}</p>
                    <div className={styles.listingPrice}>
                      {item.price.toLocaleString()} ₽
                    </div>
                    <Link 
                      href={`/listings/${item.id}`} 
                      className={styles.listingButton}
                    >
                      Подробнее
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Benefits Section */}
      <section className={styles.benefitsSection}>
        <h2 className={styles.benefitsTitle}>Почему выбирают GreenInvest?</h2>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className={styles.benefitTitle}>Безопасность</h3>
            <p>Все объекты проходят тщательную проверку</p>
          </div>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className={styles.benefitTitle}>Выгодные условия</h3>
            <p>Доходность выше рыночной</p>
          </div>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h3 className={styles.benefitTitle}>Диверсификация</h3>
            <p>Широкий выбор объектов для инвестиций</p>
          </div>
        </div>
      </section>
    </div>
  )
}