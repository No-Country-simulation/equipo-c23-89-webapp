import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import api from '@/lib/api'
import { useState } from 'react'

export function useAuth () {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const onSubmit = async (values: { email: string, password: string }) => {
    try {
      setIsLoading(true)
      // console.log(values)

      const response = await api.post('/api/login/', values)
      console.log('Respuesta de :', response.data)
      const { token } = response.data

      localStorage.setItem('token', token)

      toast({ description: '¡Inicio de sesión exitoso!' })
      navigate('/admin/')
    } catch (error) {
      toast({
        title: '¡Error!',
        description: '¡El correo o la contraseña son incorrectos!'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { onSubmit, isLoading }
}
