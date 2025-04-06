// app/listings/[id]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import styles from '../../../app.module.css'

export default function ListingPage() {
  const params = useParams()
  const id = params.id 

  return (
    <div className={styles.container}>
      <h1>Страница объекта {id}</h1>
      <p>Здесь будет детальная информация об объекте</p>
    </div>
  )
}