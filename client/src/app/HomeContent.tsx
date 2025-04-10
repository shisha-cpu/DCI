'use client'

import Link from 'next/link'
import styles from './app.module.css'
import FilterSection from '../components/Filter/FilterSection'
import Navbar from '../components/Navbar/Navbar'
import { useState, useEffect, useRef } from 'react'
import { FaRegHeart, FaHeart, FaBalanceScale } from 'react-icons/fa'
import FranchiseBlocks from '../components/FranchiseBlocks/FranchiseBlocks'

interface Listing {
  id: number
  _id?: string
  title: string
  price: number
  location: { city: string }
  images: { path: string }[]
  details: string
  category: string
  subcategory?: string
}

interface BusinessCategories {
  [key: string]: Listing[]
}

export default function Home() {


  const [businessCategories, setBusinessCategories] = useState<BusinessCategories>({})
  const [activeCategory, setActiveCategory] = useState('Коммерческая недвижимость')
  const [favorites, setFavorites] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [recommendedListings, setRecommendedListings] = useState<Listing[]>([])

  // Тестовые данные для рекомендованных объявлений
  const testRecommendedListings: Listing[] = [
    {
      id: 101,
      title: 'Премиум офис в центре Москвы',
      price: 15000000,
      location: { city: 'Москва' },
      images: [{ path: '/images/office1.jpg' }],
      details: '120 кв.м, 2 этаж, евроремонт',
      category: 'Офисные помещения',
      subcategory: 'Офисы'
    },
    {
      id: 102,
      title: 'Кафе с полным оборудованием',
      price: 5000000,
      location: { city: 'Санкт-Петербург' },
      images: [{ path: '/images/cafe1.jpg' }],
      details: '80 кв.м, 25 посадочных мест',
      category: 'Рестораны | бары | кофе',
      subcategory: 'Кафе'
    },
    {
      id: 103,
      title: 'Салон красоты с клиентурой',
      price: 7500000,
      location: { city: 'Сочи' },
      images: [{ path: '/images/beauty1.jpg' }],
      details: '100 кв.м, оборудование включено',
      category: 'Сфера красоты',
      subcategory: 'Салоны красоты'
    }
  ]

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/listings`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch listings')
        }
        const res = await response.json()
        const data = res.data
        
        const grouped: BusinessCategories = {}
        data.forEach((listing: Listing) => {
          if (!grouped[listing.category]) {
            grouped[listing.category] = []
          }
          grouped[listing.category].push(listing)
        })
        
        setBusinessCategories(grouped)
        setRecommendedListings(testRecommendedListings)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        setLoading(false)
      }
    }

    fetchListings()
  }, [])

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

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

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Загрузка объявлений...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>Ошибка при загрузке данных: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className={styles.retryButton}
        >
          Попробовать снова
        </button>
      </div>
    )
  }

  return (
    <div className={styles.mainContainer}>
      {/* <Navbar /> */}
      <div className={styles.contentWrapper}>
        <div className={styles.mainContent}>

          <FranchiseBlocks />

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
                          src={`${process.env.NEXT_PUBLIC_IMG_URL || 'http://localhost:5000'}${item.images[0].path}`} 
                          alt={item.title}
                          className={styles.image}
                        />
                        <span className={styles.listingBadge}>
                          {item.subcategory}
                        </span>
            
                      </div>
                      <div className={styles.listingContent}>
  <div className={styles.listingTopRow}>
    <div>
      <h3 className={styles.listingTitle}>{item.title}</h3>
      <p className={styles.listingLocation}>{item.location.city}</p>
      <p className={styles.listingDetails}>{item.details}</p>
      {item.price > 0 && (
        <div className={styles.listingPrice}>
          {item.price.toLocaleString()} ₽
        </div>
      )}
    </div>
    <div className={styles.listingActionsRight}>
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
  <Link 
    href={`/item/${item._id}`} 
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

        <div className={styles.recommendedSidebar}>
          <h3 className={styles.recommendedTitle}>Рекомендуемые объявления</h3>
          <div className={styles.recommendedList}>
            {recommendedListings.map(item => (
              <div key={item.id} className={styles.recommendedCard}>
                <div className={styles.recommendedImage}>
                  <img 
                    src={item.images[0].path} 
                    alt={item.title}
                    className={styles.image}
                  />
                </div>
                <div className={styles.recommendedContent}>
                  <h4 className={styles.recommendedItemTitle}>{item.title}</h4>
                  <p className={styles.recommendedLocation}>{item.location.city}</p>
                  <p className={styles.recommendedPrice}>{item.price.toLocaleString()} ₽</p>
                  <Link 
                    href={`/item/${item.id}`} 
                    className={styles.recommendedButton}
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}