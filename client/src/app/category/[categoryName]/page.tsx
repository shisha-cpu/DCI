'use client'

import { useParams, useSearchParams } from 'next/navigation'
import styles from './app.module.css'
import { FaRegHeart, FaHeart, FaBalanceScale, FaSearch, FaTimes, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { useState, useMemo , useEffect} from 'react'
import Link from 'next/link'
interface Listing {
  id: number
  title: string
  price: number
  location: { city: string }
  images: { path: string }[]
  details: string
  category: string
  subcategory?: string  // Добавьте это
  description?: string  // И это, если используется
  _id?: string         // И это, если используется
}

interface BusinessCategories {
  [key: string]: Listing[]
}
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
  const searchParams = useSearchParams()
  const categoryName = decodeURIComponent(params.categoryName as string)
  const subcategoryParam = searchParams.get('subcategory') || ''
  const minPriceParam = searchParams.get('min') || ''
  const maxPriceParam = searchParams.get('max') || ''
  
  const [favorites, setFavorites] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [investmentFrom, setInvestmentFrom] = useState(minPriceParam)
  const [investmentTo, setInvestmentTo] = useState(maxPriceParam)
  const [sortOption, setSortOption] = useState('default')
  const [sortDirection, setSortDirection] = useState<'asc'|'desc'>('asc')
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(subcategoryParam)
  const [businessCategories, setBusinessCategories] = useState<BusinessCategories>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // Находим правильное название категории
  const actualCategoryName = Object.keys(propertyCategories).find(
    key => key.toLowerCase().replace(/\s+/g, '-') === categoryName.toLowerCase()
  ) || Object.keys(propertyCategories)[0]
  // Получаем подкатегории для текущей категории
  const subcategories = propertyCategories[actualCategoryName as keyof typeof propertyCategories] || []
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/listings`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch listings')
        }
        const data: Listing[] = await response.json()
        
        // Check if the response has a data property (array) or is the array itself
        const listingsArray = Array.isArray(data) ? data : (data.data || [])
        
        // Группировка объявлений по категориям
        const grouped: BusinessCategories = {}
        listingsArray.forEach(listing => {
          if (!listing.category) return // Skip if no category
          
          if (!grouped[listing.category]) {
            grouped[listing.category] = []
          }
          grouped[listing.category].push(listing)
        })
        
        setBusinessCategories(grouped)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        setLoading(false)
      }
    }
  
    fetchListings()
  }, [])



  // Применяем параметры из URL при загрузке
  useEffect(() => {
    if (minPriceParam) {
      setInvestmentFrom(minPriceParam)
    }
    if (maxPriceParam) {
      setInvestmentTo(maxPriceParam)
    }
  }, [minPriceParam, maxPriceParam])

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  // Фильтрация и сортировка объектов
  const filteredItems = useMemo(() => {
    // Ensure we have an array, even if the category doesn't exist
    let items = (businessCategories[actualCategoryName as keyof typeof businessCategories] || [])
      .filter(item => item) // Remove any undefined/null items
  
    // Фильтрация по поисковому запросу
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      items = items.filter(item => 
        (item.title?.toLowerCase()?.includes(query) ||
        (item.description?.toLowerCase()?.includes(query)) ||
        (item.details?.toLowerCase()?.includes(query))
      ))
    }
  
    // Фильтрация по цене
    if (investmentFrom) {
      const from = parseInt(investmentFrom)
      if (!isNaN(from)) {
        items = items.filter(item => item.price && item.price >= from)
      }
    }
  
    if (investmentTo) {
      const to = parseInt(investmentTo)
      if (!isNaN(to)) {
        items = items.filter(item => item.price && item.price <= to)
      }
    }
  
    // Фильтрация по подкатегории
    if (selectedSubcategory) {
      // Сравниваем с подкатегорией в данных, учитывая возможные форматы
      items = items.filter(item => {
        if (!item.subcategory) return false
        
        // Приводим обе подкатегории к сравнимому формату
        const itemSubcategorySlug = item.subcategory.toLowerCase().replace(/\s+/g, '-')
        const selectedSlug = selectedSubcategory.toLowerCase()
        
        return itemSubcategorySlug === selectedSlug
      })
    }
  
    // Сортировка
    switch (sortOption) {
      case 'price':
        items.sort((a, b) => sortDirection === 'asc' ? 
          (a.price || 0) - (b.price || 0) : 
          (b.price || 0) - (a.price || 0))
        break
      case 'popularity':
        items.sort((a, b) => sortDirection === 'asc' ? 
          ((a._id || '').localeCompare(b._id || '')) : 
          ((b._id || '').localeCompare(a._id || '')))
        break
      case 'title':
        items.sort((a, b) => sortDirection === 'asc' ? 
          (a.title || '').localeCompare(b.title || '') : 
          (b.title || '').localeCompare(a.title || ''))
        break
      default:
        break
    }
  
    return items
  }, [actualCategoryName, searchQuery, investmentFrom, investmentTo, sortOption, sortDirection, selectedSubcategory, businessCategories])
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

  if (loading) {
    return <div className={styles.loading}>Загрузка данных...</div>
  }



  return (
    <div className={styles.filtersContainer}>
    <h1 className={styles.pageTitle}>Каталог {actualCategoryName.toLowerCase()}</h1>
    
    {/* Фильтр по подкатегориям */}
    <div className={styles.subcategoryFilter}>
      <select 
        className={styles.select}
        value={selectedSubcategory}
        onChange={(e) => setSelectedSubcategory(e.target.value)}
      >
        <option value="">Все подкатегории</option>
        {subcategories.map(subcategory => {
          const subcategorySlug = subcategory.toLowerCase().replace(/\s+/g, '-')
          return (
            <option key={subcategorySlug} value={subcategorySlug}>
              {subcategory}
            </option>
          )
        })}
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
          <FaBalanceScale />
           Ещё фильтры
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
      {(minPriceParam || maxPriceParam) && (
        <span className={styles.selectedSubcategory}>
          • Цена: {minPriceParam ? `от ${parseInt(minPriceParam).toLocaleString('ru-RU')} ₽` : ''}
          {maxPriceParam ? ` до ${parseInt(maxPriceParam).toLocaleString('ru-RU')} ₽` : ''}
        </span>
      )}
    </div>

    <div className={styles.itemsGrid}>
      {filteredItems.length > 0 ? (
        filteredItems.map(item => (
          <div key={item.id} className={styles.itemCard}>
            <div className={styles.cardImageContainer}>
              <img 
                    src={`${process.env.NEXT_PUBLIC_IMG_URL || 'http://localhost:5000'}${item.images[0].path}`} 
              alt={item.title} className={styles.cardImage} />
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
    {item.price?.toLocaleString('ru-RU')} ₽
  </p>
  <p className={styles.cardLocation}>
    {item.location?.city}
  </p>
  <p className={styles.cardDescription}>
    {highlightMatch(item.description, searchQuery)}
  </p>
  <Link href={`/item/${item._id}`} className={styles.cardLink}>
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
function highlightMatch(text: string | undefined, query: string) {
  if (!query || !text) return text || ''
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