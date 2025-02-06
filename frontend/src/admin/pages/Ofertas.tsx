import { useState, useEffect } from 'react'
import api from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CiSearch } from 'react-icons/ci'
import { FaRegEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { GrView } from 'react-icons/gr'

interface Oferta {
  id_oferta: number
  titulo: string
  descripcion: string
  fecha_publicacion: string
  salario: number
  ubicacion: string
}

export function Ofertas () {
  const [ofertas, setOfertas] = useState<Oferta[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        setIsLoading(true)
        const response = await api.get('api/oferta')

        if (response.status !== 200) {
          throw new Error('Error al cargar las ofertas')
        }

        const data = response.data

        if (Array.isArray(data)) {
          setOfertas(data)
        } else {
          throw new Error('Formato de datos incorrecto')
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchOfertas()
  }, [])

  return (
    <div>
      <div className='border-b-2 border-primary mb-4'>
        <label className='text-xl font-semibold'>Ofertas</label>
      </div>
      <div className="flex w-full items-center space-x-2 mb-4">
        <Input className='bg-secondary' type="text" placeholder="Buscar Ofertas" />
        <Button type="submit"><CiSearch /></Button>
      </div>

      {isLoading ? (
        <div className="text-center text-xl text-gray-500">Cargando ofertas...</div>
      ) : error ? (
        <p className='text-center text-3xl text-gray-500'>{error}</p>
      ) : ofertas.length === 0 ? (
        <p className='text-center text-3xl text-gray-500'>No hay ofertas disponibles en este momento.</p>
      ) : (
        <ul>
          {ofertas.map((oferta) => (
            <article key={oferta.id_oferta} className='bg-secondary rounded-lg p-4'>
              <div className='flex gap-4'>
                <div className='w-6/6'>
                  <div className='flex gap-4'>
                    <div className='w-1/6'>
                      <img
                        className='w-full'
                        src="https://media.magneto365.com/image_assets/files/100969/original-07667a75-eade-41d6-8663-8aced564738e-.png"
                        alt="Oferta"
                      />
                    </div>
                    <div className='w-3/6 flex flex-col'>
                      <h3 className='font-bold'>{oferta.titulo}</h3>
                      <p>{oferta.ubicacion}</p>
                      <p>{oferta.fecha_publicacion}</p>
                    </div>
                    <div className='w-5/6'>
                      <p>{oferta.descripcion}</p>
                    </div>
                  </div>
                  <div className='flex justify-between border-t-2 border-primary pt-4'>
                    <p><strong>Postulados:</strong> 100</p>
                    <p><strong>Salario:</strong> ${oferta.salario}</p>
                  </div>
                </div>
                <div className='w-1/6 p-2 h-auto bg-accent rounded-lg space-y-2'>
                  <button type='button' className='w-full py-1 bg-primary rounded-lg text-white flex items-center px-2 gap-2'><GrView /> Mostrar</button>
                  <button type='button' className='w-full py-1 bg-[#626564] rounded-lg text-white flex items-center px-2 gap-2'><FaRegEdit /> Editar</button>
                  <button type='button' className='w-full py-1 bg-red-600 rounded-lg text-white flex items-center px-2 gap-2'><MdDeleteForever /> Eliminar</button>
                </div>
              </div>
            </article>
          ))}
        </ul>
      )}
    </div>
  )
}
