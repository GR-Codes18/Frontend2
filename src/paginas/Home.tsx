import Layout from '../componentes/Layout'

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-500 text-white py-20 rounded-lg mb-10">
        <div className="container text-center">
          <h1 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-semibold">Bienvenido al Sistema Electoral Digital del Perú</h1>
          <p className="mt-6 text-lg md:text-xl opacity-90">Ejerce tu derecho democrático de manera segura, transparente y accesible</p>
          <p className="mt-6 text-lg md:text-xl opacity-90">Desde cualquier lugar, con la información que necesitas para decidir con confianza.</p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <span className="inline-flex items-center gap-2 bg-white/10 px-5 py-3 rounded-md">🔒 100% Seguro</span>
            <span className="inline-flex items-center gap-2 bg-white/10 px-5 py-3 rounded-md">✅ Verificado</span>
            <span className="inline-flex items-center gap-2 bg-white/10 px-5 py-3 rounded-md">👥 Transparente</span>
          </div>
        </div>
      </section>

      {/* ¿Qué hacemos? */}
      <section className="mb-12">
        <div className="container">
          <h2 className="text-2xl font-semibold text-center mb-6">¿Qué es el Sistema Electoral Digital?</h2>

          <div className="card mb-8">
            <p className="text-gray-700">El Sistema Electoral Digital es una plataforma oficial del Gobierno del Perú diseñada para modernizar y facilitar el ejercicio del voto ciudadano. A través de esta plataforma, los ciudadanos peruanos pueden participar en procesos electorales de manera remota, segura y transparente. <br /> <br />

Nuestro sistema utiliza tecnología de encriptación avanzada y mecanismos de autenticación robustos para garantizar la integridad de cada voto. Cada ciudadano puede votar una única vez, y el proceso está diseñado para mantener el anonimato y la privacidad de las decisiones electorales. <br /> <br />

Con esta herramienta, buscamos aumentar la participación ciudadana, reducir costos operativos y brindar mayor accesibilidad a todos los peruanos, especialmente aquellos que se encuentran en el extranjero o tienen dificultades para desplazarse a centros de votación tradicionales.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <div className="text-2xl">🔐</div>
              <h3 className="font-semibold mt-3">Seguridad Garantizada</h3>
              <p className="mt-2 text-sm text-gray-600">Protección mediante encriptación de extremo a extremo y autenticación con DNI.</p>
            </div>

            <div className="card">
              <div className="text-2xl">⚠️</div>
              <h3 className="font-semibold mt-3">Voto Irreversible</h3>
              <p className="mt-2 text-sm text-gray-600">Una vez confirmado, tu voto es definitivo, garantizando la integridad del proceso.</p>
            </div>

            <div className="card">
              <div className="text-2xl">♿</div>
              <h3 className="font-semibold mt-3">Accesible para Todos</h3>
              <p className="mt-2 text-sm text-gray-600">Diseñado para ser fácil de usar, incluso para personas con poca experiencia tecnológica.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Cómo Funciona? */}
      <section className="mb-12">
        <div className="container">
          <h2 className="text-2xl font-semibold text-center mb-6">¿Cómo Funciona?</h2>

          <div className="space-y-6">
            <div className="flex items-center bg-white rounded-lg shadow p-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">1</div>
              <div className="ml-6">
                <h4 className="font-semibold">Identifícate</h4>
                <p className="text-sm text-gray-600">Ingresa tu DNI y nombre completo para acceder al sistema de votación de manera segura.</p>
              </div>
            </div>

            <div className="flex items-center bg-white rounded-lg shadow p-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">2</div>
              <div className="ml-6">
                <h4 className="font-semibold">Infórmate</h4>
                <p className="text-sm text-gray-600">Revisa la información de los candidatos y partidos políticos antes de tomar tu decisión.</p>
              </div>
            </div>

            <div className="flex items-center bg-white rounded-lg shadow p-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">3</div>
              <div className="ml-6">
                <h4 className="font-semibold">Vota</h4>
                <p className="text-sm text-gray-600">Selecciona tus candidatos para Presidente, Alcalde y Congresistas de manera sencilla.</p>
              </div>
            </div>

            <div className="flex items-center bg-white rounded-lg shadow p-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">4</div>
              <div className="ml-6">
                <h4 className="font-semibold">Confirma</h4>
                <p className="text-sm text-gray-600">Revisa tu selección y confirma tu voto. Recuerda que esta acción es irreversible.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
