import { FaClipboardUser } from 'react-icons/fa6'
import { MdCheckCircle, MdSimCardDownload } from 'react-icons/md'
import { type Candidate } from '../types/candidate'
import { type Aplicacion } from '../types/aplicacion'
import { useCandidatesPostulates } from '../hooks/useCandidatosPostulados'
import { useEffect, useState } from 'react'
import { type User } from '../types/recruiter'
import { useNavigate } from 'react-router-dom'
import api from '@/lib/api'
import { useToast } from '@/hooks/use-toast'

interface CandidateInfoProps {
  offerId: number
  candidateInfo: Candidate | undefined
  candidateInfo2: User | undefined
}

export const CandidateInfo = ({ offerId, candidateInfo, candidateInfo2 }: CandidateInfoProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [candidate, setCandidate] = useState<Aplicacion | undefined>(undefined)
  const { candidatesPostulates } = useCandidatesPostulates({ idOferta: offerId })
  const { toast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    const candidatePostulate = candidatesPostulates.find(c => c.candidato === candidateInfo?.id)
    
    setCandidate(candidatePostulate)
  }, [candidatesPostulates])

  const formatDate = (isoString: string | undefined) => {
    if (!isoString) return ''

    const date = new Date(isoString)
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const year = date.getUTCFullYear()

    return `${day}/${month}/${year}`
  }

  const handleNextStep = async () => {
    try {
      setIsLoading(true)

      const newEstado = candidate?.estado === 'applied' ? 'viewed' : candidate?.estado === 'viewed' ? 'inProcess' : candidate?.estado === 'inProcess' ? 'finalist' : 'finalist'
      const response = await api.put(`/aplicaciones/aplicaciones/${candidate?.id_aplicacion}/`, {
        candidato: candidate?.candidato,
        estado: newEstado,
        oferta: candidate?.oferta
      })

      if (response.status === 200) {
        setCandidate(response.data)
        
        toast({
          description: '¡Estado del postulante actualizado exitosamente!'
        })
      }
    } catch (error: any) {
      toast({
        title: '¡Oh no!, ocurrió un error',
        description: '¡No se pudo actualizar el estado del postulante correctamente!'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex items-center gap-10 p-3'>
      <div className='w-[350px] h-[350px]'>
        <img src="https://www.creative-tim.com/twcomponents/storage/avatars/njkIbPhyZCftc4g9XbMWwVsa7aGVPajYLRXhEeoo.jpg" alt="" className='object-cover w-full h-full rounded-xl' />
      </div>
      <div className='flex flex-col flex-1'>
        <div className='flex items-center justify-between gap-5'>
          <h3 className='text-[30px] leading-8 font-extrabold'>{candidateInfo2?.first_name}</h3>
          <div className='text-4xl text-primary'>
            <FaClipboardUser />
          </div>
        </div>
        <span className='text-2xl font-semibold'>{candidateInfo2?.last_name}</span>
        <span className='text-xl font-semibold'>{candidateInfo?.educacion}</span>
        <span className='text-lg italic font-semibold'>{candidateInfo?.experiencia}</span>
        <div className='flex flex-col justify-end flex-1 mt-14'>
          <div className='flex items-center justify-between w-full gap-5'>
            <div className='flex items-center justify-start w-56 gap-2'>
              {
                candidate?.estado === 'applied' && (
                  <span className='bg-[url(/circle-progress.svg)] bg-left-top w-[90px] h-[90px] [background-size:950px] content-none'></span>
                )
              }
              {
                candidate?.estado === 'viewed' && (
                  <span className='bg-[url(/circle-progress.svg)] bg-[-90px_0px] w-[90px] h-[90px] [background-size:950px] content-none'></span>
                )
              }
              {
                candidate?.estado === 'inProcess' && (
                  <span className='bg-[url(/circle-progress.svg)] bg-[-185px_0px] w-[90px] h-[90px] [background-size:950px] content-none'></span>
                )
              }
              {
                candidate?.estado === 'finalist' && (
                  <span className='bg-[url(/circle-progress.svg)] bg-[-280px_0px] w-[90px] h-[90px] [background-size:950px] content-none'></span>
                )
              }
              <div className='flex flex-col'>
                <span className='text-xl font-bold'>
                  {
                    candidate?.estado === 'applied' && 'Aplicado'
                  }
                  {
                    candidate?.estado === 'viewed' && 'Visto'
                  }
                  {
                    candidate?.estado === 'inProcess' && 'En proceso'
                  }
                  {
                    candidate?.estado === 'finalist' && 'Finalista'
                  }
                </span>
                <span className='italic text-gray-700'>{formatDate(candidate?.fecha_aplicacion.toString())}</span>
              </div>
            </div>
            <div className='flex flex-col items-center justify-center gap-1 mr-3'>
              <span className='text-lg font-semibold'>Descargar CV</span>
              <button className='text-5xl transition-all duration-300 h-11 text-primary hover:text-[52px]'>
                <MdSimCardDownload />
              </button>
            </div>
          </div>
          <button className='flex items-center justify-center w-full gap-2 px-8 py-3 mt-5 font-semibold text-white transition-all duration-300 rounded-md bg-primary hover:brightness-110' onClick={handleNextStep}>
            {
              !isLoading && (
                <div className='text-2xl'>
                  <MdCheckCircle />
                </div>
              )
            }
            {isLoading ? 'Cargando...' : 'Avanzar a la siguiente etapa'}
          </button>
          <button className='flex items-center justify-center w-full gap-2 px-8 py-3 mt-2 font-semibold transition-all duration-300 border rounded-md bg-background border-primary hover:bg-gray-100' onClick={() => navigate(-1)}>
            Volver
          </button>
        </div>
      </div>
    </div>
  )
}
