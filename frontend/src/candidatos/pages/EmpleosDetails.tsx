import { useNavigate } from 'react-router-dom'
import Main from '../components/_shared/main/Main'
import Profile from '../components/_shared/profile/Profile'
import Empleo from '../components/empleo/Empleo'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useEffect } from 'react'

const EmpleosDetails = () => {
  const { storedValue } = useLocalStorage<{ email: string, role: string } | null>('user', null)
  const navigate = useNavigate()

  useEffect(() => {
    if (storedValue?.role === 'admin') navigate('/admin')
    else if (storedValue?.role === 'recruiter') navigate('/recruiter/home')
  }, [storedValue?.role])

  return (
    <div className='max-w-[1400px] mx-auto mt-24 px-4 flex gap-6'>
      <Profile />
      <Main>
        <Empleo />
      </Main>
    </div>
  )
}

export default EmpleosDetails
