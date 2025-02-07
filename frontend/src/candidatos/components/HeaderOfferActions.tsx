import { FaSearch } from 'react-icons/fa'
import { type Offer } from '@/recruiter/types/offer'

interface HeaderOfferActionsProps {
  allOffers: Offer[]
  setAllOffers: any
}

export const HeaderOfferActions = ({ allOffers, setAllOffers }: HeaderOfferActionsProps) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase()
    const filteredOffers = allOffers.filter(offer => offer.titulo.toLowerCase().includes(search))
    setAllOffers(filteredOffers)
  }

  return (
    <div className='flex items-center justify-between gap-5 mb-5'>
      <div className="relative w-full">
        <input type="text" placeholder="Buscar oferta" className="w-full px-4 py-3 text-black placeholder-gray-600 rounded-md bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50" onChange={handleSearch} />
        <div className='absolute top-0 right-0 flex items-center justify-center h-full gap-2 px-4 py-3 font-semibold text-white bg-primary rounded-tr-md rounded-br-md'>
          <div className='text-xl'>
            <FaSearch />
          </div>
        </div>
      </div>
    </div>
  )
}
