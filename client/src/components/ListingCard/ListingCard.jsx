import Link from 'next/link'
import Image from 'next/image'

export default function ListingCard({ listing }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        {listing.images?.[0] ? (
          <Image
            src={`${process.env.API_URL}/${listing.images[0].path}`}
            alt={listing.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="bg-green-100 h-full flex items-center justify-center">
            <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-sm">
          {listing.type === 'residential' ? 'Жилая' : 
           listing.type === 'commercial' ? 'Коммерческая' : 
           listing.type === 'land' ? 'Земля' : 'Бизнес'}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 truncate">{listing.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{listing.location.city}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-green-700">{listing.price.toLocaleString()} ₽</span>
          <span className="text-sm text-gray-500">{listing.area} м²</span>
        </div>
        <Link 
          href={`/listings/${listing._id}`} 
          className="block w-full bg-green-100 hover:bg-green-200 text-green-800 text-center py-2 rounded transition-colors"
        >
          Подробнее
        </Link>
      </div>
    </div>
  )
}