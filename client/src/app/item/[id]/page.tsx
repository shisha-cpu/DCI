'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit'
import styles from './ItemPage.module.css'

export default function ItemPage() {
  const { id } = useParams()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeVideo, setActiveVideo] = useState(0)
  
  const { speak } = useSpeechSynthesis()

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings/${id}`)
        if (!response.ok) throw new Error('Ошибка загрузки объявления')
        const data = await response.json()
        setListing(data.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchListing()
  }, [id])

  const handleSpeak = () => {
    if (listing?.description) {
      speak({ text: listing.description })
    }
  }

  if (loading) return <div className={styles.loading}>Загрузка...</div>
  if (error) return <div className={styles.error}>{error}</div>
  if (!listing) return <div className={styles.notFound}>Объявление не найдено</div>
console.log(listing);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainContent}>
        <h1 className={styles.title}>{listing.title}</h1>
        
        <div className={styles.gallery}>
  {listing.images?.map((image, index) => (
    <div key={index} className={styles.imageWrapper}>
      <img
        src={`${process.env.NEXT_PUBLIC_IMG_URL}${image.path}`}
        alt={`Фото ${index + 1}`}
        className={styles.image}
      />
      {/* 4 логотипа */}
      <div className={`${styles.watermarkIcon} ${styles.pos1}`}></div>
      <div className={`${styles.watermarkIcon} ${styles.pos2}`}></div>
      <div className={`${styles.watermarkIcon} ${styles.pos3}`}></div>
      <div className={`${styles.watermarkIcon} ${styles.pos4}`}></div>
    </div>
  ))}
</div>


        <div className={styles.details}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Описание</h2>
            <p className={styles.description}>{listing.description}</p>
            <button onClick={handleSpeak} className={styles.speakButton}>
              <span className={styles.speakIcon}>🔊</span> Озвучить описание
            </button>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Характеристики</h2>
            <div className={styles.featuresGrid}>
              <div className={styles.featureRow}>
                <span className={styles.featureLabel}>Категория:</span>
                <span className={styles.featureValue}>{listing.category}</span>
              </div>
              <div className={styles.featureRow}>
                <span className={styles.featureLabel}>Подкатегория:</span>
                <span className={styles.featureValue}>{listing.subcategory}</span>
              </div>
              <div className={styles.featureRow}>
                <span className={styles.featureLabel}>Город:</span>
                <span className={styles.featureValue}>{listing.location?.city}</span>
              </div>
              <div className={styles.featureRow}>
                <span className={styles.featureLabel}>Адрес:</span>
                <span className={styles.featureValue}>{listing.location?.address}</span>
              </div>
            </div>
          </div>

          {listing.videos?.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Видео ({listing.videos.length})</h2>
              <div className={styles.videosContainer}>
                <div className={styles.mainVideo}>
                  <video 
                    controls 
                    className={styles.videoPlayer}
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}${listing.videos[activeVideo].path}`}
                  >
                    Ваш браузер не поддерживает видео тег.
                  </video>
                </div>
                
                {listing.videos.length > 1 && (
                  <div className={styles.videoThumbnails}>
                    {listing.videos.map((video, index) => (
                      <div 
                        key={index}
                        className={`${styles.thumbnail} ${activeVideo === index ? styles.active : ''}`}
                        onClick={() => setActiveVideo(index)}
                      >
                        <video 
                          muted
                          className={styles.thumbnailVideo}
                          src={`${process.env.NEXT_PUBLIC_IMG_URL}${video.path}`}
                        />
                        <div className={styles.thumbnailOverlay}>
                          <span className={styles.playIcon}>▶</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {listing.documents?.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Документы</h2>
              <div className={styles.documentsList}>
                {listing.documents.map((doc, index) => (
                  <a 
                    key={index}
                    href={`${process.env.NEXT_PUBLIC_IMG_URL}${doc.path}`}
                    download
                    className={styles.documentLink}
                  >
                    📄 {doc.originalname}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.sidebar}>
        <div className={styles.ownerCard}>
          <h3 className={styles.ownerTitle}>Собственник</h3>
          <div className={styles.ownerInfo}>
            <div className={styles.ownerAvatar}>
              {listing.createBy?.name?.charAt(0) || 'А'}
            </div>
            <div className={styles.ownerDetails}>
              <p className={styles.ownerName}>{listing.createdBy?.name || 'Аноним'}</p>
              {/* <p className={styles.ownerSince}>На сайте с {new Date(listing.owner?.createdAt).toLocaleDateString()}</p> */}
            </div>
          </div>

          <div className={styles.contactSection}>
      
            <div className={styles.contactButtons}>
              <button className={styles.phoneButton}>
                Связаться с собственником
              </button>
    
            </div>
          </div>


        </div>


      </div>
    </div>
  )
}