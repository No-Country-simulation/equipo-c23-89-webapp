import LayoutRecruiter from '../layout/LayoutRecruiter'
import { useNavigate, useParams } from 'react-router-dom'
import { FaUserGroup } from 'react-icons/fa6'
import { CandidatesTabs } from '../components/CandidatesTabs'
import { PiBagFill } from 'react-icons/pi'
import { useOffers } from '../hooks/useOffers'
import { useEffect, useState } from 'react'
import { type Offer } from '../types/offer'
import { OFFER_INITIAL_VALUES } from '../initial-values/offer'
import { useCandidatesPostulates } from '../hooks/useCandidatosPostulados'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useRecruiter } from '../hooks/useRecruiter'

export default function CandidatesOfferRecruiter () {
  const { offerId } = useParams()
  const { storedValue } = useLocalStorage<{ email: string, role: string } | null>('user', null)
  const { recruiter } = useRecruiter({ email: storedValue?.email || '' })
  const { offers } = useOffers({ idReclutador: recruiter?.id || 0 })
  const { candidatesPostulates, loadingCandidatesPostulates } = useCandidatesPostulates({ idOferta: Number(offerId) })
  const [offer, setOffer] = useState<Offer>(OFFER_INITIAL_VALUES)
  const navigate = useNavigate()

  useEffect(() => {
    if (storedValue?.role === 'admin') navigate('/admin')
    else if (storedValue?.role === 'candidate' || storedValue === null) navigate('/')
  }, [storedValue?.role])

  useEffect(() => {
    const offer = offers.find(offer => offer.id_oferta === Number(offerId))

    if (offer !== undefined) setOffer(offer)
    else navigate('/recruiter/home')
  }, [offerId, offers])

  return (
    <LayoutRecruiter>
      <main className='flex gap-6 py-24 mx-56'>
        <section className='w-full bg-accent rounded-xl p-7'>
          <div className='flex items-center justify-between px-3 mb-6 rounded-md bg-secondary'>
            <h2 className='text-[40px] font-extrabold'>Candidatos <span className='text-primary'>Postulados</span></h2>
            <div className='text-4xl text-primary'>
              <FaUserGroup />
            </div>
          </div>
          <div className='flex flex-col px-3 pt-3 pb-6 mb-6 rounded-md bg-secondary'>
            <div className='flex items-center justify-between gap-5'>
              <h3 className='text-[28px] font-extrabold'>{offer.titulo}</h3>
              <div className='text-4xl text-primary'>
                <PiBagFill />
              </div>
            </div>
            <p className='pr-16 mt-2 overflow-y-auto max-h-56'>{offer.descripcion}</p>
          </div>
          <div className='w-full gap-5'>
            {
              loadingCandidatesPostulates
                ? (
                  <div role="status" className='flex items-center justify-center w-full py-10'>
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
                  )
                : (
                    <CandidatesTabs
                      candidatesPostulates={candidatesPostulates}
                    />
                  )
            }
          </div>
        </section>
      </main>
    </LayoutRecruiter>
  )
}
