import { useState, useEffect } from 'react'
import api from '@/lib/api'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CiSearch } from 'react-icons/ci'
import { FaRegEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { GrView } from 'react-icons/gr'

interface Reclutador {
  id: number
  email: string
  first_name: string
  last_name: string
  phone: string | null
  role: string
  profile_image: string | null
}

export function Reclutadores () {
  const [reclutadores, setReclutadores] = useState<Reclutador[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    const fetchReclutadores = async () => {
      try {
        setIsLoading(true)
        const response = await api.get('users/')

        if (response.status !== 200) throw new Error('Error al cargar los reclutadores')

        const data = response.data
        if (Array.isArray(data)) {
          const reclutadoresFiltrados = data.filter(user => user.role === 'recruiter')
          setReclutadores(reclutadoresFiltrados)
        } else {
          throw new Error('Formato de datos incorrecto')
        }
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReclutadores()
  }, [])
    
  const { storedValue } = useLocalStorage<{ email: string, role: string } | null>('user', null)
  const navigate = useNavigate()

  useEffect(() => {
    if (storedValue?.role === 'recruiter') navigate('/recruiter/home')
    else if (storedValue?.role === 'candidate' || storedValue === null) navigate('/')
  }, [storedValue?.role])

  const reclutadoresFiltrados = reclutadores.filter((reclutador) =>
    `${reclutador.first_name} ${reclutador.last_name}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className='border-b-2 border-primary mb-4'>
        <label className='text-xl font-semibold'>Reclutadores</label>
      </div>
      <div className="flex w-full items-center space-x-2 mb-4">
        <Input
          className='bg-secondary'
          type="text"
          placeholder="Buscar Reclutadores"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="submit"><CiSearch /></Button>
      </div>

      {isLoading ? (
        <div className="text-center text-xl text-gray-500">Cargando reclutadores...</div>
      ) : error ? (
        <p className='text-center text-3xl text-gray-500'>{error}</p>
      ) : reclutadoresFiltrados.length === 0 ? (
        <p className='text-center text-3xl text-gray-500'>No hay reclutadores disponibles en este momento.</p>
      ) : (
        <ul>
          {reclutadoresFiltrados.map((reclutador) => (
            <article key={reclutador.id} className='bg-secondary rounded-lg p-4 my-4 flex items-center gap-4'>
              <img
                className='w-16 h-16 rounded-full object-cover border-2 border-primary'
                src={reclutador.profile_image || 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'}
                alt="Perfil"
              />
              <div className='flex-1 space-y-4'>
                <h3 className='text-md font-semibold'>{reclutador.first_name} {reclutador.last_name}</h3>
                <p className='text-gray-500 text-md'>{reclutador.email}</p>
              </div>
              <div className='flex-1 space-y-4'>
                <p className=''><span className='text-md font-semibold'>Teléfono: </span>{reclutador.phone}</p>
                <p className=''><span className='text-md font-semibold'>Role: </span>{reclutador.role}</p>
              </div>
              <div className='flex flex-col space-y-2'>
                <Button className='bg-primary text-white flex items-center gap-2'><GrView /> Ver</Button>
                <Button className='bg-gray-600 text-white flex items-center gap-2'><FaRegEdit /> Editar</Button>
                <Button className='bg-red-600 text-white flex items-center gap-2'><MdDeleteForever /> Eliminar</Button>
              </div>
            </article>
          ))}
        </ul>
      )}
    </div>
  )
}
