import { useEffect, useState } from 'react'
import { useAplicacionStore } from '../store/aplicacion'
import { type Aplicacion } from '../types/aplicacion'
import api from '@/lib/api'

export const useCandidatesPostulates = ({ idOferta }: { idOferta: number }) => {
  const candidatesPostulates = useAplicacionStore(state => state.aplicaciones)
  const setCandidatesPostulates = useAplicacionStore(state => state.setAplicaciones)
  const [loadingCandidatesPostulates, setLoadingCandidatesPostulates] = useState(false)

  useEffect(() => {
    const getCandidatesPostulates = async () => {
      try {
        setLoadingCandidatesPostulates(true)

        const response = await api.get('/aplicaciones/aplicaciones/')
        const candidatesPostulatesOffer: Aplicacion[] = response.data.filter((c: Aplicacion) => c.oferta === idOferta)

        setCandidatesPostulates(candidatesPostulatesOffer)
      } catch (error) {
        console.log(error)
      } finally {
        setLoadingCandidatesPostulates(false)
      }
    }

    getCandidatesPostulates()
  }, [idOferta])

  return { candidatesPostulates, loadingCandidatesPostulates, setCandidatesPostulates }
}
