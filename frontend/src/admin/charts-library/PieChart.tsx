import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)

export function PieChart () {
  const data = {
    labels: ['Ofertas', 'Reclutadores', 'Candidatos'],
    datasets: [
      {
        label: 'Cantidad',
        data: [300, 50, 100],
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
