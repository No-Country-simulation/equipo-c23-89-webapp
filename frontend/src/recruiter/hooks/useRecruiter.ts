import { useEffect, useState } from 'react'
import { useRecruiterStore } from '../store/recruiter'
import api from '@/lib/api'
import { type Recruiter } from '../types/recruiter'

export const useRecruiter = ({ email }: { email: string }) => {
  const recruiter = useRecruiterStore(state => state.recruiter)
  const setRecruiter = useRecruiterStore(state => state.setRecruiter)
  const [loadingRecruiter, setLoadingRecruiter] = useState(false)

  useEffect(() => {
    const getRecruiter = async () => {
      try {
        setLoadingRecruiter(true)

        const response = await api.get(`/api/reclutador/recruiters/`)
        const recruiterLogged = response.data.find((recruiter: Recruiter) => recruiter.user.email === email)

        setRecruiter(recruiterLogged)
      } catch (error) {
        console.log(error)
      } finally {
        setLoadingRecruiter(false)
      }
    }

    getRecruiter()
  }, [email])

  return { recruiter, loadingRecruiter, setRecruiter }
}
