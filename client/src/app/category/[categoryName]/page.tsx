// app/category/[categoryName]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import styles from '../../app.module.css'
import { FaRegHeart, FaHeart, FaBalanceScale } from 'react-icons/fa'
import { useState } from 'react'
import Link from 'next/link'
// Локальные данные (можно вынести в отдельный файл)
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

export default function CategoryPage() {
  const params = useParams()
  const categoryName = decodeURIComponent(params.categoryName as string)
  
  // Находим правильное название категории (с учетом регистра и пробелов)
  const actualCategoryName = Object.keys(businessCategories).find(
    key => key.toLowerCase().replace(/\s+/g, '-') === categoryName.toLowerCase()
  ) || 'Коммерческая недвижимость'

  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  // Получаем объекты для текущей категории
  const categoryItems = businessCategories[actualCategoryName as keyof typeof businessCategories] || []

  return (
    <div className={styles.container}>
      <h1 className={styles.categoryPageTitle}>{actualCategoryName}</h1>
      
      <div className={styles.listingsGrid}>
        {categoryItems.map(item => (
          <div key={item.id} className={styles.listingCard}>
            <div className={styles.listingImage}>
              <img 
                src={item.images[0].path} 
                alt={item.title}
                className={styles.image}
              />
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

      {categoryItems.length === 0 && (
        <div className={styles.noResults}>
          <p>В этой категории пока нет объектов</p>
          <Link href="/" className={styles.backButton}>
            Вернуться на главную
          </Link>
        </div>
      )}
    </div>
  )
}