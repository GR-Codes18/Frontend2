import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import Layout from '../componentes/Layout';
import { supabase } from '../lib/supabase';
import { getCurrentVotante, setCurrentVotante, clearCurrentVotante } from '../lib/user';
import { getVotanteByDni, getVotoEmitidoByVotanteId, registerVote } from '../lib/votes';
import type { Candidato, Categoria } from '../types';
import { useLocation, useNavigate } from 'react-router-dom';

export default function VotingPanel() {
  const location = useLocation();
  const navigate = useNavigate();
  // Recibe los datos del usuario desde el login (fallback a votante cargado)
  const usuario = location.state && typeof location.state === 'object'
    ? { nombre: (location.state as any).nombre || '', dni: (location.state as any).dni || '' }
    : { nombre: '', dni: '' };

  const [seleccion, setSeleccion] = useState<{ presidente: string | null; alcalde: string | null; congresista: string | null }>({ presidente: null, alcalde: null, congresista: null });
  const [modalCandidato, setModalCandidato] = useState<string | null>(null);
  const [modalConfirm, setModalConfirm] = useState<boolean>(false);
  const [votoConfirmado, setVotoConfirmado] = useState<boolean>(false);
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [votante, setVotante] = useState<any | null>(null);
  const [votoRecord, setVotoRecord] = useState<any | null>(null);

  // Cargar candidatos desde Supabase
  useEffect(() => {
    let mounted = true
    async function fetchCandidatosAll() {
      try {
        const { data, error } = await supabase
          .from('candidatos')
          .select(`*, partido:partidos_politicos (id,nombre,simbolo_storage_url)`)

        if (error) throw error
        if (mounted) setCandidatos(data || [])
      } catch (err) {
        console.error('Error cargando candidatos', err)
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchCandidatosAll()
    return () => { mounted = false }
  }, [])

  // Inicializar votante: usar localStorage o el estado pasado por navigation, y comprobar voto previo
  useEffect(() => {
    let mounted = true
    async function initVotanteAndCheck() {
      try {
        let current = getCurrentVotante()

        if (!current && location.state && typeof location.state === 'object' && (location.state as any).dni) {
          const dni = (location.state as any).dni
          const { data, error } = await getVotanteByDni(dni)
          if (!error && data) {
            current = data
            setCurrentVotante(data)
          }
        }

        if (mounted && current) {
          setVotante(current)

          // comprobar voto emitido
          const { data: voto, error: votoErr } = await getVotoEmitidoByVotanteId(current.id)
          if (!votoErr && voto) {
            // poblar selección desde voto registrado
            if (voto.presidente_id) setSeleccion(prev => ({ ...prev, presidente: voto.presidente_id }))
            if (voto.alcalde_id) setSeleccion(prev => ({ ...prev, alcalde: voto.alcalde_id }))
            if (voto.congresista_id) setSeleccion(prev => ({ ...prev, congresista: voto.congresista_id }))
            setVotoRecord(voto)
            setVotoConfirmado(true)
          }
        }
      } catch (err) {
        console.error('Error inicializando votante', err)
      }
    }

    initVotanteAndCheck()
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    // Este useEffect fue removido; la carga de candidatos ya se realiza en el primer useEffect
  }, []);

  const candidatosPresidente = candidatos.filter(c => c.cargo === 'Presidente');
  const candidatosAlcalde = candidatos.filter(c => c.cargo === 'Alcalde');
  const candidatosCongresista = candidatos.filter(c => c.cargo === 'Congresista');

  const handleSeleccion = (categoria: Categoria, id: string) => {
    setSeleccion(prev => ({ ...prev, [categoria]: id }));
  };

  // Confirmación: registrar en la base de datos y actualizar estado local
  const handleConfirmarVotoAsync = async () => {
    setModalConfirm(false);

    if (!votante) {
      alert('No se encontró información del votante. Asegúrese de iniciar sesión con su DNI.');
      return;
    }

    try {
      // Los ids deben existir
      const presidenteId = seleccion.presidente as string
      const alcaldeId = seleccion.alcalde as string
      const congresistaId = seleccion.congresista as string

      const data = await registerVote(votante.id, presidenteId, alcaldeId, congresistaId)

      // actualizar estado local y storage
      const updated = { ...votante, voto_emitido: true, fecha_voto: new Date().toISOString() }
      setVotante(updated)
      setCurrentVotante(updated)

      setVotoRecord(data)
      setVotoConfirmado(true)
    } catch (err) {
      console.error('Error registrando voto', err)
      alert('Ocurrió un error al registrar el voto. Intente nuevamente.')
    }
  }

  const handleCerrarSesion = () => {
    // Navega de regreso al login y limpia el estado
    try { clearCurrentVotante() } catch (e) {}
    navigate('/votar');
  };

  // Renderiza resumen de voto si está confirmado
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    )
  }

  if (votoConfirmado) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gray-50">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">¡Voto Registrado Exitosamente!</h2>
            <p className="text-gray-600 text-center max-w-md">
              Su voto ha sido registrado de forma segura y anónima en el sistema electoral. Gracias por ejercer su derecho democrático.
            </p>
          </div>
          {(votante?.fecha_voto || votoRecord?.momento_voto) && (
            <div className="text-sm text-gray-500 mb-4">Hora del voto: {votante?.fecha_voto || votoRecord?.momento_voto}</div>
          )}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 max-w-md w-full p-8 mb-6">
            <h3 className="font-semibold mb-4">Resumen de su Voto</h3>
            <div className="mb-2 flex justify-between"><span>Presidente:</span><span>{candidatosPresidente.find(c => c.id === seleccion.presidente)?.nombre || '-'}</span></div>
            <div className="mb-2 flex justify-between"><span>Alcalde:</span><span>{candidatosAlcalde.find(c => c.id === seleccion.alcalde)?.nombre || '-'}</span></div>
            <div className="mb-2 flex justify-between"><span>Congresista:</span><span>{candidatosCongresista.find(c => c.id === seleccion.congresista)?.nombre || '-'}</span></div>
          </div>
          <div className="max-w-md w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 mb-6">
            Este voto es irreversible y ha sido encriptado para proteger su privacidad. Los resultados oficiales se publicarán una vez finalizado el periodo electoral.
          </div>
          <button className="mt-2 px-6 py-2 rounded-lg bg-gray-900 text-white font-semibold" onClick={handleCerrarSesion}>Cerrar Sesión</button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen px-4 py-12 bg-gray-50">
        {/* Panel superior: nombre y DNI + botón cerrar sesión */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex items-center justify-between mb-8">
          <div>
            <h2 className="font-semibold text-lg">Panel de Votación</h2>
            <p className="text-gray-600">Ciudadano: {votante?.nombre_completo || usuario.nombre} | DNI: {votante?.dni || usuario.dni}</p>
          </div>
          <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50" onClick={handleCerrarSesion}>Cerrar Sesión</button>
        </div>

        {/* Advertencia */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center">
            <svg className="w-5 h-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 17a5 5 0 100-10 5 5 0 000 10z" />
            </svg>
            <span className="text-gray-700">Seleccione un candidato para cada categoría. Una vez confirmado su voto, no podrá modificarlo.</span>
          </div>
        </div>
        {error && (
          <div className="max-w-4xl mx-auto mb-4 text-center text-red-600">{error}</div>
        )}

        {/* Sección Presidente */}
        <CategoriaVotacion
          titulo="Presidente"
          icono={<svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.657 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
          candidatos={candidatosPresidente}
          seleccionado={seleccion.presidente}
          onSeleccion={(id: string) => handleSeleccion('presidente', id)}
          onVerDetalles={(id: string) => setModalCandidato(id)}
        />

        {/* Sección Alcalde */}
        <CategoriaVotacion
          titulo="Alcalde"
          icono={<svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10v11a1 1 0 001 1h16a1 1 0 001-1V10M4 10V7a1 1 0 011-1h14a1 1 0 011 1v3" /></svg>}
          candidatos={candidatosAlcalde}
          seleccionado={seleccion.alcalde}
          onSeleccion={(id: string) => handleSeleccion('alcalde', id)}
          onVerDetalles={(id: string) => setModalCandidato(id)}
        />

        {/* Sección Congresista */}
        <CategoriaVotacion
          titulo="Congresista"
          icono={<svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-3-3h-4a3 3 0 00-3 3v2h5zM9 20H4v-2a3 3 0 013-3h4a3 3 0 013 3v2H9z" /></svg>}
          candidatos={candidatosCongresista}
          seleccionado={seleccion.congresista}
          onSeleccion={(id: string) => handleSeleccion('congresista', id)}
          onVerDetalles={(id: string) => setModalCandidato(id)}
        />

        {/* Botón de confirmación */}
        <div className="max-w-4xl mx-auto mt-10 flex justify-center">
          {seleccion.presidente && seleccion.alcalde && seleccion.congresista ? (
            <button
              className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition-colors"
              onClick={() => setModalConfirm(true)}
            >
              Confirmar mi Voto
            </button>
          ) : (
            <button
              className="px-8 py-3 rounded-lg bg-gray-200 text-gray-500 font-semibold text-lg cursor-not-allowed"
              disabled
            >
              Debe seleccionar todos los candidatos
            </button>
          )}
        </div>

        {/* Modal de detalles de candidato */}
        {modalCandidato && (
          <ModalCandidato
            candidato={candidatos.find(c => c.id === modalCandidato)}
            onClose={() => setModalCandidato(null)}
          />
        )}

        {/* Modal de confirmación final */}
        {modalConfirm && (
          <ModalConfirmacion
            candidatos={{
              presidente: candidatosPresidente.find(c => c.id === seleccion.presidente),
              alcalde: candidatosAlcalde.find(c => c.id === seleccion.alcalde),
              congresista: candidatosCongresista.find(c => c.id === seleccion.congresista),
            }}
            onClose={() => setModalConfirm(false)}
            onConfirm={handleConfirmarVotoAsync}
          />
        )}
      </div>
    </Layout>
  );
}

// Componente para cada categoría de votación
interface CategoriaVotacionProps {
  titulo: string;
  icono?: ReactNode;
  candidatos: Candidato[];
  seleccionado: string | null;
  onSeleccion: (id: string) => void;
  onVerDetalles: (id: string) => void;
}
function CategoriaVotacion({ titulo, icono, candidatos, seleccionado, onSeleccion, onVerDetalles }: CategoriaVotacionProps) {
  if (!candidatos?.length) return null;

  return (
    <div className="max-w-6xl mx-auto mb-10">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 rounded-md bg-blue-50 flex items-center justify-center mr-4">{icono}</div>
        <div>
          <h3 className="font-semibold text-2xl text-gray-900">{titulo}</h3>
          <p className="text-gray-600 text-base">Seleccione un candidato</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {candidatos.map((c: Candidato) => (
          <div
            key={c.id}
            className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-all cursor-pointer ${seleccionado === c.id ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-100'}`}
            onClick={() => onSeleccion(c.id)}
          >
            {c.imagen_storage_url && (
              <div className="w-full h-48 bg-gray-100">
                <img
                  src={c.imagen_storage_url}
                  alt={`Foto de ${c.nombre}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center mb-4">
                {c.partido?.simbolo_storage_url ? (
                  <div className="w-14 h-14 rounded-lg mr-4 bg-gray-100 overflow-hidden">
                    <img
                      src={c.partido.simbolo_storage_url}
                      alt={`Símbolo de ${c.partido.nombre}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-lg mr-4 bg-gray-200 flex items-center justify-center text-gray-400">
                    Sin imagen
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-lg text-gray-900">{c.nombre}</h4>
                  <p className="text-sm text-gray-600">{c.partido?.nombre}</p>
                  {c.profesion && <p className="text-sm text-gray-600">{c.profesion}</p>}
                </div>
                {seleccionado === c.id && (
                  <svg className="w-6 h-6 text-blue-600 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <button
                className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-semibold"
                onClick={e => { e.stopPropagation(); onVerDetalles(c.id); }}
              >
                Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Modal de detalles de candidato
interface ModalCandidatoProps {
  candidato: Candidato | undefined;
  onClose: () => void;
}
function ModalCandidato({ candidato, onClose }: ModalCandidatoProps) {
  if (!candidato) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-xl w-full overflow-hidden">
        {candidato.imagen_storage_url && (
          <div className="w-full h-64 bg-gray-100">
            <img
              src={candidato.imagen_storage_url}
              alt={`Foto de ${candidato.nombre}`}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-8">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 p-2"
            aria-label="Cerrar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex items-center mb-6">
            {candidato.partido?.simbolo_storage_url && (
              <div className="w-14 h-14 rounded-lg mr-4 bg-gray-100 overflow-hidden">
                <img
                  src={candidato.partido.simbolo_storage_url}
                  alt={`Símbolo de ${candidato.partido.nombre}`}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-gray-900">{candidato.nombre}</h2>
              <p className="text-gray-600">Candidato a {candidato.cargo}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {candidato.edad && (
                <div>
                  <span className="text-gray-600">Edad:</span>{' '}
                  <span className="font-medium">{candidato.edad} años</span>
                </div>
              )}
              {candidato.profesion && (
                <div>
                  <span className="text-gray-600">Profesión:</span>{' '}
                  <span className="font-medium">{candidato.profesion}</span>
                </div>
              )}
            </div>
            <div>
              <span className="text-gray-600">Partido:</span>{' '}
              <span className="font-medium">{candidato.partido?.nombre}</span>
            </div>

            {candidato.experiencia && (
              <div>
                <h4 className="font-semibold mt-4">Experiencia</h4>
                <p className="text-gray-700 whitespace-pre-wrap">{candidato.experiencia}</p>
              </div>
            )}

            {candidato.propuestas_detalladas && (
              <div>
                <h4 className="font-semibold mt-4">Propuestas Detalladas</h4>
                <div className="text-gray-700 whitespace-pre-wrap">
                  {candidato.propuestas_detalladas}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Modal de confirmación final
interface ModalConfirmacionProps {
  candidatos: {
    presidente?: Candidato;
    alcalde?: Candidato;
    congresista?: Candidato;
  };
  onClose: () => void;
  onConfirm: () => void;
}
function ModalConfirmacion({ candidatos, onClose, onConfirm }: ModalConfirmacionProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden p-8">
        <div className="flex items-center mb-4">
          <svg className="w-7 h-7 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 17a5 5 0 100-10 5 5 0 000 10z" />
          </svg>
          <h2 className="text-lg font-bold text-orange-600">¡ATENCIÓN! Confirmación Final</h2>
        </div>
        <p className="mb-4 text-gray-700">
          Está a punto de confirmar su voto. Una vez que confirme, su voto es <span className="font-bold">IRREVERSIBLE</span> y no podrá ser modificado bajo ninguna circunstancia.
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <div className="mb-2"><span className="font-semibold">Presidente:</span> {candidatos.presidente?.nombre || '-'}</div>
          <div className="mb-2"><span className="font-semibold">Alcalde:</span> {candidatos.alcalde?.nombre || '-'}</div>
          <div><span className="font-semibold">Congresista:</span> {candidatos.congresista?.nombre || '-'}</div>
        </div>
        <p className="mb-6 text-gray-700">¿Está seguro de que desea confirmar su voto con esta selección?</p>
        <div className="flex justify-end gap-4">
          <button className="px-5 py-2 rounded-lg bg-gray-100 text-gray-800 font-semibold" onClick={onClose}>Revisar mi Selección</button>
          <button className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold" onClick={onConfirm}>Sí, Confirmar mi Voto</button>
        </div>
      </div>
    </div>
  );
}
