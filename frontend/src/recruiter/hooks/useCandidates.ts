import { useEffect, useState } from 'react'
import { useCandidateStore } from '../store/candidate'
import { type Candidate } from '../types/candidate'
import api from '@/lib/api'

export const useCandidates = () => {
  const candidates = useCandidateStore(state => state.candidates)
  const setCandidates = useCandidateStore(state => state.setCandidates)
  const [loadingCandidates, setLoadingCandidates] = useState(false)

  useEffect(() => {
    const getCandidates = async () => {
      try {
        setLoadingCandidates(true)

        const response = await api.get('/candidatos/candidatos/')

        setCandidates(response.data as Candidate[])
      } catch (error) {
        console.log(error)
      } finally {
        setLoadingCandidates(false)
      }
    }

    getCandidates()
  }, [])

  return { candidates, loadingCandidates, setCandidates }
}
