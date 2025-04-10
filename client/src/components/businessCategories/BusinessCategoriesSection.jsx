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
    'Готовый арендный бизнес (ГАБ)': [
      { name: 'Продажа готового бизнеса' },
      { name: 'Торгово-развлекательные центры' },
      { name: 'Торговые центры' },
      { name: 'Рынки | оптовые базы' },
      { name: 'Складские комплексы' },
      { name: 'Складские помещения' },
      { name: 'Офисные центры (здания)' },
      { name: 'Офисные помещения' },
      { name: 'Коммерческая зарубежная недвижимость' },
      { name: 'Торговые площади' },
      { name: 'Гостиничный бизнес' },
      { name: 'Отели | апартаменты | хостелы' },
      { name: 'Базы отдыха' },
      { name: 'Рестораны | бары | кофе' },
      { name: 'Сфера красоты' },
      { name: 'Бизнес в сфере услуг' },
      { name: 'Арендный бизнес' },
      { name: 'Готовый бизнес под ключ' },
      { name: 'Медицинские центры' },
      { name: 'Учреждения для детей' },
      { name: 'Помещения свободного назначения' },
      { name: 'Здания свободного назначения' },
      { name: 'Автосалоны | автосервисы' },
      { name: 'Автозаправки (АЗС)' },
      { name: 'Прочее' }
    ],
    'Жилая недвижимость': [
      { name: 'Квартиры в элитных ЖК' },
      { name: 'Квартиры в новостройках' },
      { name: 'Квартиры вторичка' },
      { name: 'Жилые помещения' },
      { name: 'Апартаменты' },
      { name: 'Таунхаусы' },
      { name: 'Коттеджи' },
      { name: 'Загородные дома' },
      { name: 'Элитные особняки' },
      { name: 'Элитная зарубежная недвижимость' },
      { name: 'Многоквартирные жилые комплексы' },
      { name: 'Прочее' }
    ],
    'Земельные участки': [
      { name: 'Земля под ИЖС' },
      { name: 'Земля ЛПХ' },
      { name: 'Земля под коммерческую застройку' },
      { name: 'Промышленная земля' },
      { name: 'Земля сельскохозяйственного назначения' },
      { name: 'Земля для ведения садоводства или огородничества' },
      { name: 'Прочее' }
    ],
    'Производство': [
      { name: 'Деревообрабатывающие предприятия' },
      { name: 'Металлообрабатывающие предприятия' },
      { name: 'Производство строительных материалов' },
      { name: 'Текстильное производство' },
      { name: 'Пищевое производство' },
      { name: 'Химическое производство' },
      { name: 'Заводы' },
      { name: 'Фабрики' },
      { name: 'Прочее' }
    ],
    'Агро бизнес': [
      { name: 'Птицефабрика' },
      { name: 'Животноводческий комплекс' },
      { name: 'Тепличный комплекс' },
      { name: 'Зерновое хозяйство' },
      { name: 'Элеватор' },
      { name: 'Маслозаводы' },
      { name: 'Молокозаводы' },
      { name: 'Сады | виноградники' },
      { name: 'Прочее' }
    ],
    'Банковские услуги': [
      { name: 'Кредиты для бизнеса' },
      { name: 'Кредиты под залог' },
      { name: 'Кредит наличными' },
      { name: 'Ипотечные программы' },
      { name: 'Лизинг для юридических лиц' },
      { name: 'Банковские гарантии' },
      { name: 'Рефинансирование кредита' },
      { name: 'Автокредиты' },
      { name: 'Проектное финансирование' },
      { name: 'Факторинг' },
      { name: 'Прочее' }
    ],
    'Сферы услуг': [
      { name: 'Строительство и ремонт' },
      { name: 'Бухгалтерские услуги' },
      { name: 'Привлечение инвестиций' },
      { name: 'Юридическое сопровождение сделок' },
      { name: 'Списание долгов для юридических лиц' },
      { name: 'Списание долгов для физических лиц' },
      { name: 'Исправление кредитной истории' },
      { name: 'Проверка кредитной истории' },
      { name: 'Оценка имущества' },
      { name: 'Проверка юридических лиц и предпринимателей' },
      { name: 'Узнать кадастровый номер' },
      { name: 'Проверка объектов недвижимости на залоги и обременения' },
      { name: 'Комплектация объектов и гостиничных номеров' },
      { name: 'Прочее' }
    ],
    'Инвестиции': [
      { name: 'Управление крупным и частным капиталом' },
      { name: 'Инвестиции' }
    ],
    'Для состоятельных клиентов': [
      { name: 'Аренда бизнес Джетов' },
      { name: 'Аренда вертолетов' },
      { name: 'Аренда яхт' },
      { name: 'Прочее' }
    ],
    'Реабилитация компаний': [
      { name: 'Разблокировка 115 ФЗ' },
      { name: 'Профилактика блокировок по 115 ФЗ' },
      { name: 'Анализ бизнеса + абонентское обслуживание' },
      { name: 'Проверка контрагентов для исключения из цепочки' },
      { name: 'Рекомендации по налоговому сектору' },
      { name: 'Прочее' }
    ]
  };
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
        {/* <div className={styles.header}>
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
        )} */}
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