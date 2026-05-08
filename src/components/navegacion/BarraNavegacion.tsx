import { Link } from 'react-router-dom'
import { Search, Bookmark, User } from 'lucide-react'
import type { TabNavegacion } from '@/types'

interface Props {
  tabActiva: TabNavegacion
}

const tabs = [
  { id: 'buscar' as TabNavegacion, icono: Search, etiqueta: 'Buscar', ruta: '/explorar' },
  { id: 'reservas' as TabNavegacion, icono: Bookmark, etiqueta: 'Reservas', ruta: '/mis-reservas' },
  { id: 'cuenta' as TabNavegacion, icono: User, etiqueta: 'Cuenta', ruta: '/cuenta' },
]

export function BarraNavegacion({ tabActiva }: Props) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-crema/93 backdrop-blur-md border-t border-cafe/7 flex items-center justify-around px-7.5 pt-2 pb-6.5 z-50">
      {tabs.map((tab) => {
        const estaActiva = tabActiva === tab.id
        const Icono = tab.icono
        return (
          <Link key={tab.id} to={tab.ruta} className="flex flex-col items-center gap-0.75">
            <Icono className={`w-[22px] h-[22px] ${estaActiva ? 'text-amarillo' : 'text-cafe-atenuado'}`} />
            <span className={`font-body font-medium text-[10px] ${estaActiva ? 'text-amarillo' : 'text-cafe-atenuado'}`}>
              {tab.etiqueta}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
