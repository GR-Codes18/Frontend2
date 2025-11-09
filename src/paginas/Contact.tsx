import Layout from '../componentes/Layout'

export default function Contact() {
  return (
    <Layout>
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-semibold text-gray-900">Contacto y Atención al Ciudadano</h1>
          <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
            Estamos aquí para ayudarte. Encuentra nuestros canales de atención y conoce cómo presentar un reclamo.
          </p>
        </div>

        {/* Canales de Atención */}
        <div className="max-w-6xl mx-auto mb-10">
          <h2 className="text-lg font-medium text-gray-800 mb-6">Canales de Atención</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-md bg-blue-50 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Correo Electrónico</h3>
                  <p className="text-sm text-gray-600 mt-3">Para consultas, dudas o reportar problemas técnicos:</p>
                  <a href="mailto:atencion@sistemaelectoral.gob.pe" className="block mt-4 text-blue-600 font-medium">atencion@sistemaelectoral.gob.pe</a>
                  <p className="text-xs text-gray-500 mt-4">Tiempo de respuesta: 24-48 horas hábiles</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-md bg-green-50 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h1.5a1 1 0 01.95.684L9 7h6l1.55-3.316A1 1 0 0117.5 1H19a2 2 0 012 2v4a2 2 0 01-2 2h-1l-1 2v3a2 2 0 01-2 2H9a2 2 0 01-2-2v-3L6 9H5a2 2 0 01-2-2V5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Línea Telefónica</h3>
                  <p className="text-sm text-gray-600 mt-3">Atención telefónica de lunes a viernes:</p>
                  <p className="mt-4 text-2xl font-medium text-gray-900">(01) 311-3000</p>
                  <p className="text-xs text-gray-500 mt-3">Horario: 8:00 AM - 6:00 PM</p>
                  <p className="text-xs text-gray-500 mt-2">Opción 1: Soporte técnico | Opción 2: Consultas generales</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Libro de Reclamaciones */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl border border-gray-100 shadow-sm p-8 mb-10">
          <div className="inline-flex items-start mb-4">
            <div className="w-10 h-10 rounded-md bg-orange-50 flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6M9 16h6M9 8h6M5 6v12a2 2 0 002 2h10a2 2 0 002-2V6" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Libro de Reclamaciones</h3>
              <p className="text-sm text-gray-600 mt-2">Procedimiento para quejas y reclamos formales</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">Si estás insatisfecho o disconforme con la atención brindada en una entidad pública, puedes presentar una queja o reclamo en su Libro de Reclamaciones. Este es un derecho que te permite expresar tu disconformidad de manera formal y obtener una respuesta oficial de la institución.</p>

          <h4 className="font-semibold mb-4">Pasos para Presentar tu Reclamo</h4>

          <ol className="space-y-6">
            <li className="flex">
              <div className="flex-shrink-0">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">1</div>
              </div>
              <div className="ml-4">
                <p className="font-semibold">Pide el Libro de Reclamaciones</p>
                <p className="text-gray-700 mt-2">Dirígete a la oficina de atención al público del Sistema Electoral Digital o a cualquier oficina del organismo electoral de tu región. Solicita el Libro de Reclamaciones al personal encargado.</p>
                <div className="mt-3 bg-gray-50 border border-gray-100 rounded p-3 text-sm text-gray-700">
                  <p className="mb-1"><strong>Dónde:</strong> Mesa de partes o módulo de atención ciudadana</p>
                  <p className="mb-1"><strong>Qué decir:</strong> "Deseo presentar un reclamo en el Libro de Reclamaciones"</p>
                  <p className="mb-0"><strong>Requiere:</strong> No es necesario presentar documentos para solicitarlo</p>
                </div>
              </div>
            </li>

            <li className="flex">
              <div className="flex-shrink-0">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">2</div>
              </div>
              <div className="ml-4">
                <p className="font-semibold">Presenta tu Reclamo</p>
                <p className="text-gray-700 mt-2">Completa el formulario del Libro de Reclamaciones con la información requerida. Asegúrate de ser claro y específico sobre tu inconformidad.</p>
                <div className="mt-3 bg-gray-50 border border-gray-100 rounded p-3 text-sm text-gray-700">
                  <p className="font-medium mb-2">Información que debes incluir:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Tus datos personales completos (nombre, DNI, contacto)</li>
                    <li>Descripción detallada del problema o inconformidad</li>
                    <li>Fecha y hora en que ocurrió el hecho</li>
                    <li>Nombre del personal involucrado (si aplica)</li>
                    <li>Pedido específico o solución que esperas</li>
                    <li>Adjuntar pruebas si las tienes (opcional pero recomendado)</li>
                  </ul>
                </div>
              </div>
            </li>

            <li className="flex">
              <div className="flex-shrink-0">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">3</div>
              </div>
              <div className="ml-4">
                <p className="font-semibold">Haz el Seguimiento</p>
                <p className="text-gray-700 mt-2">Una vez presentado tu reclamo, el personal te entregará una copia sellada y un código de seguimiento. Guarda este documento, ya que te permitirá hacer seguimiento de tu caso.</p>
                <div className="mt-3 bg-gray-50 border border-gray-100 rounded p-3 text-sm text-gray-700">
                  <p className="mb-1"><strong>Código de seguimiento:</strong> Anota o fotografía el número que te proporcionan</p>
                  <p className="mb-1"><strong>Copia sellada:</strong> Conserva tu copia como comprobante</p>
                  <p className="mb-1"><strong>Correo de notificación:</strong> Te enviarán actualizaciones al correo que proporcionaste</p>
                  <p className="mb-0"><strong>Plazo de respuesta:</strong> La entidad tiene un máximo de 30 días calendarios para responderte</p>
                </div>
              </div>
            </li>
          </ol>

          <div className="mt-6 border border-orange-200 bg-orange-50 rounded p-4 text-sm text-orange-800">
            <strong>Nota Importante</strong>
            <p className="mt-2">Si la entidad necesita más datos para evaluar tu reclamo, te notificará a través del correo electrónico o teléfono que proporcionaste. Tendrás un plazo de <strong>2 días hábiles</strong> para enviar la información adicional solicitada. Si no envías la información en el plazo indicado, la entidad puede archivar tu reclamo como "incompleto", pero podrás registrar uno nuevo con toda la información completa cuando lo desees.</p>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-100 rounded p-4 text-sm text-blue-900">
            <strong>Derechos del Reclamante</strong>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Derecho a recibir una respuesta clara y oportuna</li>
              <li>Derecho a que tu reclamo sea evaluado de manera imparcial</li>
              <li>Derecho a presentar reclamos sin represalias</li>
              <li>Derecho a recibir una copia sellada de tu reclamo</li>
              <li>Derecho a hacer seguimiento del estado de tu caso</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}
