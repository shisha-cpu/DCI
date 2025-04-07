'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import styles from './MyObjects.module.css'
import { FiPlus, FiX, FiTrash2, FiEdit2, FiChevronDown, FiImage, FiUpload, FiFile, FiDownload } from 'react-icons/fi'

export default function MyObjects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [listings, setListings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadType, setUploadType] = useState('images') // 'images' или 'documents'
  const [uploadProgress, setUploadProgress] = useState(0)
  const [images, setImages] = useState([])
  const [documents, setDocuments] = useState([])
  const imageInputRef = useRef(null)
  const documentInputRef = useRef(null)
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const allCategories = {
    'Коммерческая недвижимость': [
      { name: 'Торговый центр (здание)' },
      { name: 'Торговое помещение / магазин' },
      { name: 'Рынок / оптовая база' },
      { name: 'Офисный центр (здание)' },
      { name: 'Офисное помещение' },
      { name: 'Складской комплекс' },
      { name: 'Складское помещение' },
      { name: 'Гостиница' },
      { name: 'Хостел' },
      { name: 'Спортивно-оздоровительный комплекс' },
      { name: 'Автосервис' },
      { name: 'Автосалон' },
      { name: 'АЗС' },
      { name: 'Помещение свободного назначения' },
      { name: 'Здание свободного назначения' }
    ],
    'Жилая недвижимость': [
      { name: 'Квартира' },
      { name: 'Комната' },
      { name: 'Частный дом / коттедж' },
      { name: 'Таунхаус' },
      { name: 'Многоквартирный жилой комплекс' }
    ],
    'Земельные участки': [
      { name: 'Земля под ИЖС' },
      { name: 'Земельный участок под коммерческую застройку' }
    ],
    'Производство': [
      { name: 'Деревоперерабатывающее предприятие' },
      { name: 'Металлообрабатывающее предприятие' },
      { name: 'Пищевое производство' },
      { name: 'Производство строительных материалов' },
      { name: 'Текстильное производство' },
      { name: 'Химическое производство' }
    ],
    'Сельхоз активы': [
      { name: 'Птицефабрика' },
      { name: 'Животноводческий комплекс' },
      { name: 'Тепличный комплекс' },
      { name: 'Зерновое хозяйство' },
      { name: 'Элеватор' },
      { name: 'Сад / виноградник' }
    ],
    'Рестораны и развлечения': [
      { name: 'Ресторан/бар/кафе' },
      { name: 'Развлекательный комплекс' }
    ],
    'Спецтехника и транспорт': [
      { name: 'Грузовики и прицепы' },
      { name: 'Строительная техника' },
      { name: 'Сельхоз техника' },
      { name: 'Автобусы' },
      { name: 'Водный транспорт' }
    ],
    'Финансовые активы': [
      { name: 'Ценные бумаги' },
      { name: 'Дебиторская задолженность' },
      { name: 'Нематериальные активы' }
    ]
  }

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

  const getDocumentIcon = (mimetype) => {
    if (mimetype.includes('pdf')) return '/icons/pdf-icon.png';
    if (mimetype.includes('word') || mimetype.includes('msword') || mimetype.includes('document')) 
      return '/icons/word-icon.png';
    if (mimetype.includes('powerpoint') || mimetype.includes('presentation')) 
      return '/icons/ppt-icon.png';
    return '/icons/file-icon.png';
  }

  const handleFileChange = async (e, type) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
  
    setUploading(true);
    setUploadType(type);
    setUploadProgress(0);
  
    const formData = new FormData();
    const endpoint = type === 'images' 
      ? '/listings/upload' 
      : '/listings/upload-documents';
    
    files.forEach(file => {
      formData.append(type === 'images' ? 'images' : 'documents', file);
    });
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
  
      if (!response.ok) {
        throw new Error(await response.text());
      }
  
      const result = await response.json();
      
      if (type === 'images') {
        const uploadedImages = result.data || result;
        setImages(prev => [
          ...prev, 
          ...uploadedImages.map(img => ({
            path: img.path,
            originalname: img.originalname || img.filename,
            mimetype: img.mimetype
          }))
        ]);
      } else {
        const uploadedDocs = result.data || result;
        setDocuments(prev => [
          ...prev,
          ...uploadedDocs.map(doc => ({
            path: doc.path,
            originalname: doc.originalname || doc.filename,
            mimetype: doc.mimetype
          }))
        ]);
      }
      
    } catch (error) {
      console.error('Error uploading files:', error);
      alert(`Ошибка загрузки ${type === 'images' ? 'изображений' : 'документов'}: ${error.message}`);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemoveImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleRemoveDocument = (index) => {
    setDocuments(prev => prev.filter((_, i) => i !== index))
  }

  const handleCreateListing = async (e) => {
    e.preventDefault();
    try {
      const imagesToSend = images.map(img => {
        if (typeof img === 'string') {
          const filename = img.split('/').pop();
          return {
            path: `/uploads/listings/${filename}`,
            originalname: filename,
            mimetype: 'image/jpeg'
          };
        }
        return img;
      });

      const documentsToSend = documents.map(doc => {
        if (typeof doc === 'string') {
          const filename = doc.split('/').pop();
          return {
            path: `/uploads/listings/${filename}`,
            originalname: filename,
            mimetype: 'application/octet-stream'
          };
        }
        return doc;
      });
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          ...formData,
          category: selectedCategory,
          subcategory: selectedSubcategory,
          images: imagesToSend,
          documents: documentsToSend,
          createdBy: user.user._id,
          status: 'pending'
        })
      });
  
      if (!response.ok) throw new Error('Ошибка создания');
  
      const data = await response.json();
      setListings([...listings, data]);
      setIsModalOpen(false);
      resetForm();
      setImages([]);
      setDocuments([]);
    } catch (error) {
      console.error('Error:', error);
      alert('Ошибка при создании объявления: ' + error.message);
    }
  };

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

  const handleDeleteListing = async (listingId) => {
    if (!window.confirm('Вы уверены, что хотите удалить это объявление?')) {
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/listings/${listingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        throw new Error('Ошибка удаления объявления');
      }

      setListings(prev => prev.filter(listing => listing._id !== listingId));
      alert('Объявление успешно удалено');
    } catch (error) {
      console.error('Error deleting listing:', error);
      alert('Ошибка при удалении объявления: ' + error.message);
    }
  };
