import Link from 'next/link'
import styles from './app.module.css'
import FilterSection from '../components/Filter/FilterSection'
import BusinessCategoriesSection from '../components/businessCategories/BusinessCategoriesSection'
import Navbar from '../components/Navbar/Navbar'
export default function Home() {
  // Тестовые данные объявлений
  const listings = [
    {
      id: 1,
      title: 'Коммерческое помещение в центре Москвы',
      type: 'commercial',
      price: 25000000,
      area: 120,
      location: { city: 'Москва' },
      images: [{ path: '/placeholder.jpg' }]
    },
    {
      id: 2,
      title: 'Квартира в новостройке с отделкой',
      type: 'residential',
      price: 15000000,
      area: 85,
      rooms: 3,
      location: { city: 'Санкт-Петербург' },
      images: [{ path: '/placeholder.jpg' }]
    },
    {
      id: 3,
      title: 'Земельный участок под ИЖС 15 соток',
      type: 'land',
      price: 3500000,
      area: 1500,
      location: { city: 'Сочи' },
      images: [{ path: '/placeholder.jpg' }]
    },
    {
      id: 4,
      title: 'Готовый бизнес - кофейня',
      type: 'business',
      price: 5000000,
      location: { city: 'Казань' },
      images: [{ path: '/placeholder.jpg' }]
    },
    {
      id: 5,
      title: 'Офисное помещение класса B+',
      type: 'commercial',
      price: 18000000,
      area: 200,
      location: { city: 'Екатеринбург' },
      images: [{ path: '/placeholder.jpg' }]
    },
    {
      id: 6,
      title: 'Апартаменты с видом на море',
      type: 'residential',
      price: 12000000,
      area: 65,
      rooms: 2,
      location: { city: 'Сочи' },
      images: [{ path: '/placeholder.jpg' }]
    }
  ]

  return (
    <div className={styles.container}>
      <Navbar />
      <FilterSection />
      {/* <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Инвестируйте в недвижимость и бизнес с GreenInvest
        </h1>
        <p className={styles.heroText}>
          Платформа для безопасных и выгодных инвестиций
        </p>
        <div className={styles.buttonGroup}>
          <Link href="/catalog" className={`${styles.heroButton} ${styles.primaryButton}`}>
            Каталог объектов
          </Link>
          <Link href="/about" className={`${styles.heroButton} ${styles.secondaryButton}`}>
            О платформе
          </Link>
        </div>
      </section> */}
      <BusinessCategoriesSection />
      {/* Featured Listings */}
      <section className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>Рекомендуемые объекты</h2>
        <div className={styles.listingsGrid}>
          {listings.map(listing => (
            <div key={listing.id} className={styles.listingCard}>
              <div className={styles.listingImage}>
                <img 
                  src={listing.images[0].path} 
                  alt={listing.title}
                  className={styles.listingImage}
                />
                <span className={styles.listingBadge}>
                  {listing.type === 'residential' ? 'Жилая' : 
                   listing.type === 'commercial' ? 'Коммерческая' : 
                   listing.type === 'land' ? 'Земля' : 'Бизнес'}
                </span>
              </div>
              <div className={styles.listingContent}>
                <h3 className={styles.listingTitle}>{listing.title}</h3>
                <p className={styles.listingLocation}>{listing.location.city}</p>
                <div className={styles.listingDetails}>
                  <span className={styles.listingPrice}>
                    {listing.price.toLocaleString()} ₽
                  </span>
                  {listing.area && (
                    <span className={styles.listingArea}>{listing.area} м²</span>
                  )}
                </div>
                <Link 
                  href={`/listings/${listing.id}`} 
                  className={styles.listingButton}
                >
                  Подробнее
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefitsSection}>
        <h2 className={styles.benefitsTitle}>Почему выбирают GreenInvest?</h2>
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