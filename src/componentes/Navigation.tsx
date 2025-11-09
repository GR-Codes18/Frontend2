import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <header className="bg-white border-b">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center space-x-3">
          <div className="text-xl font-semibold">Elecciones Digitales</div>
        </div>
        <nav className="space-x-4">
          <Link to="/" className="text-sm text-gray-700 hover:text-blue-600">Inicio</Link>
          <Link to="/partidos" className="text-sm text-gray-700 hover:text-blue-600">Partidos Políticos</Link>
          <Link to="/institucional" className="text-sm text-gray-700 hover:text-blue-600">Información Institucional</Link>
          <Link to="/votar" className="text-sm text-gray-700 hover:text-blue-600">Votaciones</Link>
          <Link to="/contacto" className="text-sm text-gray-700 hover:text-blue-600">Contacto</Link>
        </nav>
      </div>
    </header>
  )
}
