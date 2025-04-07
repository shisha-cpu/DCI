'use client'

import Link from 'next/link'
import { useState, useEffect, useMemo } from 'react'
import styles from './businessCategories.module.css'
import { FiSearch, FiX } from 'react-icons/fi'
export default function BusinessCategoriesSection({ activeCategory }) {
  const [categories, setCategories] = useState([])
  const [isMobile, setIsMobile] = useState(false)
  const [visibleCategories, setVisibleCategories] = useState(12)
  const [searchQuery, setSearchQuery] = useState('')

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
    
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [activeCategory])

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories
    return categories.filter(category => 
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [categories, searchQuery])

  const handleShowMore = () => {
    setVisibleCategories(prev => prev + 12)
  }

  const clearSearch = () => {
    setSearchQuery('')
  }
 
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
          
          <div className={styles.searchContainer}>
            <div className={styles.searchInputWrapper}>
              <FiSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Поиск по категориям..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={clearSearch} className={styles.clearButton}>
                  <FiX />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className={styles.categoriesWrapper}>
          {filteredCategories.length > 0 ? (
            <div className={styles.categoriesColumns}>
              {filteredCategories.slice(0, visibleCategories).map((category, index) => (
                <Link
                  href={{
                    pathname: `/category/${activeCategory.toLowerCase().replace(/\s+/g, '-')}`,
                    query: { 
                      subcategory: category.name.toLowerCase().replace(/\s+/g, '-')
                    }
                  }}
                  key={index}
                  className={styles.categoryLink}
                >
                  {highlightMatch(category.name, searchQuery)}
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              Ничего не найдено. Попробуйте изменить запрос.
            </div>
          )}
        </div>

        {visibleCategories < filteredCategories.length && (
          <div className={styles.showMoreContainer}>
            <button 
              onClick={handleShowMore}
              className={styles.showMoreButton}
            >
              Показать ещё
            </button>
          </div>
        )}
        <div className={styles.sellBusiness}>
          <div className={styles.sellContent}>
            <h3 className={styles.sellTitle}>Продать бизнес</h3>
            <p className={styles.sellDescription}>Профессиональное сопровождение сделки</p>
          </div>
          <Link href="/lk" className={styles.sellButton}>
            Начать продажу
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={styles.arrowIcon}>
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

function highlightMatch(text, query) {
  if (!query) return text
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'))
  return parts.map((part, i) => 
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={i} className={styles.highlight}>
        {part}
      </span>
    ) : (
      part
    )
  )
}