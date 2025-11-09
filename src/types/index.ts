export type Categoria = 'presidente' | 'alcalde' | 'congresista'

export interface Partido {
  id: string
  nombre: string
  descripcion: string | null
  fundacion: number
  ideologia: string | null
  lider_actual: string | null
  propuestas_generales: string | null
  simbolo_storage_url: string | null
  fecha_registro: string
}

export interface Candidato {
  id: string;
  nombre: string;
  partido_id: string;
  cargo: 'Presidente' | 'Alcalde' | 'Congresista';
  edad: number | null;
  profesion: string | null;
  experiencia: string | null;
  propuestas_detalladas: string | null;
  imagen_storage_url: string | null;
  fecha_registro: string;
  partido?: Partido; // Para almacenar los datos del partido relacionado
}