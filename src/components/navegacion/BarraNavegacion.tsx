import { Link } from 'react-router-dom'
import type { TabNavegacion } from '@/types'

interface Props {
  tabActiva: TabNavegacion
}

const tabs = [
  { id: 'buscar' as TabNavegacion, icono: '🔍', etiqueta: 'Buscar', ruta: '/' },
  { id: 'reservas' as TabNavegacion, icono: '🔖', etiqueta: 'Reservas', ruta: '/mis-reservas' },
  { id: 'cuenta' as TabNavegacion, icono: '👤', etiqueta: 'Cuenta', ruta: '/cuenta' },
]

export function BarraNavegacion({ tabActiva }: Props) {
  return (
    <nav className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-97.5 bg-crema/93 border-t border-cafe/7 flex items-center justify-around px-7.5 pt-2 pb-6.5">
      {tabs.map((tab) => {
        const estaActiva = tabActiva === tab.id
        return (
          <Link key={tab.id} to={tab.ruta} className="flex flex-col items-center gap-0.75">
            <span className="text-[22px]">{tab.icono}</span>
            <span className={`font-body font-medium text-[10px] ${estaActiva ? 'text-amarillo' : 'text-cafe-atenuado'}`}>
              {tab.etiqueta}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
