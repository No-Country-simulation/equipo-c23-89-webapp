import { useEffect, useState } from 'react'
import { useCandidateStore } from '../store/candidate'
import api from '@/lib/api'
import { type User } from '../types/recruiter'

export const useUsers = () => {
  const users = useCandidateStore(state => state.users)
  const setUsers = useCandidateStore(state => state.setUsers)
  const [loadingUsers, setLoadingUsers] = useState(false)

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoadingUsers(true)

        const response = await api.get('/api/usuario/users/')

        setUsers(response.data as User[])
      } catch (error) {
        console.log(error)
      } finally {
        setLoadingUsers(false)
      }
    }

    getUsers()
  }, [])

  return { users, loadingUsers, setUsers }
}
