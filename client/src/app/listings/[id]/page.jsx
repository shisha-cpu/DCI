import Image from 'next/image'
import Link from 'next/link'

async function getListing(id) {
  const res = await fetch(`${process.env.API_URL}/api/listings/${id}`)
  if (!res.ok) throw new Error('Failed to fetch listing')
  return res.json()
}

export default async function ListingPage({ params }) {
  const { data: listing } = await getListing(params.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/catalog" className="text-green-600 hover:underline">
          ← Назад к каталогу
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
          <div className="lg:col-span-2">
            {listing.images?.[0] && (
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src={`${process.env.API_URL}/${listing.images[0].path}`}
                  alt={listing.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {listing.images?.slice(1, 5).map((image, index) => (
              <div key={index} className="relative h-44 rounded-lg overflow-hidden">
                <Image
                  src={`${process.env.API_URL}/${image.path}`}
                  alt={`${listing.title} - фото ${index + 2}`}
                  fill
                  className="object-cover"
                />
                {index === 3 && listing.images.length > 5 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold">
                    +{listing.images.length - 5}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <h1 className="text-2xl font-bold mb-2">{listing.title}</h1>
              <p className="text-gray-600 mb-4">{listing.location.address}</p>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-bold text-green-700">
                  {listing.price.toLocaleString()} ₽
                </span>
                {listing.area && (
                  <span className="text-gray-600">{listing.area} м²</span>
                )}
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Описание</h2>
                <p className="text-gray-700 whitespace-pre-line">{listing.description}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Характеристики</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-600">Тип объекта</span>
                    <p className="font-medium">
                      {listing.type === 'residential' ? 'Жилая недвижимость' : 
                       listing.type === 'commercial' ? 'Коммерческая недвижимость' : 
                       listing.type === 'land' ? 'Земельный участок' : 'Готовый бизнес'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Город</span>
                    <p className="font-medium">{listing.location.city}</p>
                  </div>
                  {listing.rooms && (
                    <div>
                      <span className="text-gray-600">Комнат</span>
                      <p className="font-medium">{listing.rooms}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-600">Просмотров</span>
                    <p className="font-medium">{listing.views}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-green-50 rounded-lg p-6 sticky top-4">
                <h3 className="text-lg font-semibold mb-4">Оставить заявку</h3>
                <form className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Ваше имя" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Email" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <input 
                      type="tel" 
                      placeholder="Телефон" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
                  >
                    Отправить заявку
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-green-200">
                  <h3 className="text-lg font-semibold mb-2">Контакты</h3>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Компания:</span> {listing.createdBy?.company || 'GreenInvest'}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Контактное лицо:</span> {listing.createdBy?.name}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Телефон:</span> +7 (XXX) XXX-XX-XX
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}