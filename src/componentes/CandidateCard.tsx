import type { Candidato } from '../types'

interface Props {
  candidato: Candidato
  onSelect?: (id: string) => void
  onView?: (c: Candidato) => void
  selected?: boolean
}

export default function CandidateCard({ candidato, onSelect, onView, selected }: Props) {
  const partidoNombre = candidato.partido?.nombre ?? ''
  const siglas = (partidoNombre || candidato.nombre)
    .split(/\s+/)
    .map(w => w[0] ?? '')
    .join('')
    .slice(0, 3)
    .toUpperCase() || '?'

  return (
    <div className={`border rounded-lg p-4 bg-white ${selected ? 'ring-2 ring-blue-200' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4 bg-gray-400`}>{siglas}</div>
          <div>
            <h3 className="text-lg font-semibold">{candidato.nombre}</h3>
            <p className="text-sm text-gray-600">{candidato.partido?.nombre ?? '—'} · {candidato.profesion ?? '—'}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <button onClick={() => onView?.(candidato)} className="text-sm text-blue-600 mb-2">Ver Detalles</button>
          <button onClick={() => onSelect?.(candidato.id)} className="px-3 py-1 rounded bg-blue-600 text-white text-sm">Seleccionar</button>
        </div>
      </div>
    </div>
  )
}
