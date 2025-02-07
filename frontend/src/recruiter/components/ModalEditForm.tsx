import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useState } from 'react'
import { type Offer as OfferType } from '../types/offer'
import { FaPencil } from 'react-icons/fa6'
import { EditOfferForm } from './EditOfferFom'

interface ModalEditOfferFormProps {
  offers: OfferType[]
  offer: OfferType
  setOffers: any
}

export const ModalEditOfferForm = ({ offers, offer, setOffers }: ModalEditOfferFormProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className='flex items-center justify-center w-full gap-2 px-8 py-3 font-semibold text-white transition-all duration-300 rounded-md bg-primary hover:brightness-110'>
          <div className='text-2xl'>
            <FaPencil />
          </div>
          Editar oferta
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] bg-secondary">
        <DialogHeader className='px-3'>
          <DialogTitle className='text-3xl font-bold'>Editar <span className='text-primary'>Oferta</span></DialogTitle>
          <DialogDescription>
            Completa todos los campos para editar la oferta.
          </DialogDescription>
        </DialogHeader>
        <section className='max-h-[75vh] overflow-y-auto px-3'>
          <EditOfferForm
            offers={offers}
            offer={offer}
            setOffers={setOffers}
            setOpen={setOpen}
          />
        </section>
      </DialogContent>
    </Dialog>
  )
}
