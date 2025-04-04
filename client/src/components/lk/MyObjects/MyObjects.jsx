'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import styles from './MyObjects.module.css'
import { FiPlus, FiX, FiTrash2, FiEdit2, FiChevronDown } from 'react-icons/fi'

export default function MyObjects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [listings, setListings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'business',
    category: '',
    subcategory: '',
    price: 0,
    location: {
      city: '',
      district: '',
      address: ''
    },
    area: 0,
    rooms: 0,
    features: []
  })

  const router = useRouter()
  const user = useSelector(state => state.user)
  
  const filters = [
    { id: 'all', label: 'Все' },
    { id: 'published', label: 'Опубликовано' },
    { id: 'moderation', label: 'На модерации' },
    { id: 'needs_edit', label: 'Требует правок' },
    { id: 'inactive', label: 'Не активно' }
  ]

  // Загрузка объявлений пользователя
  useEffect(() => {
    const fetchUserListings = async () => {
      if (user?.user?._id) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/listings/user/${user.user._id}`)
          if (!response.ok) throw new Error('Ошибка загрузки')
          const data = await response.json()
          setListings(data.data)
        } catch (error) {
          console.error('Error:', error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchUserListings()
  }, [user])

  // Удаление объявления
  const handleDeleteListing = async (listingId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/listings/${listingId}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Ошибка удаления')

      setListings(listings.filter(listing => listing._id !== listingId))
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // Создание объявления
  const handleCreateListing = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/listings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          createdBy: user.user._id,
          status: 'pending'
        })
      })

      if (!response.ok) throw new Error('Ошибка создания')

      const data = await response.json()
      setListings([...listings, data])
      setIsModalOpen(false)
      resetForm()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // Сброс формы
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'business',
      category: '',
      subcategory: '',
      price: 0,
      location: {
        city: '',
        district: '',
        address: ''
      },
      area: 0,
      rooms: 0,
      features: []
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleLocationChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      location: { ...prev.location, [name]: value }
    }))
  }

  const filteredListings = listings.filter(listing => 
    activeFilter === 'all' || listing.status === activeFilter
  )

  return (
    <div className={styles.container}>
      {/* Хедер */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Мои объекты</h1>
          <p className={styles.subtitle}>Управление вашими объявлениями</p>
        </div>
        <button 
          className={styles.primaryButton}
          onClick={() => setIsModalOpen(true)}
        >
          <FiPlus size={18} />
          Добавить объект
        </button>
      </div>

      {/* Фильтры */}
      <div className={styles.filters}>
        {filters.map(filter => (
          <button
            key={filter.id}
            className={`${styles.filterButton} ${activeFilter === filter.id ? styles.active : ''}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Контент */}
      {isLoading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Загрузка данных...</p>
        </div>
      ) : filteredListings.length > 0 ? (
        <div className={styles.grid}>
          {filteredListings.map(listing => (
            <div key={listing._id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>{listing.title}</h3>
                <div className={styles.actions}>
                  <button className={styles.editButton}>
                    <FiEdit2 size={16} />
                  </button>
                  <button 
                    className={styles.deleteButton}
                    onClick={() => handleDeleteListing(listing._id)}
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
              <p className={styles.description}>{listing.description}</p>
              
              <div className={styles.details}>
                <div className={styles.detailItem}>
                  <span>Цена:</span>
                  {/* <strong>{listing.price.toLocaleString()} ₽</strong> */}
                </div>
                <div className={styles.detailItem}>
                  <span>Город:</span>
                  <strong>{listing.location?.city || 'Не указан'}</strong>
                </div>
                <div className={styles.detailItem}>
                  <span>Статус:</span>
                  <span className={`${styles.status} ${styles[listing.status]}`}>
                    {getStatusLabel(listing.status)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIllustration}>
            <svg width="160" height="160" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M4 6V5C4 3.89543 4.89543 3 6 3H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M16 3H18C19.1046 3 20 3.89543 20 5V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M8 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M8 14H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h3>Нет объявлений</h3>
          <p>У вас пока нет активных объявлений</p>
          <button 
            className={styles.primaryButton}
            onClick={() => setIsModalOpen(true)}
          >
            <FiPlus size={18} />
            Создать первое объявление
          </button>
        </div>
      )}

      {/* Модальное окно */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Новое объявление</h2>
              <button 
                className={styles.closeButton}
                onClick={() => {
                  setIsModalOpen(false)
                  resetForm()
                }}
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleCreateListing} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Название бизнеса *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Кафе 'Уют'"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Тип бизнеса *</label>
                  <div className={styles.selectWrapper}>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="business">Готовый бизнес</option>
                      <option value="franchise">Франшиза</option>
                      <option value="commercial">Коммерческая недвижимость</option>
                    </select>
                    <FiChevronDown className={styles.selectArrow} />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Категория *</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Общепит"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Цена, ₽ *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="1000000"
                    min="0"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Город *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.location.city}
                    onChange={handleLocationChange}
                    placeholder="Москва"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Адрес</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.location.address}
                    onChange={handleLocationChange}
                    placeholder="ул. Примерная, 123"
                  />
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Описание *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Подробное описание вашего бизнеса..."
                    rows="4"
                    required
                  />
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => {
                    setIsModalOpen(false)
                    resetForm()
                  }}
                >
                  Отменить
                </button>
                <button
                  type="submit"
                  className={styles.primaryButton}
                >
                  Создать объявление
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function getStatusLabel(status) {
  const statusLabels = {
    published: 'Опубликовано',
    moderation: 'На модерации',
    needs_edit: 'Требует правок',
    inactive: 'Не активно',
    pending: 'В обработке'
  }
  return statusLabels[status] || status
}