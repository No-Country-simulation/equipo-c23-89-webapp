import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import api from '@/lib/api'
import { FaSignInAlt } from 'react-icons/fa'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { formSignUpSchema } from '@/schemas/authSchema'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom'

export function FormSignUp () {
  const [isLoading, setIsLoading] = useState(false)
  const { setValue } = useLocalStorage<{ email: string, role: string } | null>('user', null)
  const { toast } = useToast()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSignUpSchema>>({
    resolver: zodResolver(formSignUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      role: 'candidate',
      email: '',
      password: '',
      password2: ''
    }
  })

  async function onSubmit (values: z.infer<typeof formSignUpSchema>) {
    try {
      setIsLoading(true)

      const response = await api.post('/api/usuario/register/', {
        email: values.email,
        password: values.password,
        first_name: values.firstName,
        last_name: values.lastName,
        role: values.role,
        company_name: 'No Country'
      })

      if (response.status === 201) {
        switch (values.role) {
          case 'recruiter':
            navigate('/recruiter/home')
            break
          default:
            navigate('/')
            break
        }

        setValue({ email: values.email, role: values.role })
        toast({
          description: '¡Te registraste exitosamente!'
        })
      }
    } catch (error: any) {
      toast({
        title: '¡Oh no!, ocurrió un error',
        description: '¡Verifica que los datos sean correctos!'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <div className='p-8 rounded-lg bg-secondary'>
        <h2 className='mb-10 text-3xl font-bold text-center text-accent-foreground'>Registrarse</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className='flex items-center justify-between gap-5'>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className='w-1/2'>
                  <FormLabel className='text-base'>Nombres: <span className='font-bold text-destructive'>*</span></FormLabel>
                  <FormControl>
                    <input type="text" placeholder="Digite sus nombres" className="w-full px-3 py-2 text-black placeholder-gray-400 bg-white border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className='w-1/2'>
                  <FormLabel className='text-base'>Apellidos: <span className='font-bold text-destructive'>*</span></FormLabel>
                  <FormControl>
                    <input type="text" placeholder="Digite sus apellidos" className="w-full px-3 py-2 text-black placeholder-gray-400 bg-white border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex items-center justify-between gap-5'>
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className='w-1/2'>
                  <FormLabel className='text-base'>Rol: <span className='font-bold text-destructive'>*</span></FormLabel>
                  <Select onValueChange={field.onChange} defaultValue="candidate">
                    <FormControl>
                      <SelectTrigger className='bg-white'>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="candidate">Candidato</SelectItem>
                      <SelectItem value="recruiter">Reclutador</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className='w-1/2'>
                  <FormLabel className='text-base'>Correo electrónico: <span className='font-bold text-destructive'>*</span></FormLabel>
                  <FormControl>
                    <input type="email" placeholder="Digite su correo electrónico" className="w-full px-3 py-2 text-black placeholder-gray-400 bg-white border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex items-center justify-between gap-5'>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className='w-1/2'>
                  <FormLabel className='text-base'>Contraseña: <span className='font-bold text-destructive'>*</span></FormLabel>
                  <FormControl>
                    <input type="password" placeholder="Digite su contraseña" className="w-full px-3 py-2 text-black placeholder-gray-400 bg-white border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password2"
              render={({ field }) => (
                <FormItem className='w-1/2'>
                  <FormLabel className='text-base'>Confirmar contraseña: <span className='font-bold text-destructive'>*</span></FormLabel>
                  <FormControl>
                    <input type="password" placeholder="Confirme su contraseña" className="w-full px-3 py-2 text-black placeholder-gray-400 bg-white border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <button type="submit" className='flex items-center justify-center w-full gap-2 px-8 py-3 font-semibold text-white transition-all duration-300 rounded-md bg-primary hover:brightness-110'>
            {isLoading ? 'Cargando...' : 'Registrarse'}
            {!isLoading && (
              <div className='text-2xl'>
                <FaSignInAlt />
              </div>
            )}
          </button>
        </form>
      </div>
    </Form>
  )
}
