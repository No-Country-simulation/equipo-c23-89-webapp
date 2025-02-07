import { DoughnutChart } from '@/admin/charts-library/DoughnutChart'
import { PieChart } from '@/admin/charts-library/PieChart'
import { PolarChart } from '@/admin/charts-library/PolarChart'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function Dashboard () {
  const { storedValue } = useLocalStorage<{ email: string, role: string } | null>('user', null)
  const navigate = useNavigate()

  useEffect(() => {
    if (storedValue?.role === 'recruiter') navigate('/recruiter/home')
    else if (storedValue?.role === 'candidate' || storedValue === null) navigate('/')
  }, [storedValue?.role])

  return (
    <>
      <div className='mb-4 border-b-2 border-primary'>
        <label className='text-xl font-semibold'>Inicio</label>
      </div>

      <div className='grid grid-cols-2 gap-4 py-4'>
        <div className='flex items-center justify-center col-start-1 col-end-1'>
          <PolarChart />
        </div>
        <div className='flex items-center justify-center col-start-2 col-end-2'>
          <DoughnutChart />
        </div>
        <div className='flex items-center justify-center col-start-1 col-end-1'>
          <PieChart />
        </div>
      </div>
    </>
  )
}
