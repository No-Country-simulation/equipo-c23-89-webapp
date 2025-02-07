import { useNavigate, useParams } from 'react-router-dom'
import { FaUserGroup } from 'react-icons/fa6'
import LayoutRecruiter from '../layout/LayoutRecruiter'
import { CandidateInfo } from '../components/CandidateInfo'
import { PiBagFill } from 'react-icons/pi'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useCandidates } from '../hooks/useCandidates'
import { useEffect, useState } from 'react'
import { type Candidate } from '../types/candidate'
import { useUsers } from '../hooks/useUsers'
import { type User } from '../types/recruiter'

export default function CandidateRecruiter () {
  const [candidateInfo, setCandidateInfo] = useState<Candidate | undefined>(undefined)
  const [candidateInfo2, setCandidateInfo2] = useState<User | undefined>(undefined)
  const { users } = useUsers()
  const { offerId, candidateId } = useParams()
  const { candidates } = useCandidates()
  const { storedValue } = useLocalStorage<{ email: string, role: string } | null>('user', null)
  const navigate = useNavigate()

  useEffect(() => {
    if (storedValue?.role === 'admin') navigate('/admin')
    else if (storedValue?.role === 'candidate' || storedValue === null) navigate('/')
  }, [storedValue?.role])

  useEffect(() => {
    const candidateInfoCard = candidates.find(c => c.id === Number(candidateId))
    const candidateInfoCard2 = users.find(c => c.id === candidateInfoCard?.user.id)

    if (!candidateInfoCard2) navigate('/recruiter/home')

    setCandidateInfo(candidateInfoCard)
    setCandidateInfo2(candidateInfoCard2)
  }, [candidates, users])

  return (
    <LayoutRecruiter>
      <main className='flex gap-6 py-24 mx-56'>
        <section className='w-full bg-accent rounded-xl p-7'>
          <div className='flex items-center justify-between px-3 mb-6 rounded-md bg-secondary'>
            <h2 className='text-[40px] font-extrabold'>Candidato <span className='text-primary'>Postulado</span></h2>
            <div className='text-4xl text-primary'>
              <FaUserGroup />
            </div>
          </div>
          <div className='flex flex-col px-3 pt-3 pb-6 mb-6 rounded-md bg-secondary'>
            <div className='flex items-center justify-between gap-5'>
              <h3 className='text-[28px] font-extrabold'><span className='text-primary'>Oferta: </span>Frontend Web Developer</h3>
              <div className='text-4xl text-primary'>
                <PiBagFill />
              </div>
            </div>
            <p className='pr-16 mt-2 overflow-y-auto max-h-56'><span className='font-bold'>Descripción: </span>Término fijo Salario a convenir, 4 años de experiencia, Profesional, Especialización/ Maestría, Doctorado.Término fijo Salario a convenir, 4 años de experiencia, Profesional, Especialización/ Maestría, Doctorado.jo Salario a convenir, 4 años de experiencia, Profesional, Especialización/ Maestría, DoctoradoTérmino fijo Salario a convenir, 4 años de experiencia, Profesional, Especialización/ Maestría, Doctorado.</p>
          </div>
          <div className='flex flex-col px-3 pt-3 pb-6 mb-6 rounded-md bg-secondary'>
            <CandidateInfo
              offerId={Number(offerId)}
              candidateInfo={candidateInfo}
              candidateInfo2={candidateInfo2}
            />
          </div>
        </section>
      </main>
    </LayoutRecruiter>
  )
}
