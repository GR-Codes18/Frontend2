import { createContext, useContext, useState } from 'react'
import type { FC, ReactNode } from 'react'
import type { Categoria } from '../types'

// Tipos locales mínimos para el contexto (evitan dependencia de tipos removidos en src/types)
interface LocalUsuario {
  dni: string
  nombre?: string
}

type LocalVoto = {
  usuarioHash?: string
  elecciones: Partial<Record<Categoria, string>>
  timestamp: string
}

interface VotingContextValue {
  usuario?: LocalUsuario
  login: (u: LocalUsuario) => void
  logout: () => void
  selections: Partial<Record<Categoria, string>>
  selectCandidate: (categoria: Categoria, candidatoId: string) => void
  confirmVote: () => LocalVoto
  reset: () => void
}

const VotingContext = createContext<VotingContextValue | undefined>(undefined)

export const VotingProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<LocalUsuario | undefined>(undefined)
  const [selections, setSelections] = useState<Partial<Record<Categoria, string>>>({})

  const login = (u: LocalUsuario) => setUsuario(u)
  const logout = () => {
    setUsuario(undefined)
    setSelections({})
  }
  const selectCandidate = (categoria: Categoria, candidatoId: string) => {
    setSelections(prev => ({ ...prev, [categoria]: candidatoId }))
  }
  const confirmVote = (): LocalVoto => {
    const voto: LocalVoto = {
      usuarioHash: usuario ? `anon-${btoa(usuario.dni).slice(0,8)}` : undefined,
      elecciones: selections,
      timestamp: new Date().toISOString(),
    }
    // for prototype we just reset after confirming
    setSelections({})
    setUsuario(undefined)
    return voto
  }
  const reset = () => {
    setSelections({})
  }

  return (
    <VotingContext.Provider value={{ usuario, login, logout, selections, selectCandidate, confirmVote, reset }}>
      {children}
    </VotingContext.Provider>
  )
}

export const useVoting = () => {
  const ctx = useContext(VotingContext)
  if (!ctx) throw new Error('useVoting must be used within VotingProvider')
  return ctx
}
