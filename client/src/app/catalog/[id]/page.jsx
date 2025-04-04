import Link from 'next/link'
import ListingCard from '../../components/ListingCard'

async function getListings() {
  const res = await fetch(`${process.env.API_URL}/api/listings`)
  if (!res.ok) throw new Error('Failed to fetch listings')
  return res.json()
}

export default async function Catalog() {
  const { data: listings } = await getListings()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-800">Каталог объектов</h1>
        <Link 
          href="/account/listings/new" 
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
        >
          Добавить объект
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Тип объекта</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="">Все</option>
              <option value="residential">Жилая недвижимость</option>
              <option value="commercial">Коммерческая недвижимость</option>
              <option value="land">Земельные участки</option>
              <option value="business">Готовый бизнес</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Город</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="">Все</option>
              <option value="moscow">Москва</option>
              <option value="spb">Санкт-Петербург</option>
              <option value="sochi">Сочи</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Цена, ₽</label>
            <div className="flex gap-2">
              <input 
                type="number" 
                placeholder="От" 
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              <input 
                type="number" 
                placeholder="До" 
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
              Применить
            </button>
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map(listing => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  )
}