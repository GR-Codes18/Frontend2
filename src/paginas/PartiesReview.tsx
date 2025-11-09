import { useState, useEffect } from 'react'
import Layout from '../componentes/Layout'
import Modal from '../componentes/Modal'
import { supabase } from '../lib/supabase'
import type { Partido } from '../types'

export default function PartiesReview() {
  const [selected, setSelected] = useState<string | null>(null)
  const [partidos, setPartidos] = useState<Partido[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPartidos() {
      try {
        const { data, error } = await supabase
          .from('partidos_politicos')
          .select('*')
        
        if (error) throw error
        
        setPartidos(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar los partidos')
      } finally {
        setLoading(false)
      }
    }

    fetchPartidos()
  }, [])

  const partido = partidos.find(p => p.id === selected)

  return (
    <Layout>
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Partidos Políticos</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto px-4">
            Conoce los principales partidos políticos del Perú, sus propuestas y posiciones ideológicas para
            tomar una decisión informada.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-8">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 max-w-[1920px] mx-auto px-2">
            {partidos.map(p => (
              <div key={p.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                {p.simbolo_storage_url && (
                  <div className="w-full h-48 bg-gray-100">
                    <img
                      src={p.simbolo_storage_url}
                      alt={`Símbolo de ${p.nombre}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6 xl:p-8">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">{p.nombre}</h3>
                    <p className="text-sm text-gray-500">Fundado en {p.fundacion}</p>
                  </div>
                  {p.ideologia && (
                    <div className="my-4">
                      <span className="inline-block px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                        {p.ideologia}
                      </span>
                    </div>
                  )}
                  {p.descripcion && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{p.descripcion}</p>
                  )}
                  <button
                    onClick={() => setSelected(p.id)}
                    className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Modal open={!!partido} onClose={() => setSelected(null)}>
          {partido && (
            <div className="p-6">
              {partido.simbolo_storage_url && (
                <div className="mb-6">
                  <img
                    src={partido.simbolo_storage_url}
                    alt={`Símbolo de ${partido.nombre}`}
                    className="w-full max-h-64 object-contain bg-gray-100 rounded-lg"
                  />
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{partido.nombre}</h2>
                <p className="text-gray-600">Fundado en {partido.fundacion}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Información General</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Fundación</p>
                      <p className="font-medium">{partido.fundacion}</p>
                    </div>
                    {partido.ideologia && (
                      <div>
                        <p className="text-sm text-gray-600">Ideología</p>
                        <p className="font-medium">{partido.ideologia}</p>
                      </div>
                    )}
                    {partido.lider_actual && (
                      <div>
                        <p className="text-sm text-gray-600">Líder actual</p>
                        <p className="font-medium">{partido.lider_actual}</p>
                      </div>
                    )}
                  </div>
                </div>

                {partido.descripcion && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Descripción</h3>
                    <p className="text-gray-700">{partido.descripcion}</p>
                  </div>
                )}

                {partido.propuestas_generales && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Propuestas Generales</h3>
                    <div className="text-gray-700 whitespace-pre-wrap">
                      {partido.propuestas_generales}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  )
}
