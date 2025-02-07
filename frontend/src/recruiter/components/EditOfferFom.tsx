import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { type z } from 'zod'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { offerSchema } from '../schemas/offerSchema'
import api from '@/lib/api'
import { type Offer } from '../types/offer'
import { FaPencil } from 'react-icons/fa6'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useRecruiter } from '../hooks/useRecruiter'

interface EditOfferFormProps {
  offers: Offer[]
  offer: Offer
  setOffers: any
  setOpen: any
}

export const EditOfferForm = ({ offers, offer, setOffers, setOpen }: EditOfferFormProps) => {
  const { storedValue } = useLocalStorage<{ email: string, role: string } | null>('user', null)
  const { recruiter } = useRecruiter({ email: storedValue?.email || '' })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof offerSchema>>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      title: offer.titulo,
      description: offer.descripcion,
      salary: offer.salario.toString(),
      location: offer.ubicacion
    }
  })

  async function onSubmit (values: z.infer<typeof offerSchema>) {
    try {
      setIsLoading(true)

      const response = await api.put(`/api/oferta/${offer.id_oferta}/`, {
        titulo: values.title,
        descripcion: values.description,
        salario: values.salary,
        ubicacion: values.location,
        id_reclutador: recruiter?.id
      })

      if (response.status === 200) {
        const newOfffers = offers.map((o) => o.id_oferta === offer.id_oferta ? response.data : o)
        setOffers(newOfffers)
        setOpen(false)

        toast({
          description: '¡Oferta actualizada exitosamente!'
        })
      }
    } catch (error: any) {
      console.log(error)

      toast({
        title: '¡Oh no!, ocurrió un error',
        description: '¡La oferta no se pudo actualizar correctamente!'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base'>Título: <span className='font-bold text-destructive'>*</span></FormLabel>
              <FormControl>
                <input type="text" placeholder="Digite el título de la oferta" className="w-full px-3 py-2 text-black placeholder-gray-400 bg-white border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base'>Descripción: <span className='font-bold text-destructive'>*</span></FormLabel>
              <FormControl>
                <textarea placeholder="Digite la descripción de la oferta" className='w-full h-32 px-3 py-2 text-black placeholder-gray-400 bg-white border border-gray-200 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50' required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base'>Salario: <span className='font-bold text-destructive'>*</span></FormLabel>
              <FormControl>
                <input type="number" placeholder="Digite el salario de la oferta" className="w-full px-3 py-2 text-black placeholder-gray-400 bg-white border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base'>Ubicación: <span className='font-bold text-destructive'>*</span></FormLabel>
              <FormControl>
                <input type="text" placeholder="Digite la ubicación de la oferta" className="w-full px-3 py-2 text-black placeholder-gray-400 bg-white border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='w-full pt-2'>
          <button type="submit" className='flex items-center justify-center w-full gap-2 px-8 py-3 font-semibold text-white transition-all duration-300 rounded-md bg-primary hover:brightness-110'>
            {!isLoading && (
              <div className='text-2xl'>
                <FaPencil />
              </div>
            )}
            {isLoading ? 'Cargando...' : 'Editar oferta'}
          </button>
        </div>
      </form>
    </Form>
  )
}
