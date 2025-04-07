'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  const categories: Record<string, string[]> = {
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

  const formatSlug = (text: string) =>
    encodeURIComponent(text.toLowerCase().replace(/\s+/g, '-'))

  return (
    <nav className={styles.navbar}>
      <div className={styles.fullWidthContainer}>
        <div className={styles.contentContainer}>
          <ul className={styles.mainMenu}>
            {Object.keys(categories).map((category) => (
              <li
                key={category}
                className={styles.menuItem}
                onMouseEnter={() => setHoveredCategory(category)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <span className={styles.menuLink}>
                  {category}
                  <span className={styles.menuIcon}>⌄</span>
                </span>

                {hoveredCategory === category && (
                  <div className={styles.submenu}>
                    <div className={styles.submenuInner}>
                      {categories[category].map((subcategory) => (
                        <Link
                          key={subcategory}
                          href={`/category/${formatSlug(category)}?subcategory=${formatSlug(subcategory)}`}
                          className={styles.submenuLink}
                        >
                          <span className={styles.submenuIcon}>→</span>
                          {subcategory}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
