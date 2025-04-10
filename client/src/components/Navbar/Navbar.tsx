'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './Navbar.module.css'

export default function Navbar() {
  const router = useRouter()
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Готовый арендный бизнес (ГАБ)')
  const [minInvestment, setMinInvestment] = useState('')
  const [maxInvestment, setMaxInvestment] = useState('')
  const menuItemRefs = useRef<{[key: string]: HTMLDivElement | null}>({})
  const submenuRefs = useRef<{[key: string]: HTMLDivElement | null}>({})
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const categories = {
    'Готовый арендный бизнес (ГАБ)': [
      'Продажа готового бизнеса',
      'Торгово-развлекательные центры',
      'Торговые центры',
      'Рынки | оптовые базы',
      'Складские комплексы',
      'Складские помещения',
      'Офисные центры (здания)',
      'Офисные помещения',
      'Коммерческая зарубежная недвижимость',
      'Торговые площади',
      'Гостиничный бизнес',
      'Отели | апартаменты | хостелы',
      'Базы отдыха',
      'Рестораны | бары | кофе',
      'Сфера красоты',
      'Бизнес в сфере услуг',
      'Арендный бизнес',
      'Готовый бизнес под ключ',
      'Медицинские центры',
      'Учреждения для детей',
      'Помещения свободного назначения',
      'Здания свободного назначения',
      'Автосалоны | автосервисы',
      'Автозаправки (АЗС)',
      'Прочее'
    ],
    'Жилая недвижимость': [
      'Квартиры в элитных ЖК',
      'Квартиры в новостройках',
      'Квартиры вторичка',
      'Жилые помещения',
      'Апартаменты',
      'Таунхаусы',
      'Коттеджи',
      'Загородные дома',
      'Элитные особняки',
      'Элитная зарубежная недвижимость',
      'Многоквартирные жилые комплексы',
      'Прочее'
    ],
    'Земельные участки': [
      'Земля под ИЖС',
      'Земля ЛПХ',
      'Земля под коммерческую застройку',
      'Промышленная земля',
      'Земля сельскохозяйственного назначения',
      'Земля для ведения садоводства или огородничества',
      'Прочее'
    ],
    'Производство': [
      'Деревообрабатывающие предприятия',
      'Металлообрабатывающие предприятия',
      'Производство строительных материалов',
      'Текстильное производство',
      'Пищевое производство',
      'Химическое производство',
      'Заводы',
      'Фабрики',
      'Прочее'
    ],
    'Агро бизнес': [
      'Птицефабрика',
      'Животноводческий комплекс',
      'Тепличный комплекс',
      'Зерновое хозяйство',
      'Элеватор',
      'Маслозаводы',
      'Молокозаводы',
      'Сады | виноградники',
      'Прочее'
    ],
    'Банковские услуги': [
      'Кредиты для бизнеса',
      'Кредиты под залог',
      'Кредит наличными',
      'Ипотечные программы',
      'Лизинг для юридических лиц',
      'Банковские гарантии',
      'Рефинансирование кредита',
      'Автокредиты',
      'Проектное финансирование',
      'РКО для бизнеса',
      'Зарплатные проекты',
      'Комплекс проверок вашей КИ',
      'Исправление кредитной истории',
      'Оценка имущества',
      'Прочее'
    ],
    'Сферы услуг': [
      'Строительство и ремонт',
      'Бухгалтерские услуги',
      'Привлечение инвестиций',
      'Юридическое сопровождение сделок',
      'Списание долгов для юридических лиц',
      'Списание долгов для физических лиц',
      'Исправление кредитной истории',
      'Проверка кредитной истории',
      'Оценка имущества',
      'Проверка юридических лиц',
      'Проверка объектов недвижимости на залоги и обременения',
      'Комплектация объектов и гостиничных номеров',
      'Прочее'
    ],
    'Инвестиции': [
      'Управление крупным и частным капиталом',
      'Инвестиции'
    ],
    'Для состоятельных клиентов': [
      'Аренда бизнес Джетов',
      'Аренда вертолетов',
      'Аренда яхт',
      'Прочее'
    ],
    'Реабилитация компаний': [
      'Разблокировка 115 ФЗ',
      'Профилактика блокировок по 115 ФЗ',
      'Анализ бизнеса + абонентское обслуживание',
      'Проверка контрагентов для исключения из цепочки',
      'Рекомендации по налоговому сектору',
      'Прочее'
    ]
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const categoryList = Object.keys(categories)

  const formatSlug = (text: string) =>
    encodeURIComponent(text.toLowerCase().replace(/\s+/g, '-'))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const categorySlug = activeCategory.toLowerCase().replace(/\s+/g, '-')
    const queryParams = new URLSearchParams()
    
    if (minInvestment) queryParams.set('min', minInvestment)
    if (maxInvestment) queryParams.set('max', maxInvestment)
    
    router.push(`/category/${categorySlug}?${queryParams.toString()}`)
  }

  const calculateSubmenuPosition = (category: string) => {
    const menuItem = menuItemRefs.current[category]
    const submenu = submenuRefs.current[category]
    if (!menuItem || !submenu) return {}

    const itemRect = menuItem.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const submenuWidth = Math.min(600, viewportWidth * 0.9)
    
    // Рассчитываем оптимальную позицию
    let left = itemRect.left + itemRect.width / 2 - submenuWidth / 2
    let right: number | undefined = undefined
    
    // Проверяем выход за правую границу
    if (left + submenuWidth > viewportWidth) {
      left = viewportWidth - submenuWidth - 10
      right = 10
    }
    
    // Проверяем выход за левую границу
    if (left < 10) {
      left = 10
      right = viewportWidth - submenuWidth - 10
    }
    
    // Для мобильных устройств делаем полноразмерное меню
    if (viewportWidth < 1024) {
      return {
        left: '10px',
        right: '10px',
        width: 'calc(100vw - 20px)',
        minWidth: 'auto'
      }
    }

    return {
      left: `${left}px`,
      right: right !== undefined ? `${right}px` : undefined,
      width: `${submenuWidth}px`,
      minWidth: 'auto'
    }
  }

  const renderSubmenu = (category: string) => {
    const position = calculateSubmenuPosition(category)
    return (
      <div 
        ref={el => submenuRefs.current[category] = el}
        className={styles.submenu}
        style={position}
      >
        {renderSubmenuColumns(category, categories[category])}
      </div>
    )
  }

  const renderSubmenuColumns = (category: string, subcategories: string[]) => {
    const columnsCount = Math.min(Math.ceil(subcategories.length / 10), 4)
    const chunkSize = Math.ceil(subcategories.length / columnsCount)
    
    return (
      <div className={styles.submenuColumns}>
        {chunkArray(subcategories, chunkSize).map((column, i) => (
          <div key={i} className={styles.submenuColumn}>
            {column.map((subcategory) => (
              <Link
                key={subcategory}
                href={`/category/${formatSlug(category)}?subcategory=${formatSlug(subcategory)}`}
                className={styles.submenuLink}
              >
                <span className={styles.submenuIcon}>→</span>
                {subcategory}
              </Link>
            ))}
          </div>
        ))}
      </div>
    )
  }

   return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.fullWidthContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.menuRows}>
            {/* Первый ряд категорий */}
            <div className={styles.menuRow}>
              {categoryList.slice(0, 5).map((category) => (
                <div
                  key={category}
                  ref={el => menuItemRefs.current[category] = el}
                  className={styles.menuItem}
                  onMouseEnter={() => setHoveredCategory(category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <button
                    className={`${styles.menuLink} ${activeCategory === category ? styles.activeCategory : ''}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                    <span className={styles.menuIcon}>⌄</span>
                  </button>
                  {hoveredCategory === category && renderSubmenu(category)}
                </div>
              ))}
            </div>

            {/* Второй ряд категорий */}
            <div className={styles.menuRow}>
              {categoryList.slice(5).map((category) => (
                <div
                  key={category}
                  ref={el => menuItemRefs.current[category] = el}
                  className={styles.menuItem}
                  onMouseEnter={() => setHoveredCategory(category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <button
                    className={`${styles.menuLink} ${activeCategory === category ? styles.activeCategory : ''}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                    <span className={styles.menuIcon}>⌄</span>
                  </button>
                  {hoveredCategory === category && renderSubmenu(category)}
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className={styles.priceFilter}>
            <div className={styles.filterGroup}>
              <div className={styles.inputWrapper}>
                <input
                  type="number"
                  placeholder="От"
                  className={styles.filterInput}
                  value={minInvestment}
                  onChange={(e) => setMinInvestment(e.target.value)}
                />
                <span className={styles.currency}>₽</span>
              </div>
            </div>

            <div className={styles.filterGroup}>
              <div className={styles.inputWrapper}>
                <input
                  type="number"
                  placeholder="До"
                  className={styles.filterInput}
                  value={maxInvestment}
                  onChange={(e) => setMaxInvestment(e.target.value)}
                />
                <span className={styles.currency}>₽</span>
              </div>
            </div>

            <button type="submit" className={styles.filterButton}>
              Найти
            </button>
          </form>
        </div>
      </div>
    </nav>
  )
}

// Вспомогательная функция для разделения массива на части
function chunkArray(array: any[], size: number) {
  const result = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}