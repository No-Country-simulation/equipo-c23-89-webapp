import Main from '../components/_shared/main/Main'
import Profile from '../components/_shared/profile/Profile'
import Search from '../components/searchbar/Search'
import Card from '../components/card/Card'
import Filter from '../components/filter/Filter'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const empleos = [
  {
    id: 0,
    titulo: 'React Junior Web Development',
    descripcion: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem consectetur fugit rerum nisi animi reiciendis necessitatibus, quia recusandae velit tenetur possimus voluptatem deserunt voluptatum soluta repudiandae numquam, magnam voluptates vel',
    fecha_publicacion: new Date(),
    salario: 5000,
    ubicacion: 'Mexico'
  },
  {
    id: 1,
    titulo: 'Java Developer',
    descripcion: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem consectetur fugit rerum nisi animi reiciendis necessitatibus, quia recusandae velit tenetur possimus voluptatem deserunt voluptatum soluta repudiandae numquam, magnam voluptates vel',
    fecha_publicacion: new Date(),
    salario: 3000,
    ubicacion: 'GDL'
  },
  {
    id: 2,
    titulo: 'React Junior',
    descripcion: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem consectetur fugit rerum nisi animi reiciendis necessitatibus, quia recusandae velit tenetur possimus voluptatem deserunt voluptatum soluta repudiandae numquam, magnam voluptates vel',
    fecha_publicacion: new Date(),
    salario: 1000,
    ubicacion: 'Sonora'
  },
  {
    id: 3,
    titulo: 'C# Developer',
    descripcion: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem consectetur fugit rerum nisi animi reiciendis necessitatibus, quia recusandae velit tenetur possimus voluptatem deserunt voluptatum soluta repudiandae numquam, magnam voluptates vel',
    fecha_publicacion: new Date(),
    salario: 100000,
    ubicacion: 'USD'
  }
]

const Empleos = () => {
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
        <Search />
        <Filter />
        {
          empleos.map((empleo) => (
            <Card key={empleo.id} id={empleo.id} titulo={empleo.titulo} salario={empleo.salario} ubicacion={empleo.ubicacion} />
          ))
        }
      </Main>
    </div>
  )
}

export default Empleos
