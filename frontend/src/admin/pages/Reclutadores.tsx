import useLocalStorage from '@/hooks/useLocalStorage'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CiSearch } from 'react-icons/ci'

export function Reclutadores () {
  const { storedValue } = useLocalStorage<{ email: string, role: string } | null>('user', null)
  const navigate = useNavigate()

  useEffect(() => {
    if (storedValue?.role === 'recruiter') navigate('/recruiter/home')
    else if (storedValue?.role === 'candidate' || storedValue === null) navigate('/')
  }, [storedValue?.role])

  return (
    <>
      <div className='mb-4 border-b-2 border-primary'>
        <label className='text-xl font-semibold'>Reclutadores</label>
      </div>
      <div className="flex items-center w-full mb-4 space-x-2">
        <Input className='bg-secondary' type="text" placeholder="Reclutadores" />
        <Button type="submit"><CiSearch /></Button>
      </div>
    </>
  )
}
