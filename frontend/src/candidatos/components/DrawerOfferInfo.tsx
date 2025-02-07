import { IoPushSharp } from 'react-icons/io5'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { Offer } from './Offer'
import { Offer as OfferType } from '@/recruiter/types/offer'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { useEffect, useState } from 'react'
import { useCandidatesPostulates } from '@/recruiter/hooks/useCandidatosPostulados'
import { useUsers } from '@/recruiter/hooks/useUsers'
import { useCandidates } from '@/recruiter/hooks/useCandidates'
import { Candidate } from '@/recruiter/types/candidate'
import api from '@/lib/api'

interface DrawerOfferInfoProps {
  offer: OfferType
}

export const DrawerOfferInfo = ({ offer }: DrawerOfferInfoProps) => {
  const [candidateInfo, setCandidateInfo] = useState<Candidate | undefined>(undefined)
  const [isPostulate, setIsPostulate] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { storedValue } = useLocalStorage<{ email: string, role: string } | null>('user', null)
  const { candidatesPostulates } = useCandidatesPostulates({ idOferta: Number(offer.id_oferta) })
  const { users } = useUsers()
  const { candidates } = useCandidates()
  const navigate = useNavigate()
  const { toast } = useToast()

  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const year = date.getUTCFullYear()

    return `${day}/${month}/${year}`
  }

  useEffect(() => {
    const user = users.find(user => user.email === storedValue?.email)
    const candidateUser = candidates.find(candidate => candidate.user.id === user?.id)
    const candidateUserPostulate = candidatesPostulates.find(candidate => candidate.candidato === candidateUser?.id)

    if (candidateUserPostulate !== undefined) setIsPostulate(true)
    if (candidateUser !== undefined) setCandidateInfo(candidateUser)
  }, [users, candidates, candidatesPostulates])

  const handleAplicacion = async () => {
    if (storedValue?.role === undefined) navigate('/sign-in')

    try {
      setIsLoading(true)

      const response = await api.post('/aplicaciones/aplicaciones/', {
        candidato: candidateInfo?.id,
        fecha_aplicacion: new Date().toISOString(),
        estado: 'applied',
        oferta: offer.id_oferta
      })

      if (response.status === 201) {
        setIsPostulate(true)
        toast({
          description: '¡Postulación exitosamente!'
        })
      }
    } catch (error: any) {
      toast({
        title: '¡Oh no!, ocurrió un error',
        description: '¡No se pudo postular correctamente!'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button>
          <Offer offer={offer} />
        </button>
      </DrawerTrigger>
      <DrawerContent className='bg-accent'>
        <DrawerTitle></DrawerTitle>
        <div className="mx-56 my-5 rounded-xl bg-secondary">
          <div className="flex gap-8 p-7 min-h-[320px]">
            <div className='w-[20%]'>
              <img src="https://media.magneto365.com/image_assets/files/100969/original-07667a75-eade-41d6-8663-8aced564738e-.png?Expires=1737935999&Key-Pair-Id=KYGE9B84R3EDO&Signature=tZ-Hd8gFCuX8hwQBCVTwBRYAY0BnlhKEvkbVm5OSUddRxBDty4pW6ZhRVUuUfpySRm33hdCPpscQbvAb6rPpcXx2s2ZIbu3LpVLIA~qMGs39SqbTayxobrKi3QzNSsElLWZgLkRaYYFtw4K7Q7HX5wycUdDCkIDPXJGkCM1WMxO9LAgQBNvYOdcVADp27vf6rcMG1Ye1R4L3TOFB1ZAQ1qzc5q~R2usZseaZt-cMnxLvivxPa7qw5fOMC3IDTEypd82X-1sFWA2pOuhRknVYNiEthp6yw4EeQ58IsZDP6XNVOdFr-LDKim6YSEhMuJvRurpDLrxPIkU-6BFJOlDbZQ__" alt="" className='object-cover w-full h-full' />
            </div>
            <div className='flex flex-col w-4/5 h-full'>
              <div className='flex items-center justify-between w-full gap-5 mb-1'>
                <span className='text-3xl font-bold'>{offer.titulo}</span>
                <span className='text-xl font-bold'>{formatDate(offer.fecha_publicacion.toString())}</span>
              </div>
              <p className='text-lg font-semibold'>ACTUANDO SAS</p>
              <p className='font-semibold'>{offer.ubicacion}</p>
              <div className='flex flex-col justify-between h-full'>
                <p className='my-5 pr-12 h-[110px] overflow-y-auto'>{offer.descripcion}</p>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center justify-center gap-2'>
                    <span className='italic font-semibold'>Salario:</span>
                    <span className='px-3 py-1 text-xl italic font-bold bg-white border border-primary rounded-xl'>$ {offer.salario}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DrawerFooter className='p-6'>
            <button className={`flex items-center justify-center w-full gap-2 px-8 py-3 font-semibold text-white transition-all duration-300 rounded-md bg-primary hover:brightness-110 ${isPostulate && 'opacity-60 cursor-not-allowed'}`} onClick={handleAplicacion} disabled={isPostulate}>
              {
                !isLoading && (
                  <div className='text-2xl'>
                    <IoPushSharp />
                  </div>
                )
              }
              {
                isPostulate ? 'Ya te postulaste' : isLoading ? 'Cargando...' : 'Aplicar a la vacante'
              }
            </button>
            <DrawerClose asChild>
              <button className='flex items-center justify-center w-full gap-2 px-8 py-3 font-semibold transition-all duration-300 border rounded-md bg-background border-primary hover:bg-gray-100'>
                Cancelar
              </button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
