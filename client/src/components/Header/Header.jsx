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

  const categories = {
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

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          DCI CLUB
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
                      <Link href="/contacts" className={styles.navLink} onClick={closeAll}>
                        <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Контакты
                      </Link>
                      
                      <button 
                        onClick={() => {
                          setIsModalOpen(true)
                          closeAll()
                        }} 
                        className={styles.navLink}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Задать вопрос
                      </button>
                      
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

                <button className={styles.whiteSpace} onClick={()=>{closeAll(); setIsModalOpen(true)}}>
                  Оставить заявку
                </button>
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
                  {currentLanguage === 'ru' ? 'Рус' : currentLanguage === 'en' ? 'Eng' : 'العربية'}
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
                      Русский
                    </button>
                    <button 
                      className={`${styles.languageOption} ${currentLanguage === 'en' ? styles.activeLanguage : ''}`}
                      onClick={() => selectLanguage('en')}
                    >
                      English
                    </button>
                    <button 
                      className={`${styles.languageOption} ${currentLanguage === 'ar' ? styles.activeLanguage : ''}`}
                      onClick={() => selectLanguage('ar')}
                    >
                      العربية
                    </button>
                  </div>
                )}
              </div>

              <Link href="/contacts" className={styles.navLink}>
                <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Контакты
              </Link>
              
              <button 
                onClick={() => setIsModalOpen(true)} 
                className={styles.navLink}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Задать вопрос
              </button>
              
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
            <div className={styles.container}>
              <button className={styles.button} onClick={()=>{setIsModalOpen(true)}}>Оставить заявку</button>
            </div>
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