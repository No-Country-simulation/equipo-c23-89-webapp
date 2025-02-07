import { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2'
import api from '@/lib/api'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)

export function PieChart () {
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
        const ofertasCount = ofertasResponse.data.length

        setOfertas(ofertasCount || 0)
        setReclutadores(reclutadoresCount || 0)
        setCandidatos(candidatosCount || 0)

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

  const data = {
    labels: ['Ofertas', 'Reclutadores', 'Candidatos'],
    datasets: [
      {
        label: 'Cantidad',
        data: [ofertas, reclutadores, candidatos],
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
        text: 'Distribución de Ofertas, Reclutadores y Candidatos'
      }
    }
  }

  return <Pie data={data} options={options} />
}
