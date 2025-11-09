import { useState, useEffect, type FormEvent } from 'react';
import Layout from '../componentes/Layout';
import { useNavigate } from 'react-router-dom';
import { getVotanteByDni } from '../lib/votes';
import { setCurrentVotante } from '../lib/user';

export default function VotingLogin() {
  const [dni, setDni] = useState('');
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Buscar votante cuando el DNI tiene 8 dígitos
  useEffect(() => {
    let mounted = true
    async function lookup() {
      if (!/^[0-9]{8}$/.test(dni)) return
      setLoading(true)
      try {
        const { data, error } = await getVotanteByDni(dni)
        if (!mounted) return
        if (error) {
          // Si hay error o no se encuentra el DNI, mostramos error
          setError('DNI no encontrado en el sistema.')
          setNombre('')
        } else if (data) {
          setNombre(data.nombre_completo || '')
          // guardar en localStorage
          try { setCurrentVotante({ id: data.id, dni: data.dni, nombre_completo: data.nombre_completo, voto_emitido: data.voto_emitido, fecha_voto: data.fecha_voto }) } catch (e) {}
        }
      } catch (err) {
        setNombre('')
        setError('Error al verificar el DNI.')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    lookup()
    return () => { mounted = false }
  }, [dni])

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (!/^\d{8}$/.test(dni)) {
        setError('El DNI debe tener 8 dígitos.');
        return;
      }
      // Validamos que tengamos el nombre autocompletado (seguridad adicional)
      if (!nombre.trim()) {
        setError('No se encontró nombre asociado al DNI.');
        return;
      }
      setError('');
      // Verificar que el votante exista en la base de datos y guardar en localStorage
      const { data: votante, error: votErr } = await getVotanteByDni(dni);
      if (votErr || !votante) {
        setError('DNI no encontrado en el sistema.');
        return;
      }
      try { setCurrentVotante({ id: votante.id, dni: votante.dni, nombre_completo: votante.nombre_completo, voto_emitido: votante.voto_emitido, fecha_voto: votante.fecha_voto }) } catch (e) {}
      // Navega al panel de votación pasando el estado para render inmediato
      navigate('/panel-votacion', { state: { nombre: votante.nombre_completo, dni: votante.dni } });
    };

    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gray-50">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17v1m0-8a4 4 0 014 4v1a4 4 0 01-8 0v-1a4 4 0 014-4zm0 0V5a2 2 0 114 0v4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Acceso a Votaciones</h2>
            <p className="mt-2 text-gray-600 text-center max-w-md">
              Ingrese su DNI para acceder al sistema de votación seguro
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md border border-gray-100 max-w-md w-full p-8 mb-6">
            <div className="mb-6">
              <label className="block font-semibold mb-2">Documento Nacional de Identidad (DNI)</label>
              <input
                type="text"
                value={dni}
                onChange={e => {
                  const v = e.target.value.replace(/[^\d]/g, '')
                  setDni(v)
                  setError('')
                  if (v.length < 8) setNombre('')
                }}
                maxLength={8}
                className="w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="12345678"
              />
              <p className="text-xs text-gray-500 mt-1">Ingrese sus 8 dígitos sin espacios ni guiones</p>
            </div>
            <div className="mb-6">
              <label className="block font-semibold mb-2">Nombre Completo</label>
              <input
                type="text"
                value={nombre}
                readOnly={true}
                className="w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-700 focus:outline-none opacity-80"
                placeholder="Nombre se completará automáticamente"
              />
              {loading && <div className="mt-2 text-sm text-gray-600">Buscando en padrón...</div>}
              <p className="text-xs text-gray-500 mt-1">El nombre se obtiene del padrón electoral y no puede editarse aquí.</p>
            </div>
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold text-base transition-colors ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-blue-700'}`}
            >
              {loading ? 'Verificando...' : 'Ingresar al Sistema de Votación'}
            </button>

            <div className="mt-8 border-t pt-6">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19v2m0-8V5a2 2 0 114 0v4" />
                </svg>
                <span className="font-semibold text-gray-800">Seguridad Garantizada</span>
              </div>
              <p className="text-xs text-gray-600">
                Tu información está protegida con encriptación de nivel bancario. El voto es completamente anónimo y secreto.
              </p>
            </div>
          </form>

          <div className="max-w-md w-full bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
            <span className="font-semibold">Importante</span>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Solo puede votar una vez por proceso electoral</li>
              <li>Una vez confirmado, su voto no puede ser modificado</li>
              <li>Mantenga sus credenciales seguras y no las comparta</li>
              <li>Si tiene problemas para acceder, contacte con soporte técnico</li>
            </ul>
          </div>
        </div>
      </Layout>
    );
  }
