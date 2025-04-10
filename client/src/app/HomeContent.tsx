'use client'

import Link from 'next/link'
import styles from './app.module.css'
import FilterSection from '../components/Filter/FilterSection'
import BusinessCategoriesSection from '../components/businessCategories/BusinessCategoriesSection'
import Navbar from '../components/Navbar/Navbar'
import { useState, useEffect, useRef } from 'react'
import { FaRegHeart, FaHeart, FaBalanceScale } from 'react-icons/fa'

export default function Home() {
  // Категории недвижимости
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
  // Данные по категориям бизнеса
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

  const [activeCategory, setActiveCategory] = useState('Коммерческая недвижимость')
  const [favorites, setFavorites] = useState<number[]>([])
  

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      // Prevent scrolling when interacting with sliders
      if ((e.target as HTMLElement).closest('.listingSlider')) {
        e.preventDefault()
      }
    }

    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    return () => {
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])
  const sliderRefs = useRef<{[key: string]: HTMLDivElement | null}>({})
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e: React.MouseEvent, category: string) => {
    const slider = sliderRefs.current[category]
    if (!slider) return
    
    setIsDragging(true)
    setStartX(e.pageX - slider.offsetLeft)
    setScrollLeft(slider.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent, category: string) => {
    if (!isDragging) return
    const slider = sliderRefs.current[category]
    if (!slider) return
    
    e.preventDefault()
    const x = e.pageX - slider.offsetLeft
    const walk = (x - startX) * 2
    slider.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent, category: string) => {
    const slider = sliderRefs.current[category]
    if (!slider) return
    
    const touch = e.touches[0]
    setStartX(touch.pageX - slider.offsetLeft)
    setScrollLeft(slider.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent, category: string) => {
    const slider = sliderRefs.current[category]
    if (!slider) return
    
    const touch = e.touches[0]
    const x = touch.pageX - slider.offsetLeft
    const walk = (x - startX) * 2
    slider.scrollLeft = scrollLeft - walk
  }
  return (
    <div className={styles.container}>
      <FilterSection 
        onCategoryChange={(category) => setActiveCategory(category)} 
      />
      <BusinessCategoriesSection 
        activeCategory={activeCategory} 
        propertyCategories={propertyCategories}
      />
      
      {/* Категории объявлений */}
      <div className={styles.categoriesContainer}>
      {Object.entries(businessCategories).map(([category, items]) => (
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
            
            <div 
              className={`${styles.listingsGrid} listingSlider`}
              ref={el => sliderRefs.current[category] = el}
              onMouseDown={(e) => handleMouseDown(e, category)}
              onMouseMove={(e) => handleMouseMove(e, category)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={(e) => handleTouchStart(e, category)}
              onTouchMove={(e) => handleTouchMove(e, category)}
            >
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
                    <div className={styles.listingActions}>
                      <button 
                        className={styles.actionButton}
                        onClick={() => toggleFavorite(item.id)}
                        aria-label={favorites.includes(item.id) ? "Удалить из избранного" : "Добавить в избранное"}
                      >
                        {favorites.includes(item.id) ? (
                          <FaHeart className={styles.favoriteIconActive} />
                        ) : (
                          <FaRegHeart className={styles.favoriteIcon} />
                        )}
                      </button>
                      <button 
                        className={styles.actionButton}
                        aria-label="Добавить к сравнению"
                      >
                        <FaBalanceScale className={styles.compareIcon} />
                      </button>
                    </div>
                  </div>
                  <div className={styles.listingContent}>
                    <h3 className={styles.listingTitle}>{item.title}</h3>
                    <p className={styles.listingLocation}>{item.location.city}</p>
                    <p className={styles.listingDetails}>{item.details}</p>
                    {item.price > 0 && (
                      <div className={styles.listingPrice}>
                        {item.price.toLocaleString()} ₽
                      </div>
                    )}
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
        <h2 className={styles.benefitsTitle}>Почему выбирают DSI CLU?</h2>
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