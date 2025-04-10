'use client'

import { useParams } from 'next/navigation'
import styles from './app.module.css'
import { FaRegHeart, FaHeart, FaBalanceScale, FaSearch, FaTimes, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { useState, useMemo } from 'react'
import Link from 'next/link'

const businessCategories = {
  'Коммерческая недвижимость': [
    {
      id: 1,
      title: 'Торговый центр в центре города',
      price: 120000000,
      location: { city: 'Москва' },
      images: [{ path: '/placeholder.jpg' }],
      details: 'Сдаётся в аренду, якорные арендаторы'
    },
    {
      id: 2,
      title: 'Офисный центр класса B+',
      price: 65000000,
      location: { city: 'Санкт-Петербург' },
      images: [{ path: '/placeholder.jpg' }],
      details: 'Заполнен арендаторами на 90%'
    },
    {
      id: 101,
      title: 'Гостиница у моря',
      price: 47000000,
      location: { city: 'Сочи' },
      images: [{ path: '/placeholder.jpg' }],
      details: '35 номеров, рейтинг 4.8 на Booking'
    }
  ],
  'Жилая недвижимость': [
    {
      id: 3,
      title: 'Квартира бизнес-класса в ЖК',
      price: 18000000,
      location: { city: 'Казань' },
      images: [{ path: '/placeholder.jpg' }],
      details: '3 комнаты, 87 м², новая отделка'
    },
    {
      id: 4,
      title: 'Коттедж в черте города',
      price: 25000000,
      location: { city: 'Екатеринбург' },
      images: [{ path: '/placeholder.jpg' }],
      details: 'Площадь дома 200 м², участок 10 соток'
    },
    {
      id: 103,
      title: 'Таунхаус с дизайнерским ремонтом',
      price: 14500000,
      location: { city: 'Краснодар' },
      images: [{ path: '/placeholder.jpg' }],
      details: 'Закрытая территория, 2 этажа'
    }
  ],
  'Земельные участки': [
    {
      id: 5,
      title: 'Участок под ИЖС',
      price: 1300000,
      location: { city: 'Ростов-на-Дону' },
      images: [{ path: '/placeholder.jpg' }],
      details: 'Площадь 8 соток, коммуникации рядом'
    },
    {
      id: 6,
      title: 'Коммерческий участок у трассы',
      price: 4800000,
      location: { city: 'Нижний Новгород' },
      images: [{ path: '/placeholder.jpg' }],
      details: 'Идеально под АЗС или логистику'
    },
    {
      id: 105,
      title: 'Земля под фермерское хозяйство',
      price: 2200000,
      location: { city: 'Тамбов' },
      images: [{ path: '/placeholder.jpg' }],
      details: '20 га, плодородная почва'
    }
  ],
  'Производство': [
    {
      id: 7,
      title: 'Цех по деревообработке с оборудованием',
      price: 9500000,
      location: { city: 'Пермь' },
      images: [{ path: '/placeholder.jpg' }],
      details: 'Площадь 1200 м², производственная лицензия'
    },
    {
      id: 8,
      title: 'Химическое производство',
      price: 18500000,
      location: { city: 'Волгоград' },
      images: [{ path: '/placeholder.jpg' }],
      details: 'Налаженное производство, сбытовая сеть'
    },
    {
      id: 107,
      title: 'Мини-пекарня с оборудованием',
      price: 3200000,
      location: { city: 'Киров' },
      images: [{ path: '/placeholder.jpg' }],
      details: 'Производство хлеба и выпечки'
    }
  ],
  'Сельхоз активы': [
    {
      id: 9,
      title: 'Птицефабрика полного цикла',
      price: 32000000,
      location: { city: 'Краснодар' },
      images: [{ path: '/placeholder.jpg' }],
      details: 'Производительность: 200 тыс. голов в месяц'
    },
    {
      id: 10,
      title: 'Тепличный комплекс',
      price: 27000000,
      location: { city: 'Астрахань' },
      images: [{ path: '/placeholder.jpg' }],
      details: 'Современное оборудование, круглогодичное выращивание'
    },
    {
      id: 109,
      title: 'Зерновое хозяйство',
      price: 39000000,
      location: { city: 'Оренбург' },
      images: [{ path: '/placeholder.jpg' }],
      details: '250 га, урожайность выше средней'
    }
  ],
  'Рестораны и развлечения': [
    {
      id: 11,
      title: 'Ресторан в центре города',
      price: 7800000,
      location: { city: 'Сочи' },
      images: [{ path: '/placeholder.jpg' }],
      details: 'Рейтинг 4.9, раскрученный бренд'
    },
    {
      id: 12,
      title: 'Развлекательный комплекс с кинотеатром',
      price: 54000000,
      location: { city: 'Новосибирск' },
      images: [{ path: '/placeholder.jpg' }],
      details: 'Высокая проходимость, стабильный доход'
    },
    {
      id: 111,
      title: 'Бар с музыкальной сценой',
      price: 3800000,
      location: { city: 'Казань' },
      images: [{ path: '/placeholder.jpg' }],
      details: 'Полностью оборудован, есть лицензия'
    }
  ],
  'Спецтехника и транспорт': [
    {
      id: 13,
      title: 'Флот строительной техники',
      price: 21500000,
      location: { city: 'Челябинск' },
      images: [{ path: '/placeholder.jpg' }],
      details: 'Экскаваторы, бульдозеры, автокраны'
    },
    {
      id: 14,
      title: 'Автобусный парк (туристические маршруты)',
      price: 16500000,
      location: { city: 'Уфа' },
      images: [{ path: '/placeholder.jpg' }],
      details: '10 автобусов, готовый бизнес'
    },
    {
      id: 113,
      title: 'Сельхоз техника — трактора и сеялки',
      price: 9800000,
      location: { city: 'Саратов' },
      images: [{ path: '/placeholder.jpg' }],
      details: '5 единиц, отличное состояние'
    }
  ],
  'Финансовые активы': [
    {
      id: 15,
      title: 'Портфель ценных бумаг',
      price: 5000000,
      location: { city: 'Москва' },
      images: [{ path: '/placeholder.jpg' }],
      details: 'Доходность 14% годовых'
    },
    {
      id: 16,
      title: 'Нематериальные активы — патенты и бренды',
      price: 8900000,
      location: { city: 'Санкт-Петербург' },
      images: [{ path: '/placeholder.jpg' }],
      details: 'Регистрация в Роспатенте, готово к продаже'
    },
    {
      id: 115,
      title: 'Дебиторская задолженность',
      price: 3200000,
      location: { city: 'Новосибирск' },
      images: [{ path: '/placeholder.jpg' }],
      details: 'Надёжный заёмщик, юридически оформлено'
    }
  ]
};

const propertyCategories= {
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
    'Производство',
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
    'Маслозавода',
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
    'Факторинг',
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
    'Проверка юридических лиц и предпринимателей',
    'Узнать кадастровый номер',
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
export default function CategoryPage() {
  const params = useParams()
  const categoryName = decodeURIComponent(params.categoryName as string)

  const [favorites, setFavorites] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [investmentFrom, setInvestmentFrom] = useState('')
  const [investmentTo, setInvestmentTo] = useState('')
  const [sortOption, setSortOption] = useState('default')
  const [sortDirection, setSortDirection] = useState<'asc'|'desc'>('asc')
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('')

  const actualCategoryName = Object.keys(businessCategories).find(
    key => key.toLowerCase().replace(/\s+/g, '-') === categoryName.toLowerCase()
  ) || 'Коммерческая недвижимость'

  const subcategories = propertyCategories[actualCategoryName as keyof typeof propertyCategories] || []

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const filteredItems = useMemo(() => {
    let items = businessCategories[actualCategoryName as keyof typeof businessCategories] || []
    
    if (searchQuery) {
      items = items.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.details.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    if (investmentFrom) {
      const from = parseInt(investmentFrom)
      items = items.filter(item => item.price >= from)
    }
    
    if (investmentTo) {
      const to = parseInt(investmentTo)
      items = items.filter(item => item.price <= to)
    }
    
    if (selectedSubcategory) {
      items = items.filter(item => 
        item.details.includes(selectedSubcategory) || 
        item.title.includes(selectedSubcategory)
      )
    }
    
    switch (sortOption) {
      case 'price':
        items.sort((a, b) => sortDirection === 'asc' ? a.price - b.price : b.price - a.price)
        break
      case 'popularity':
        items.sort((a, b) => sortDirection === 'asc' ? a.id - b.id : b.id - a.id)
        break
      case 'title':
        items.sort((a, b) => sortDirection === 'asc' ? 
          a.title.localeCompare(b.title) : b.title.localeCompare(a.title))
        break
      default:
        break
    }
    
    return items
  }, [actualCategoryName, searchQuery, investmentFrom, investmentTo, sortOption, sortDirection, selectedSubcategory])

  const clearSearch = () => {
    setSearchQuery('')
    setInvestmentFrom('')
    setInvestmentTo('')
    setSelectedSubcategory('')
    setSortOption('default')
    setSortDirection('asc')
  }

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
  }

  return (
    <div className={styles.filtersContainer}>
      <h1 className={styles.pageTitle}>Каталог {actualCategoryName.toLowerCase()}</h1>
      
      <div className={styles.subcategoryFilter}>
        <select 
          className={styles.select}
          value={selectedSubcategory}
          onChange={(e) => setSelectedSubcategory(e.target.value)}
        >
          <option value="">Все подкатегории</option>
          {subcategories.map(subcategory => (
            <option key={subcategory} value={subcategory}>
              {subcategory}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.searchRow}>
        <div className={styles.searchWrapper}>
          <FaSearch className={styles.searchIcon} />
          <input
            className={styles.inputWide}
            placeholder="Поиск по названию или описанию"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className={styles.clearButton}>
              <FaTimes />
            </button>
          )}
        </div>
        <div className={styles.extraFilters}>
          <button className={styles.filterLink}>
            <FaBalanceScale /> Ещё фильтры
          </button>
          {(searchQuery || investmentFrom || investmentTo || selectedSubcategory !== '') && (
            <button onClick={clearSearch} className={styles.resetLink}>
              <FaTimes /> Сбросить
            </button>
          )}
        </div>
      </div>

      <div className={styles.filterRow}>
        <div className={styles.priceFilter}>
          <input 
            className={styles.input} 
            placeholder="Цена от" 
            value={investmentFrom}
            onChange={(e) => setInvestmentFrom(e.target.value)}
            type="number"
          />
          <span className={styles.priceSeparator}>—</span>
          <input 
            className={styles.input} 
            placeholder="Цена до" 
            value={investmentTo}
            onChange={(e) => setInvestmentTo(e.target.value)}
            type="number"
          />
        </div>
        <div className={styles.sortContainer}>
          <select 
            className={styles.select}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Сортировка</option>
            <option value="price">По цене</option>
            <option value="title">По названию</option>
            <option value="popularity">По популярности</option>
          </select>
          {sortOption !== 'default' && (
            <button 
              onClick={toggleSortDirection} 
              className={styles.sortDirectionButton}
            >
              {sortDirection === 'asc' ? <FaArrowUp /> : <FaArrowDown />}
            </button>
          )}
        </div>
      </div>

      <div className={styles.resultsCount}>
        Найдено объектов: {filteredItems.length}
        {selectedSubcategory && (
          <span className={styles.selectedSubcategory}>
            • Подкатегория: {selectedSubcategory}
          </span>
        )}
      </div>

      <div className={styles.itemsGrid}>
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div key={item.id} className={styles.itemCard}>
              <div className={styles.cardImageContainer}>
                <img src={item.images[0].path} alt={item.title} className={styles.cardImage} />
                <button 
                  onClick={() => toggleFavorite(item.id)} 
                  className={styles.favoriteButton}
                >
                  {favorites.includes(item.id) ? (
                    <FaHeart className={styles.favoriteIconActive} />
                  ) : (
                    <FaRegHeart className={styles.favoriteIcon} />
                  )}
                </button>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{highlightMatch(item.title, searchQuery)}</h3>
                <p className={styles.cardPrice}>
                  {item.price.toLocaleString('ru-RU')} ₽
                </p>
                <p className={styles.cardLocation}>
                  {item.location.city}
                </p>
                <p className={styles.cardDescription}>
                  {highlightMatch(item.details, searchQuery)}
                </p>
                <Link href={`/item/${item.id}`} className={styles.cardLink}>
                  Подробнее
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>
            <FaSearch className={styles.noResultsIcon} />
            <p>Ничего не найдено</p>
            <button onClick={clearSearch} className={styles.clearFiltersButton}>
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// Функция для подсветки совпадений
function highlightMatch(text: string, query: string) {
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
