import Layout from '../componentes/Layout'

export default function InstitutionalInfo() {
  return (
    <Layout>
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-semibold text-gray-900">Información Institucional</h1>
          <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
            Conoce nuestra misión, visión y los valores que guían el Sistema Electoral Digital del Perú.
          </p>
        </div>

        {/* ¿Qué hacemos? - caja grande */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl border border-gray-100 shadow-sm p-8 mb-10">
          <h2 className="text-lg font-semibold mb-4">¿Qué hacemos?</h2>
          <p className="text-gray-700 leading-relaxed">
            Somos la plataforma oficial dedicada a modernizar y democratizar el proceso electoral mediante
            el uso de tecnología digital segura y accesible. Nuestro sistema permite a los ciudadanos peruanos
            ejercer su derecho al voto de manera remota, manteniendo los más altos estándares de seguridad,
            transparencia e integridad electoral.
          </p>

          <p className="text-gray-700 leading-relaxed mt-6">
            Trabajamos en estrecha colaboración con los organismos electorales nacionales para garantizar que
            cada voto cuente y que el proceso democrático se fortalezca a través de la innovación tecnológica.
            Nuestro compromiso es hacer que la participación ciudadana sea más accesible para todos los peruanos,
            independientemente de su ubicación geográfica o situación personal.
          </p>
        </div>

        {/* Misión / Visión */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
            <div className="inline-flex items-center mb-4">
              <div className="w-12 h-12 rounded-md bg-blue-50 flex items-center justify-center mr-4">
                {/* icono simple */}
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3v7h6v-7c0-1.657-1.343-3-3-3zM12 3v2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Misión</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Facilitar el ejercicio democrático del voto mediante una plataforma digital segura, transparente y
              accesible que fortalezca la participación ciudadana y garantice la integridad de los procesos electorales
              en el Perú.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
            <div className="inline-flex items-center mb-4">
              <div className="w-12 h-12 rounded-md bg-purple-50 flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Visión</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Ser el sistema electoral digital líder en América Latina, reconocido por su innovación, seguridad
              y contribución a la consolidación democrática, alcanzando una participación ciudadana amplia y
              confiable en todos los procesos electorales.
            </p>
          </div>
        </div>

        {/* Nuestros Valores */}
        <div className="max-w-6xl mx-auto bg-white rounded-xl border border-gray-100 shadow-sm p-8 mb-10">
          <div className="inline-flex items-center mb-6">
            <div className="w-10 h-10 rounded-md bg-green-50 flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4l3 9 4-18 3 9h4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Nuestros Valores</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex">
                <div className="w-1 bg-blue-500 mr-4 rounded" />
                <div>
                  <h4 className="font-semibold">Transparencia</h4>
                  <p className="text-gray-700">Operamos con total apertura y claridad en todos nuestros procesos, permitiendo la verificación y auditoría del sistema.</p>
                </div>
              </div>

              <div className="flex">
                <div className="w-1 bg-blue-500 mr-4 rounded" />
                <div>
                  <h4 className="font-semibold">Inclusión</h4>
                  <p className="text-gray-700">Diseñamos servicios accesibles para todos los ciudadanos, sin importar su nivel tecnológico o ubicación.</p>
                </div>
              </div>

              <div className="flex">
                <div className="w-1 bg-blue-500 mr-4 rounded" />
                <div>
                  <h4 className="font-semibold">Innovación</h4>
                  <p className="text-gray-700">Nos mantenemos a la vanguardia tecnológica para ofrecer la mejor experiencia de votación digital.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex">
                <div className="w-1 bg-blue-500 mr-4 rounded" />
                <div>
                  <h4 className="font-semibold">Seguridad</h4>
                  <p className="text-gray-700">Protegemos la integridad de cada voto y la privacidad de cada ciudadano con tecnología de encriptación de última generación.</p>
                </div>
              </div>

              <div className="flex">
                <div className="w-1 bg-blue-500 mr-4 rounded" />
                <div>
                  <h4 className="font-semibold">Integridad</h4>
                  <p className="text-gray-700">Actuamos con honestidad y ética en cada decisión, garantizando procesos justos para todos.</p>
                </div>
              </div>

              <div className="flex">
                <div className="w-1 bg-blue-500 mr-4 rounded" />
                <div>
                  <h4 className="font-semibold">Servicio</h4>
                  <p className="text-gray-700">Nos dedicamos a servir a la ciudadanía con excelencia, respondiendo a sus necesidades y preocupaciones.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Políticas del Sistema */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl border border-gray-100 shadow-sm p-8 mb-20">
          <div className="inline-flex items-center mb-6">
            <div className="w-10 h-10 rounded-md bg-orange-50 flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6M9 16h6M9 8h6M5 6v12a2 2 0 002 2h10a2 2 0 002-2V6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Políticas del Sistema</h3>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold">Política de Privacidad</h4>
              <p className="text-gray-700">Nos comprometemos a proteger la información personal de todos los usuarios. Los datos de identificación se utilizan exclusivamente para verificar la identidad del votante y prevenir el fraude electoral. El voto es completamente anónimo y no puede ser rastreado hasta el votante individual.</p>
            </div>

            <div>
              <h4 className="font-semibold">Política de Seguridad</h4>
              <p className="text-gray-700">Implementamos protocolos de seguridad de nivel bancario, incluyendo encriptación SSL/TLS, autenticación de dos factores y auditorías de seguridad regulares. Nuestros servidores están protegidos contra ataques cibernéticos y cuentan con respaldo constante.</p>
            </div>

            <div>
              <h4 className="font-semibold">Política de Accesibilidad</h4>
              <p className="text-gray-700">El sistema está diseñado siguiendo las pautas WCAG 2.1 para garantizar el acceso a personas con discapacidades. Ofrecemos soporte técnico gratuito para asistir a cualquier ciudadano que necesite ayuda para votar.</p>
            </div>

            <div>
              <h4 className="font-semibold">Política de Transparencia</h4>
              <p className="text-gray-700">Todos los resultados electorales son públicos y verificables. Los algoritmos de conteo son auditados por organismos independientes y los ciudadanos pueden solicitar información sobre el proceso mediante los canales oficiales.</p>
            </div>

            <div>
              <h4 className="font-semibold">Política de Irreversibilidad del Voto</h4>
              <p className="text-gray-700">Una vez que el voto es confirmado, este se registra de manera permanente y no puede ser modificado o anulado. Esta política garantiza la integridad del proceso electoral y previene manipulaciones posteriores.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
