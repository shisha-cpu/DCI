'use client'

import Link from 'next/link'
import styles from './app.module.css'
import FilterSection from '../components/Filter/FilterSection'
import BusinessCategoriesSection from '../components/businessCategories/BusinessCategoriesSection'
import Navbar from '../components/Navbar/Navbar'
import { useState } from 'react'
import { FaRegHeart, FaHeart, FaBalanceScale } from 'react-icons/fa'

export default function Home() {
  // Категории недвижимости
  const propertyCategories = {
    'Коммерческая недвижимость': [
      'Торговый центр (здание)',
      'Торговое помещение / магазин',
      'Рынок / оптовая база',
      'Офисный центр (здание)',
      'Офисное помещение',
      'Складской комплекс',
      'Складское помещение',
      'Гостиница',
      'Хостел',
      'Спортивно-оздоровительный комплекс',
      'Автосервис',
      'Автосалон',
      'АЗС',
      'Помещение свободного назначения',
      'Здание свободного назначения'
    ],
    'Жилая недвижимость': [
      'Квартира',
      'Комната',
      'Частный дом / коттедж',
      'Таунхаус',
      'Многоквартирный жилой комплекс'
    ],
    'Земельные участки': [
      'Земля под ИЖС',
      'Земельный участок под коммерческую застройку'
    ],
    'Производство': [
      'Деревоперерабатывающее предприятие',
      'Металлообрабатывающее предприятие',
      'Пищевое производство',
      'Производство строительных материалов',
      'Текстильное производство',
      'Химическое производство'
    ],
    'Сельхоз активы': [
      'Птицефабрика',
      'Животноводческий комплекс',
      'Тепличный комплекс',
      'Зерновое хозяйство',
      'Элеватор',
      'Сад / виноградник'
    ],
    'Рестораны и развлечения': [
      'Ресторан/бар/кафе',
      'Развлекательный комплекс'
    ],
    'Спецтехника и транспорт': [
      'Грузовики и прицепы',
      'Строительная техника',
      'Сельхоз техника',
      'Автобусы',
      'Водный транспорт'
    ],
    'Финансовые активы': [
      'Ценные бумаги',
      'Дебиторская задолженность',
      'Нематериальные активы'
    ]
  }

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
        <h2 className={styles.benefitsTitle}>Почему выбирают DCI CLU?</h2>
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
      <section>
      </section>
    </div>
  )
}