import { APLICACION_INITIAL_VALUES } from '../initial-values/aplicacion'
import { create } from 'zustand'
import { type Aplicacion } from '../types/aplicacion'

interface AplicacionStore {
  aplicaciones: Aplicacion[]
  setAplicaciones: (aplicaciones: Aplicacion[]) => void
}

export const useAplicacionStore = create<AplicacionStore>((set) => ({
  aplicaciones: [APLICACION_INITIAL_VALUES],
  setAplicaciones: (aplicaciones: Aplicacion[]) => { set({ aplicaciones }) }
}))