console.log(listings);

  return (
    <div className={styles.container}>
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
              
              {listing.images?.length > 0 && (
                <div className={styles.imagePreview}>
                  <img 
                    src={`${process.env.NEXT_PUBLIC_IMG_URL || 'http://localhost:5000'}${listing.images[0].path}`} 
                    alt={listing.title}
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />
                </div>
              )} 
              <p className={styles.description}>{listing.description}</p>
              
              <div className={styles.details}>
                <div className={styles.detailItem}>
                  <span>Цена:</span>
                  <strong>{listing.price} ₽</strong>
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
                  setImages([])
                  setDocuments([])
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
                  <label>Категория *</label>
                  <select
                    name="category"
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setSelectedSubcategory('');
                    }}
                    required
                  >
                    <option value="">Выберите категорию</option>
                    {Object.keys(allCategories).map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Подкатегория *</label>
                  <select
                    name="subcategory"
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    required
                    disabled={!selectedCategory}
                  >
                    <option value="">Выберите подкатегорию</option>
                    {selectedCategory && allCategories[selectedCategory].map((subcategory) => (
                      <option key={subcategory.name} value={subcategory.name}>{subcategory.name}</option>
                    ))}
                  </select>
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

                {/* Блок загрузки изображений */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Фотографии объекта</label>
                  <div className={styles.uploadContainer}>
                    <div 
                      className={styles.uploadArea}
                      onClick={() => imageInputRef.current.click()}
                    >
                      <FiImage size={24} />
                      <p>Перетащите изображения сюда или нажмите для выбора</p>
                      <input
                        type="file"
                        ref={imageInputRef}
                        onChange={(e) => handleFileChange(e, 'images')}
                        multiple
                        accept="image/*"
                        style={{ display: 'none' }}
                      />
                    </div>
                    
                    {uploading && uploadType === 'images' && (
                      <div className={styles.progressBar}>
                        <div 
                          className={styles.progressFill} 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                        <span>{uploadProgress}%</span>
                      </div>
                    )}

                    <div className={styles.uploadedFiles}>
                      {images.map((img, index) => {
                        const imgUrl = typeof img === 'string' 
                          ? img 
                          : `${process.env.NEXT_PUBLIC_IMG_URL || 'http://localhost:5000'}${img.path}`;
                        
                        return (
                          <div key={index} className={styles.fileItem}>
                            <img 
                              src={imgUrl} 
                              alt={`Preview ${index}`}
                              onError={(e) => {
                                e.target.src = '/placeholder-image.jpg';
                              }}
                            />
                            <button 
                              type="button"
                              className={styles.removeFile}
                              onClick={() => handleRemoveImage(index)}
                            >
                              <FiX size={16} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Блок загрузки документов */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Документы (PDF, Word, PowerPoint)</label>
                  <div className={styles.uploadContainer}>
                    <div 
                      className={styles.uploadArea}
                      onClick={() => documentInputRef.current.click()}
                    >
                      <FiFile size={24} />
                      <p>Перетащите документы сюда или нажмите для выбора</p>
                      <input
                        type="file"
                        ref={documentInputRef}
                        onChange={(e) => handleFileChange(e, 'documents')}
                        multiple
                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                        style={{ display: 'none' }}
                      />
                    </div>
                    
                    {uploading && uploadType === 'documents' && (
                      <div className={styles.progressBar}>
                        <div 
                          className={styles.progressFill} 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                        <span>{uploadProgress}%</span>
                      </div>
                    )}

                    <div className={styles.uploadedDocs}>
                      {documents.map((doc, index) => {
                        const docUrl = typeof doc === 'string' 
                          ? doc 
                          : `${process.env.NEXT_PUBLIC_IMG_URL || 'http://localhost:5000'}${doc.path}`;
                        const docName = typeof doc === 'string' 
                          ? doc.split('/').pop() 
                          : doc.originalname;
                        
                        return (
                          <div key={index} className={styles.docItem}>
                            <div className={styles.docIcon}>
                              <img 
                                src={getDocumentIcon(doc.mimetype || '')} 
                                alt="Document type"
                                onError={(e) => {
                                  e.target.src = '/icons/file-icon.png';
                                }}
                              />
                            </div>
                            <div className={styles.docInfo}>
                              <span className={styles.docName}>{docName}</span>
                              <a 
                                href={docUrl} 
                                download
                                className={styles.downloadBtn}
                              >
                                <FiDownload size={14} />
                              </a>
                            </div>
                            <button 
                              type="button"
                              className={styles.removeDoc}
                              onClick={() => handleRemoveDocument(index)}
                            >
                              <FiX size={16} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
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
                    setImages([])
                    setDocuments([])
                  }}
                >
                  Отменить
                </button>
                <button
                  type="submit"
                  className={styles.primaryButton}
                  disabled={uploading}
                >
                  {uploading ? 'Загрузка...' : 'Создать объявление'}
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