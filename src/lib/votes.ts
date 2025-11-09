import { supabase } from './supabase'

export async function getVotanteByDni(dni: string) {
  const { data, error } = await supabase
    .from('votantes')
    .select('*')
    .eq('dni', dni)
    .single()

  return { data, error }
}

export async function getVotoEmitidoByVotanteId(votante_id: string) {
  const { data, error } = await supabase
    .from('votos_emitidos')
    .select('*')
    .eq('votante_id', votante_id)
    .single()

  return { data, error }
}

export async function registerVote(votante_id: string, presidente_id: string, alcalde_id: string, congresista_id: string) {
  // Insert voto emitido
  const { data, error } = await supabase
    .from('votos_emitidos')
    .insert({ votante_id, presidente_id, alcalde_id, congresista_id })
    .select()
    .single()

  if (error) throw error

  // marcar votante como que ya votó
  const { error: updError } = await supabase
    .from('votantes')
    .update({ voto_emitido: true, fecha_voto: new Date().toISOString() })
    .eq('id', votante_id)

  if (updError) throw updError

  return data
}
