import { CANDIDATE_INITIAL_VALUES } from '../initial-values/candidate'
import { create } from 'zustand'
import { type Candidate } from '../types/candidate'
import { type User } from '../types/recruiter'
import { USER_INITIAL_VALUES } from '../initial-values/recruiter'

interface CandidateStore {
  users: User[]
  candidates: Candidate[]
  setCandidates: (candidate: Candidate[]) => void
  setUsers: (users: User[]) => void
}

export const useCandidateStore = create<CandidateStore>((set) => ({
  users: [USER_INITIAL_VALUES],
  candidates: [CANDIDATE_INITIAL_VALUES],
  setCandidates: (candidates: Candidate[]) => { set({ candidates }) },
  setUsers: (users: User[]) => { set({ users }) }
}))
