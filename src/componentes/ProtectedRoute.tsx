import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useVoting } from '../context/VotingContext'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { usuario } = useVoting()
  if (!usuario) return <Navigate to="/votar" replace />
  return children
}
