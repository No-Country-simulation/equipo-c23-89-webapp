import { IoIosArrowForward } from 'react-icons/io'
import { type Aplicacion } from '../types/aplicacion'
import { useCandidates } from '../hooks/useCandidates'
import { useEffect, useState } from 'react'
import { type Candidate } from '../types/candidate'
import { useUsers } from '../hooks/useUsers'
import { type User } from '../types/recruiter'
import { useNavigate } from 'react-router-dom'

interface CandidateCardProps {
  offerId: number
  candidate: Aplicacion
}

export const CandidateCard = ({ offerId, candidate }: CandidateCardProps) => {
  const [candidateInfo, setCandidateInfo] = useState<Candidate | undefined>(undefined)
  const [candidateInfo2, setCandidateInfo2] = useState<User | undefined>(undefined)
  const { candidates } = useCandidates()
  const { users } = useUsers()
  const navigate = useNavigate()

  useEffect(() => {
    const candidateInfoCard = candidates.find(c => c.id === candidate.candidato)
    const candidateInfoCard2 = users.find(c => c.id === candidateInfoCard?.user.id)

    setCandidateInfo(candidateInfoCard)
    setCandidateInfo2(candidateInfoCard2)
  }, [candidates])

  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const year = date.getUTCFullYear()

    return `${day}/${month}/${year}`
  }

  const navigateToCandidateInfo = () => {
    navigate(`/recruiter/candidate/${offerId}/${candidate.candidato}`)
  }

  return (
    <article className='relative flex items-center justify-between gap-5 py-5 pl-5 pr-20 transition-all duration-300 cursor-pointer bg-secondary rounded-xl hover:bg-secondary/70 group' onClick={navigateToCandidateInfo}>
      <div className='flex items-center justify-start h-full gap-5'>
        <div className='h-32 w-52'>
          <img src="https://www.creative-tim.com/twcomponents/storage/avatars/njkIbPhyZCftc4g9XbMWwVsa7aGVPajYLRXhEeoo.jpg" alt="" className='object-cover w-full h-full rounded-xl' />
        </div>
        <div className='flex flex-col items-start justify-between w-full'>
          <span className='text-xl text-left font-bold text-ellipsis overflow-hidden whitespace-nowrap w-[370px]'>{candidateInfo2?.first_name}</span>
          <span className='text-ellipsis text-left overflow-hidden whitespace-nowrap w-[370px] -mt-1 font-semibold'>{candidateInfo2?.last_name}</span>
          <span className='text-ellipsis text-left overflow-hidden whitespace-nowrap w-[370px] -mt-1 mb-2'>{candidateInfo?.educacion}</span>
          <span className='text-sm text-left text-ellipsis overflow-hidden whitespace-nowrap w-[370px] italic font-semibold'>{candidateInfo?.experiencia}</span>
        </div>
      </div>
      <div className='flex items-center justify-start w-56 gap-2'>
        {
          candidate.estado === 'applied' && (
            <span className='bg-[url(/circle-progress.svg)] bg-left-top w-[90px] h-[90px] [background-size:950px] content-none'></span>
          )
        }
        {
          candidate.estado === 'viewed' && (
            <span className='bg-[url(/circle-progress.svg)] bg-[-90px_0px] w-[90px] h-[90px] [background-size:950px] content-none'></span>
          )
        }
        {
          candidate.estado === 'inProcess' && (
            <span className='bg-[url(/circle-progress.svg)] bg-[-185px_0px] w-[90px] h-[90px] [background-size:950px] content-none'></span>
          )
        }
        {
          candidate.estado === 'finalist' && (
            <span className='bg-[url(/circle-progress.svg)] bg-[-280px_0px] w-[90px] h-[90px] [background-size:950px] content-none'></span>
          )
        }
        <div className='flex flex-col'>
          <span className='text-xl font-bold'>
            {
              candidate.estado === 'applied' && 'Aplicado'
            }
            {
              candidate.estado === 'viewed' && 'Visto'
            }
            {
              candidate.estado === 'inProcess' && 'En proceso'
            }
            {
              candidate.estado === 'finalist' && 'Finalista'
            }
          </span>
          <span className='italic text-gray-700'>{formatDate(candidate.fecha_aplicacion.toString())}</span>
        </div>
      </div>
      <div className='absolute right-5 top-[40%] opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-5 group-hover:translate-x-0'>
        <IoIosArrowForward className='text-4xl text-primary' />
      </div>
    </article>
  )
}
