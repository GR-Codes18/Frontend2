// Removed unused default React import (using the automatic JSX runtime)

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-12">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold text-lg">Sistema Electoral Digital</h4>
          <p className="mt-3 text-sm text-gray-400">Plataforma oficial para ejercer tu derecho al voto de manera segura y transparente.</p>
        </div>

        <div>
          <h4 className="font-semibold text-lg">Enlaces Importantes</h4>
          <ul className="mt-3 text-sm text-gray-400 space-y-2">
            <li>Información Institucional</li>
            <li>Partidos Políticos</li>
            <li>Contacto</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg">Seguridad</h4>
          <p className="mt-3 text-sm text-gray-400">Tu voto es secreto y está protegido con los más altos estándares de seguridad digital.</p>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container py-4 text-center text-sm text-gray-500">© {new Date().getFullYear()} Sistema Electoral Digital - Gobierno del Perú. Todos los derechos reservados.</div>
      </div>
    </footer>
  )
}
