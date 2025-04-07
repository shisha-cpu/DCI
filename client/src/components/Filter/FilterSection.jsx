'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './filter.module.css'

export default function FilterSection({ onCategoryChange }) {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState('Коммерческая недвижимость')
  const [minInvestment, setMinInvestment] = useState('')
  const [maxInvestment, setMaxInvestment] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const categories = [
    'Коммерческая недвижимость',
    'Жилая недвижимость',
    'Земельные участки',
    'Производство',
    'Сельхоз активы',
    'Рестораны и развлечения',
    'Спецтехника и транспорт',
    'Финансовые активы'
  ]

  // Map categories to background image URLs
  const categoryBackgrounds = {
    'Коммерческая недвижимость': 'https://mperspektiva.ru/upload/iblock/87b/87bbd1f76a65d0473bc7326a2dd0a9db.png',
    'Жилая недвижимость': 'https://avatars.mds.yandex.net/i?id=128648de188af4084304a70b42339711_l-4580245-images-thumbs&n=13',
    'Земельные участки': 'https://avatars.mds.yandex.net/i?id=f68c7e8b38e481ab29461315dd39d1ae_l-5204637-images-thumbs&n=13g',
    'Производство': 'https://avatars.mds.yandex.net/i?id=c47dd835e053dfa814533ba2f48234f4_l-5222129-images-thumbs&n=13',
    'Сельхоз активы': 'https://vologodskij-r19.gosweb.gosuslugi.ru/netcat_files/483/2345/the_importance_of_the_commodities_market.jpg',
    'Рестораны и развлечения': 'https://aledo-pro.ru/images/projects/img_64155c9bdeebd1_76912318.webp',
    'Спецтехника и транспорт': 'https://avatars.mds.yandex.net/get-altay/11421909/2a0000019104e92ce3c977e0c26545ae66f8/orig',
    'Финансовые активы': 'https://avatars.mds.yandex.net/i?id=c35cbc86fdfca021af13b635d39eaddb_l-4400724-images-thumbs&n=13',
    'Готовый бизнес': 'https://yandex-images.clstorage.net/u9HEE7417/c8c70dgi5/Rz7_IbOVXzhdk65KbGtKJtn06Z8eUp20Q2zV8dEGtnyvFvfRQrBpQv0MwYeA_xbWJFgDxyTs0GzY3IGpm5oA0AoHmizqlCYkXYf_ZkVbIhaZodnqEgeV0FNxscH4nx-pTtdWONdQ8KZRbYGqxat-rzwFrnd9LJTgYTnYbaevFQFvji_R71nKIFnHy6I4a2aeXaV1Z6IvRQ0X-JhcDGeL-XJDZuCzeKROyUk1-m2bK7c8QWY6tRDkWPUpXLFPB-khzw6zRbtR2lit2_dOWEPiioklFcMqw7XZc8DIgGyzh-3yZ86cPygwpt3ZpdLBowMbuN2KQjX8eLCpAfT5-_MZqduyL7F74aZAdaOL_gS37lLFgV2vMrdhXYtMUGCUw7dhQmu-mNscSM5NbaHenYOHc-BpBsq1lPyUUWlo9SeD-VXT0rd1h72mYD0_q5LEt9IihbVtw56raYXbRJAU4FdzjWb3rkjP7Eyu4TENBkHbT4u0NdbidXAMsE0R4OG3n2kB58bHLe8NRrBl53NegGt6uqmhfcNur-VZO0TUoKjXCylWE3rgE8yIzuVhVYLthyufrE2W6mmUZPzZKZwd4wupDdfqw6FrnYoUoSv3Gjw3WmJ1vRl7tk8VqTd0hFB09_MRDktO3P_41DrhydWqFZM_A2Q1itI9hIC8ZW0Qpe8TabFvxifRgxWK2HXnu0bcf-reFalF66rHHQ1_rFTYfF87ua43ZiSbfFi6JR2pjpUr9yMkQYqSIQQIVI0p3PH7g_ldT-p_xb-V8gipq0OqaFemosF17avCMxXBEwx0KKDPs4neSwowF6hQqrUlSZqBg__34FUyHvF01MhJUYBxA-MpPQd-d-HfBapMDZN3vuArZhYp_QXDlsMViRdc9LAQA3upfmO-oN-cMJK1GZH68ZdT10gZ-uI9fGBUFS1Q3U-z6T2r1sOxA7U6SDkHO3bcW-LWedE5c-qf8blzUOAMdPe4'
  }

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    onCategoryChange(category)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  
    // Преобразуем категорию в slug (например, "Коммерческая недвижимость" -> "коммерческая-недвижимость")
    const categorySlug = activeCategory.toLowerCase().replace(/\s+/g, '-')
  
    // Формируем параметры URL
    const queryParams = new URLSearchParams()
    if (minInvestment) {
      queryParams.set('min', minInvestment)
    }
    if (maxInvestment) {
      queryParams.set('max', maxInvestment)
    }
  
    // Перенаправляем на страницу с категорией и параметрами
    router.push(`/category/${categorySlug}?${queryParams.toString()}`)
  }
  
  return (
    <div 
      className={styles.filterContainer}
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(240, 253, 244, 0.9) 100%), url(${categoryBackgrounds[activeCategory]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className={styles.filterContent}>
        <div className={styles.headerWrapper}>
          <h1 className={styles.headerTitle}>
            <span className={styles.titleGradient}>DCI CLUB</span> | Работаем по всей России
          </h1>
          <p className={styles.headerSubtitle}>Инвестиции в бизнес для каждого</p>
        </div>
        
        <div className={styles.categories}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                activeCategory === category ? styles.categoryButtonActive : ''
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
              <span className={styles.buttonHoverEffect}></span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className={styles.filterForm}>
          <div className={styles.inputsContainer}>
            <div 
              className={`${styles.filterGroup} ${isFocused ? styles.focused : ''}`}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            >
              <label className={styles.filterLabel}>Инвестиция от</label>
              <div className={styles.inputWrapper}>
                <input
                  type="number"
                  placeholder="100 000"
                  className={styles.filterInput}
                  value={minInvestment}
                  onChange={(e) => setMinInvestment(e.target.value)}
                />
                <span className={styles.currency}>₽</span>
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Инвестиции до</label>
              <div className={styles.inputWrapper}>
                <input
                  type="number"
                  placeholder="10 000 000"
                  className={styles.filterInput}
                  value={maxInvestment}
                  onChange={(e) => setMaxInvestment(e.target.value)}
                />
                <span className={styles.currency}>₽</span>
              </div>
            </div>
          </div>

          <button type="submit" className={styles.filterButton}>
            Показать результаты
            <span className={styles.buttonArrow}>&rarr;</span>
          </button>
        </form>
      </div>
    </div>
  )
}