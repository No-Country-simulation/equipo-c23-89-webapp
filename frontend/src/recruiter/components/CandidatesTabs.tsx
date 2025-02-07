import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs'
import { CandidateCard } from './CandidateCard'
import { type Aplicacion } from '../types/aplicacion'

interface CandidatesTabsProps {
  offerId: number
  candidatesPostulates: Aplicacion[]
}

export function CandidatesTabs ({ offerId, candidatesPostulates }: CandidatesTabsProps) {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid grid-cols-4 px-2 mb-3 h-11">
        <TabsTrigger value="all" className='text-base'>Todos los candidatos</TabsTrigger>
        <TabsTrigger value="cvs" className='text-base'>CV vistos</TabsTrigger>
        <TabsTrigger value="inProcess" className='text-base'>En proceso</TabsTrigger>
        <TabsTrigger value="finalists" className='text-base'>Finalistas</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className='space-y-3'>
        {
          candidatesPostulates
            .map(candidate => (
              <CandidateCard
                key={candidate.id_aplicacion}
                offerId={offerId}
                candidate={candidate}
              />
            ))
        }
        {
          candidatesPostulates
          .length === 0 && (
            <div className='py-16 text-xl italic font-semibold text-center bg-secondary'>
              No hay candidatos postulados
            </div>
          )
        }
      </TabsContent>
      <TabsContent value="cvs" className='space-y-3'>
        {
          candidatesPostulates
            .filter(candidate => candidate.estado === 'viewed')
            .map(candidate => (
              <CandidateCard
                key={candidate.id_aplicacion}
                offerId={offerId}
                candidate={candidate}
              />
            ))
        }
        {
          candidatesPostulates
          .filter(candidate => candidate.estado === 'viewed')
          .length === 0 && (
            <div className='py-16 text-xl italic font-semibold text-center bg-secondary'>
              No hay candidatos con CV vistos
            </div>
          )
        }
      </TabsContent>
      <TabsContent value="inProcess" className='space-y-3'>
        {
          candidatesPostulates
            .filter(candidate => candidate.estado === 'inProcess')
            .map(candidate => (
              <CandidateCard
                key={candidate.id_aplicacion}
                offerId={offerId}
                candidate={candidate}
              />
            ))
        }
        {
          candidatesPostulates
          .filter(candidate => candidate.estado === 'inProcess')
          .length === 0 && (
            <div className='py-16 text-xl italic font-semibold text-center bg-secondary'>
              No hay candidatos en proceso
            </div>
          )
        }
      </TabsContent>
      <TabsContent value="finalists" className='space-y-3'>
        {
          candidatesPostulates
            .filter(candidate => candidate.estado === 'finalist')
            .map(candidate => (
              <CandidateCard
                key={candidate.id_aplicacion}
                offerId={offerId}
                candidate={candidate}
              />
            ))
        }
        {
          candidatesPostulates
          .filter(candidate => candidate.estado === 'finalist')
          .length === 0 && (
            <div className='py-16 text-xl italic font-semibold text-center bg-secondary'>
              No hay candidatos finalistas
            </div>
          )
        }
      </TabsContent>
    </Tabs>
  )
}
