import { Home, UserPlus, Users, UsersRound } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

const navItems = [
  { icon: <Home size={20} />, label: 'Inicio', to: '/' },
  { icon: <UserPlus size={20} />, label: 'Agregar Paciente', to: '/paciente/nuevo' },
  { icon: <UsersRound size={20} />, label: 'Pacientes', to: '/paciente/lista' },
]

export function AppSidebar() {

  const pathName = useLocation();

  return (
    <aside className="w-64 bg-white shadow" >
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            className={`
                  flex items-center gap-3 p-3 rounded-lg text-gray-600
                  hover:bg-indigo-50 hover:text-primary transition-colors
                  relative
                `}
          >

            <div className={`absolute left-0 w-1 h-8 ${pathName.pathname === item.to ? 'bg-primary' : 'bg-transparent'} rounded-r-md`} />

            <div className="flex items-center justify-center">
              {item.icon}
            </div>
            <span>
              {item.label}
            </span>

          </Link>
        ))}
      </nav>
    </aside>
  )
}