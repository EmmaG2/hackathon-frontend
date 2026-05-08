import { Link } from 'react-router-dom'
import { LayoutDashboard, Grid2x2, BookMarked, UtensilsCrossed, Users, BarChart3 } from 'lucide-react'
import type { TabNavLateral } from '@/types'
import type { LucideIcon } from 'lucide-react'

interface Props {
  tabActiva: TabNavLateral
}

interface ElementoNav {
  id: TabNavLateral
  Icono: LucideIcon
  etiqueta: string
  ruta: string
  insignia?: number
}

const elementos: ElementoNav[] = [
  { id: 'hoy',      Icono: LayoutDashboard,  etiqueta: 'Hoy',      ruta: '/dashboard'           },
  { id: 'mesas',    Icono: Grid2x2,          etiqueta: 'Mesas',    ruta: '/dashboard/mesas'     },
  { id: 'reservas', Icono: BookMarked,        etiqueta: 'Reservas', ruta: '/dashboard/reservas', insignia: 8 },
  { id: 'menu',     Icono: UtensilsCrossed,   etiqueta: 'Menú',     ruta: '/dashboard/menu'      },
  { id: 'equipo',   Icono: Users,             etiqueta: 'Equipo',   ruta: '/dashboard/equipo'    },
  { id: 'reportes', Icono: BarChart3,         etiqueta: 'Reportes', ruta: '/dashboard/reportes'  },
]

export function NavLateral({ tabActiva }: Props) {
  return (
    <aside className="w-[230px] min-h-screen bg-arena-oscura border-r border-cafe/7 flex flex-col px-3.5 pt-5.5 pb-5 gap-0.5">
      <div className="flex items-center gap-2.5 px-2 pb-5.5">
        <div className="bg-amarillo w-8 h-8 rounded-[9px] flex items-center justify-center shrink-0">
          <span className="font-body font-bold text-[14px] text-cafe-texto">cp</span>
        </div>
        <div className="flex flex-col gap-px">
          <span className="font-body font-semibold text-[13px] text-cafe">Casa Paloma</span>
          <span className="font-body text-[11px] text-cafe-atenuado">Roma Norte</span>
        </div>
      </div>

      {elementos.map(({ id, Icono, etiqueta, ruta, insignia }) => {
        const estaActivo = tabActiva === id
        return (
          <Link
            key={id}
            to={ruta}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] transition-colors ${
              estaActivo ? 'bg-white' : 'hover:bg-white/50'
            }`}
          >
            {estaActivo && <div className="bg-amarillo w-0.5 h-5 rounded-px shrink-0" />}
            <Icono size={16} className={estaActivo ? 'text-cafe' : 'text-cafe-atenuado'} />
            <span className={`flex-1 font-body text-[13px] ${estaActivo ? 'font-semibold text-cafe' : 'font-medium text-cafe-atenuado'}`}>
              {etiqueta}
            </span>
            {insignia && (
              <div className="bg-amarillo px-1.5 py-0.5 rounded-full">
                <span className="font-body font-bold text-[10px] text-cafe-texto">{insignia}</span>
              </div>
            )}
          </Link>
        )
      })}
    </aside>
  )
}
