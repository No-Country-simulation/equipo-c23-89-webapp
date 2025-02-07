import { FormSignUp } from '@/components/FormSignUp'
import useLocalStorage from '@/hooks/useLocalStorage'
import { Link, useNavigate } from 'react-router-dom'

export function SignUp () {
  const { storedValue } = useLocalStorage<{ email: string, role: string } | null>('user', null)
  const navigate = useNavigate()

  if (storedValue?.role === 'admin') navigate('/admin')
  else if (storedValue?.role === 'recruiter') navigate('/recruiter/home')
  else if (storedValue?.role === 'candidate') navigate('/')

  return (
    <main className='flex justify-between w-full h-screen'>
      <section className='flex flex-col items-center w-3/6 py-12 bg-secondary'>
        <Link to="/">
          <img src="/logo.webp" alt="Logo ReclutaLent" className='w-[130px] object-contain'/>
        </Link>
        <img src="/sign-up.webp" alt="Registrarse" className='object-contain w-[53%] mt-14'/>
        <Link to="/sign-in">
          <button type="submit" className='flex items-center justify-center w-48 gap-2 px-8 py-3 font-semibold text-white transition-all duration-300 rounded-md bg-primary hover:brightness-110'>
            Iniciar Sesión
          </button>
        </Link>
      </section>
      <section className='bg-gradient-to-r from-accent to-[#bebeb5] w-3/6 flex justify-center items-center'>
        <div className='w-[70%]'>
          <FormSignUp />
        </div>
      </section>
    </main>
  )
}
