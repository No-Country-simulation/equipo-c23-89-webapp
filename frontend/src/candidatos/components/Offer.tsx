import { Offer as OfferType } from '@/recruiter/types/offer'
import { IoIosArrowForward } from 'react-icons/io'

interface OfferInfoProps {
  offer: OfferType
}

export const Offer = ({ offer }: OfferInfoProps) => {
  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const year = date.getUTCFullYear()

    return `${day}/${month}/${year}`
  }

  return (
    <article className='relative bg-secondary rounded-xl flex justify-between items-center pl-5 pr-20 pt-10 pb-[72px] gap-5 cursor-pointer hover:bg-secondary/70 transition-all duration-300 group'>
      <div className='flex items-center justify-start w-full gap-5'>
        <div className='w-32'>
          <img src="https://media.magneto365.com/image_assets/files/100969/original-07667a75-eade-41d6-8663-8aced564738e-.png?Expires=1737935999&Key-Pair-Id=KYGE9B84R3EDO&Signature=tZ-Hd8gFCuX8hwQBCVTwBRYAY0BnlhKEvkbVm5OSUddRxBDty4pW6ZhRVUuUfpySRm33hdCPpscQbvAb6rPpcXx2s2ZIbu3LpVLIA~qMGs39SqbTayxobrKi3QzNSsElLWZgLkRaYYFtw4K7Q7HX5wycUdDCkIDPXJGkCM1WMxO9LAgQBNvYOdcVADp27vf6rcMG1Ye1R4L3TOFB1ZAQ1qzc5q~R2usZseaZt-cMnxLvivxPa7qw5fOMC3IDTEypd82X-1sFWA2pOuhRknVYNiEthp6yw4EeQ58IsZDP6XNVOdFr-LDKim6YSEhMuJvRurpDLrxPIkU-6BFJOlDbZQ__" alt="" className='w-full' />
        </div>
        <div className='flex flex-col items-start justify-between w-full'>
          <span className='text-xl text-left font-bold text-ellipsis overflow-hidden whitespace-nowrap w-[370px]'>{offer.titulo}</span>
          <span className='text-ellipsis text-left overflow-hidden whitespace-nowrap w-[370px] -mt-1 font-semibold'>ACTUANDO SAS</span>
          <span className='text-ellipsis text-left overflow-hidden whitespace-nowrap w-[370px] -mt-1 mb-2'>{offer.ubicacion}</span>
          <span className='text-sm text-left text-ellipsis overflow-hidden whitespace-nowrap w-[370px] italic font-semibold'>{formatDate(offer.fecha_publicacion.toString())}</span>
        </div>
      </div>
      <div className='flex items-end justify-end w-3/6 h-full'>
        <span className='text-right text-gray-600 line-clamp-3'>{offer.descripcion}</span>...
      </div>
      <div className='absolute right-5 top-[40%] opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-5 group-hover:translate-x-0'>
        <IoIosArrowForward className='text-4xl text-primary' />
      </div>
      <div className='absolute flex items-center justify-center gap-2 bottom-4 right-5'>
        <span className='italic font-semibold'>Salario:</span>
        <span className='px-3 py-1 text-xl italic font-bold bg-white border border-primary rounded-xl'>$ {offer.salario}</span>
      </div>
    </article>
  )
}
