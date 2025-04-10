'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './header.module.css'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'



export default function Header() {
  const pathname = usePathname()
  const user = useSelector(state => state.user.user)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('ru')
  const [currentCity, setCurrentCity] = useState('Москва')
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false)
const ArabFlag = '/country/arab.png'
const UsaFlag = '/country/usa.svg'
const RuFlag = '/country/ru.svg'
const Logo = '/logo.png'
  // Список крупных российских городов
  const russianCities = [
    'Москва',
    'Санкт-Петербург',
    'Новосибирск',
    'Екатеринбург',
    'Казань',
    'Нижний Новгород',
    'Челябинск',
    'Самара',
    'Омск',
    'Ростов-на-Дону',
    'Уфа',
    'Красноярск',
    'Пермь',
    'Воронеж',
    'Волгоград',
    'Краснодар',
    'Саратов',
    'Тюмень',
    'Тольятти',
    'Ижевск',
    'Барнаул',
    'Ульяновск',
    'Иркутск',
    'Хабаровск',
    'Ярославль',
    'Владивосток',
    'Махачкала',
    'Томск',
    'Оренбург',
    'Кемерово'
  ]

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
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const getLkUrl = (tab) => {
    return `/lk?tab=${tab}`
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    setActiveCategory(null)
  }

  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category)
  }

  const closeAll = () => {
    setIsMenuOpen(false)
    setActiveCategory(null)
  }

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!languageDropdownOpen)
  }

  const selectLanguage = (lang) => {
    setCurrentLanguage(lang)
    setLanguageDropdownOpen(false)
  }
  const toggleCityDropdown = () => {
    setIsCityDropdownOpen(!isCityDropdownOpen)
    // Закрываем другие выпадающие списки при открытии
    if (!isCityDropdownOpen) {
      setLanguageDropdownOpen(false)
    }
  }

  const selectCity = (city) => {
    setCurrentCity(city)
    setIsCityDropdownOpen(false)
    // Здесь можно добавить сохранение выбора города в localStorage
    // или отправку на сервер
  }
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
        <img src={Logo} alt="Логотип" />
        </Link>

        {isMobile ? (
          <>
            <div className={styles.mobileControls}>
          

              <Link href={getLkUrl('favorites')} className={styles.favoritesIcon}>
                <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Link>
              
              <button 
                className={`${styles.burgerButton} ${isMenuOpen ? styles.open : ''}`}
                onClick={toggleMenu}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>

            {isMenuOpen && (
              <div className={styles.mobileMenu}>
                <div className={styles.menuHeader}>
                  <h3>Меню</h3>
                </div>

                <div className={styles.menuSections}>
                  <div className={styles.navSection}>
                    <h4 className={styles.sectionTitle}>Навигация</h4>
                    <nav className={styles.mobileNav}>
                    <Link href="/about" className={styles.navLink}>
  <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  О нас
</Link>

<Link href="/franchise" className={styles.navLink}>
  <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
  </svg>
  Бесплатная франшиза
</Link>
<Link href="/advertising" className={styles.navLink}>
  <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
  Реклама на платформе
</Link>

<Link href="/careers" className={styles.navLink}>
  <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
  Вакансии
</Link>

                      <Link href="/contacts" className={styles.navLink} onClick={closeAll}>
                        <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Контакты
                      </Link>
        
                      
                      <Link href={getLkUrl('notifications')} className={styles.navLink} onClick={closeAll}>
                        <div className="relative">
                          <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        </div>
                        Уведомления
                      </Link>
                      
                      <Link href={getLkUrl('compare')} className={styles.navLink} onClick={closeAll}>
                        <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Сравнения
                      </Link>
                      
                      <Link href={getLkUrl('profile')} className={styles.authButton} onClick={closeAll}>
                        <svg className={styles.icon} stroke="white" fill="none" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {user && user.name ? user.name : 'Вход'}
                      </Link>
                    </nav>
                  </div>
                  <div className={styles.citySelector}>
              <button 
                className={styles.cityButton}
                onClick={toggleCityDropdown}
              >
                <svg className={styles.cityIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {currentCity}
                <svg 
                  className={`${styles.cityArrow} ${isCityDropdownOpen ? styles.rotated : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isCityDropdownOpen && (
                <div className={styles.cityDropdown}>
                  <div className={styles.citySearch}>
                    <input 
                      type="text" 
                      placeholder="Поиск города..." 
                      className={styles.citySearchInput}
                    />
                  </div>
                  <div className={styles.cityList}>
                    {russianCities.map(city => (
                      <button
                        key={city}
                        className={`${styles.cityOption} ${currentCity === city ? styles.activeCity : ''}`}
                        onClick={() => selectCity(city)}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
                  <div className={styles.categoriesSection}>
                    <h4 className={styles.sectionTitle}>Категории</h4>
                    <div className={styles.categoriesList}>
                      {Object.keys(categories).map((category) => (
                        <div key={category} className={styles.categoryItem}>
                          <button 
                            className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ''}`}
                            onClick={() => toggleCategory(category)}
                          >
                            {category}
                            <svg 
                              className={`${styles.arrowIcon} ${activeCategory === category ? styles.rotated : ''}`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          
                          {activeCategory === category && (
                            <div className={styles.subcategories}>
                              {categories[category].map((subcategory) => (
                                <Link 
                                  key={subcategory} 
                                  href={`/search?category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategory)}`} 
                                  className={styles.subcategoryLink}
                                  onClick={closeAll}
                                >
                                  {subcategory}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* <button className={styles.whiteSpace} onClick={()=>{closeAll(); setIsModalOpen(true)}}>
                  Оставить заявку
                </button> */}
              </div>
            )}
          </>
        ) : (
          <>
            <nav className={styles.nav}>
              <div className={styles.languageSelector}>
                <button 
                  className={styles.languageButton}
                  onClick={toggleLanguageDropdown}
                >
                  {currentLanguage === 'ru' ? 
                    <img src={RuFlag} alt="Русский" className={styles.countrySvg} /> : 
                    currentLanguage === 'en' ? 
                    <img src={UsaFlag} alt="Английский" className={styles.countrySvg} /> : 
                    <img src={ArabFlag} alt="Арабский" className={styles.countrySvg} />
                  }
                  <svg 
                    className={`${styles.languageArrow} ${languageDropdownOpen ? styles.rotated : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {languageDropdownOpen && (
                  <div className={styles.languageDropdown}>
                    <button 
                      className={`${styles.languageOption} ${currentLanguage === 'ru' ? styles.activeLanguage : ''}`}
                      onClick={() => selectLanguage('ru')}
                    >
                      <img src={RuFlag} alt="Русский" className={styles.countrySvg} />
                    </button>
                    <button 
                      className={`${styles.languageOption} ${currentLanguage === 'en' ? styles.activeLanguage : ''}`}
                      onClick={() => selectLanguage('en')}
                    >
                      <img src={UsaFlag} alt="Английский" className={styles.countrySvg} />
                    </button>
                    <button 
                      className={`${styles.languageOption} ${currentLanguage === 'ar' ? styles.activeLanguage : ''}`}
                      onClick={() => selectLanguage('ar')}
                    >
                      <img src={ArabFlag} alt="Арабский" className={styles.countrySvg} />
                    </button>
                  </div>
                )}
              </div>
              <div className={styles.citySelector}>
              <button 
                className={styles.cityButton}
                onClick={toggleCityDropdown}
              >
                <svg className={styles.cityIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {currentCity}
                <svg 
                  className={`${styles.cityArrow} ${isCityDropdownOpen ? styles.rotated : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isCityDropdownOpen && (
                <div className={styles.cityDropdown}>
                  <div className={styles.citySearch}>
                    <input 
                      type="text" 
                      placeholder="Поиск города..." 
                      className={styles.citySearchInput}
                    />
                  </div>
                  <div className={styles.cityList}>
                    {russianCities.map(city => (
                      <button
                        key={city}
                        className={`${styles.cityOption} ${currentCity === city ? styles.activeCity : ''}`}
                        onClick={() => selectCity(city)}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
              <Link href="/about" className={styles.navLink}>
  <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  О нас
</Link>

<Link href="/franchise" className={styles.navLink}>
  <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
  </svg>
  Бесплатная франшиза
</Link>
<Link href="/advertising" className={styles.navLink}>
  <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
  Реклама на платформе
</Link>

<Link href="/careers" className={styles.navLink}>
  <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
  Вакансии
</Link>

<Link href="/contacts" className={styles.navLink}>
  <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
  Контакты
</Link>
{/*               
              <button 
                onClick={() => setIsModalOpen(true)} 
                className={styles.navLink}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Задать вопрос
              </button> */}
              
              <Link href={getLkUrl('notifications')} className={styles.navLink}>
                <div className="relative">
                  <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                Уведомления
              </Link>
              
              <Link href={getLkUrl('favorites')} className={styles.navLink}>
                <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Избранное
              </Link>
              
              <Link href={getLkUrl('compare')} className={styles.navLink}>
                <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Сравнения
              </Link>
              
              <Link href={getLkUrl('profile')} className={styles.authButton}>
                <svg className={styles.icon} stroke="white" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {user && user.name ? user.name : 'Вход'}
              </Link>
            </nav>
            {/* <div className={styles.container}>
              <button className={styles.button} onClick={()=>{setIsModalOpen(true)}}>Оставить заявку</button>
            </div> */}
          </>
        )}

        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h2>Записаться на консультацию</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className={styles.closeButton}
                >
                  &times;
                </button>
              </div>
              <div className={styles.modalBody}>
                <form>
                  <div className={styles.formGroup}>
                    <label>Укажите Имя (обязательно)</label>
                    <input type="text" placeholder="Имя" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Укажите Телефон (обязательно)</label>
                    <input type="tel" placeholder="+7 (999) 999-99-99" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Укажите E-mail</label>
                    <input type="email" placeholder="example@email.com" />
                  </div>
                  <div className={styles.checkboxGroup}>
                    <input type="checkbox" id="agree" required />
                    <label htmlFor="agree">Согласен на обработку персональных данных</label>
                  </div>
                  <button type="submit" className={styles.submitButton}>
                    Отправить заявку
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}