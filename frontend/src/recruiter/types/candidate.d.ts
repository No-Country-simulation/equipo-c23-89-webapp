import { User } from "./recruiter"

export interface Candidate {
  id: number
  user: User
  experiencia: string
  educacion: string
  cv: string
}
