import { z } from 'zod'

export const offerSchema = z.object({
  title: z.string().min(1, {
    message: 'El titulo debe tener al menos 1 caracter.'
  }).max(100, {
    message: 'El titulo debe tener como máximo 150 caracteres.'
  }),
  description: z.string().min(1, {
    message: 'La descripción debe tener al menos 1 caractere.'
  }).max(300, {
    message: 'La descripción debe tener como máximo 300 caracteres.'
  }),
  salary: z.string().regex(/^\d+$/, 'El salario debe ser un número entero.'),
  location: z.string()
})
