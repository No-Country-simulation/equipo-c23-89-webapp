import { useState, useEffect } from 'react'
import { PolarArea } from 'react-chartjs-2'
import api from '@/lib/api'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, RadialLinearScale)

export function PolarChart () {
  const [reclutadores, setReclutadores] = useState<number>(0)
  const [ofertas, setOfertas] = useState<number>(0)
  const [candidatos, setCandidatos] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        const response = await api.get('users/')
        const users = response.data

        const reclutadoresCount = users.filter(user => user.role === 'recruiter').length
        const candidatosCount = users.filter(user => user.role === 'candidate').length

        const ofertasResponse = await api.get('api/oferta')
        setOfertas(ofertasResponse.data.length)

        setReclutadores(reclutadoresCount)
        setCandidatos(candidatosCount)
      } catch (error: any) {
        console.error("Error al cargar los datos:", error)
        setError(error.response ? error.response.data : error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const ofertasData = ofertas || 0
  const reclutadoresData = reclutadores || 0
  const candidatosData = candidatos || 0

  const data = {
    labels: ['Ofertas', 'Reclutadores', 'Candidatos'],
    datasets: [
      {
        label: 'Cantidad',
        data: [ofertasData, reclutadoresData, candidatosData],
        borderColor: 'transparent',
        backgroundColor: [
          'rgba(1, 80, 105, 0.7)',
          'rgba(43, 105, 144, 0.7)',
          'rgba(198, 166, 0, 0.7)'
        ]
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Comparación de Participación en el Mercado Laboral'
      }
    }
  }

  return <PolarArea data={data} options={options} />
}
