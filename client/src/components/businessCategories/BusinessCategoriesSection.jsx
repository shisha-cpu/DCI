'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from './businessCategories.module.css'

export default function BusinessCategoriesSection({ activeCategory }) {
  const [categories, setCategories] = useState([])

  const allCategories = {
    'Коммерческая недвижимость': [
      { name: 'Торговый центр (здание)' },
      { name: 'Торговое помещение / магазин' },
      { name: 'Рынок / оптовая база' },
      { name: 'Офисный центр (здание)' },
      { name: 'Офисное помещение' },
      { name: 'Складской комплекс' },
      { name: 'Складское помещение' },
      { name: 'Гостиница' },
      { name: 'Хостел' },
      { name: 'Спортивно-оздоровительный комплекс' },
      { name: 'Автосервис' },
      { name: 'Автосалон' },
      { name: 'АЗС' },
      { name: 'Помещение свободного назначения' },
      { name: 'Здание свободного назначения' }
    ],
    'Жилая недвижимость': [
      { name: 'Квартира' },
      { name: 'Комната' },
      { name: 'Частный дом / коттедж' },
      { name: 'Таунхаус' },
      { name: 'Многоквартирный жилой комплекс' }
    ],
    'Земельные участки': [
      { name: 'Земля под ИЖС' },
      { name: 'Земельный участок под коммерческую застройку' }
    ],
    'Производство': [
      { name: 'Деревоперерабатывающее предприятие' },
      { name: 'Металлообрабатывающее предприятие' },
      { name: 'Пищевое производство' },
      { name: 'Производство строительных материалов' },
      { name: 'Текстильное производство' },
      { name: 'Химическое производство' }
    ],
    'Сельхоз активы': [
      { name: 'Птицефабрика' },
      { name: 'Животноводческий комплекс' },
      { name: 'Тепличный комплекс' },
      { name: 'Зерновое хозяйство' },
      { name: 'Элеватор' },
      { name: 'Сад / виноградник' }
    ],
    'Рестораны и развлечения': [
      { name: 'Ресторан/бар/кафе' },
      { name: 'Развлекательный комплекс' }
    ],
    'Спецтехника и транспорт': [
      { name: 'Грузовики и прицепы' },
      { name: 'Строительная техника' },
      { name: 'Сельхоз техника' },
      { name: 'Автобусы' },
      { name: 'Водный транспорт' }
    ],
    'Финансовые активы': [
      { name: 'Ценные бумаги' },
      { name: 'Дебиторская задолженность' },
      { name: 'Нематериальные активы' }
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
            <span className={styles.titleHighlight}>
              Продажа {activeCategory.toLowerCase()}
            </span>
          </h2>
          <p className={styles.subtitle}>Выберите интересующую вас категорию</p>
        </div>

        <div className={styles.categoriesGrid}>
          {categories.map((category, index) => (
            <Link
            href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`} 
              key={index}
              className={styles.categoryCard}
            >
              <div className={styles.categoryContent}>
                <h3 className={styles.categoryName}>{category.name}</h3>
              </div>
              <div className={styles.categoryHover}>
                <span>Смотреть предложения</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
