// app/listings/[id]/page.tsx
'use client'

import { useParams } from 'next/navigation'


export default function ListingPage() {
  const params = useParams()
  const id = params.id 

  return (
    <div >
      <h1>Страница объекта {id}</h1>
      <p>Здесь будет детальная информация об объекте</p>
    </div>
  )
}