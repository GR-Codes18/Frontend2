export interface VotanteLocal {
  id: string
  dni: string
  nombre_completo: string
  voto_emitido?: boolean
  fecha_voto?: string | null
}

const STORAGE_KEY = 'votante_current'

export function setCurrentVotante(v: VotanteLocal) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(v))
  } catch (e) {
    // ignore
  }
}

export function getCurrentVotante(): VotanteLocal | null {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    return s ? JSON.parse(s) as VotanteLocal : null
  } catch (e) {
    return null
  }
}

export function clearCurrentVotante() {
  try { localStorage.removeItem(STORAGE_KEY) } catch (e) { }
}

export default {
  setCurrentVotante,
  getCurrentVotante,
  clearCurrentVotante,
}
