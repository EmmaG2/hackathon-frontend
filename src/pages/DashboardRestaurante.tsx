import { NavLateral } from '@/components/navegacion/NavLateral'
import { TarjetaEstadistica } from '@/components/dashboard/TarjetaEstadistica'
import { FilaReserva } from '@/components/dashboard/FilaReserva'
import type { Mesa, ReservaEnFila } from '@/types'

const MESAS_SALON: Mesa[] = [
  { id: 1, estado: 'ocupada' }, { id: 2, estado: 'ocupada' }, { id: 3, estado: 'libre' },
  { id: 4, estado: 'ocupada' }, { id: 5, estado: 'reservada' }, { id: 6, estado: 'ocupada' },
  { id: 7, estado: 'ocupada' }, { id: 8, estado: 'libre' },
  { id: 9, estado: 'ocupada' }, { id: 10, estado: 'libre' },
  { id: 11, estado: 'ocupada' }, { id: 12, estado: 'ocupada' },
  { id: 13, estado: 'libre' }, { id: 14, estado: 'reservada' },
]

const FILA_HOY: ReservaEnFila[] = [
  { id: '1', hora: '19:00', nombre: 'Mariana Esquivel', estado: 'sentada', personas: 2, mesa: 'M3' },
  { id: '2', hora: '19:30', nombre: 'Daniel Ortega', estado: 'confirmada', personas: 4, mesa: 'M7' },
  { id: '3', hora: '20:00', nombre: 'Familia Reyes', estado: 'confirmada', personas: 6, mesa: 'M14' },
  { id: '4', hora: '20:00', nombre: 'Carlos H.', estado: 'pendiente', personas: 2 },
  { id: '5', hora: '20:30', nombre: 'Ana & Lucía', estado: 'pendiente', personas: 2 },
]

const estilosMesa = {
  libre: 'bg-mesa-libre border border-mesa-ocupada',
  ocupada: 'bg-mesa-ocupada border border-mesa-borde',
  reservada: 'bg-transparent border-2 border-dashed border-amarillo',
}

const leyenda = [
  { estado: 'libre' as const, etiqueta: 'Libre', clase: 'bg-mesa-libre border border-cafe/50' },
  { estado: 'ocupada' as const, etiqueta: 'Ocupada', clase: 'bg-cafe border border-cafe/50' },
  { estado: 'reservada' as const, etiqueta: 'Reservada', clase: 'bg-crema border border-dashed border-amarillo/50' },
]

const resumenMesas = [
  { etiqueta: 'Libres', valor: 4, color: 'bg-mesa-libre' },
  { etiqueta: 'Ocupadas', valor: 10, color: 'bg-mesa-ocupada' },
  { etiqueta: 'Reservadas', valor: 2, color: 'bg-amarillo' },
]

export function DashboardRestaurante() {
  return (
    <div className="flex min-h-screen bg-crema">
      <NavLateral tabActiva="hoy" />

      <main className="flex-1 flex flex-col gap-5.5 px-7 pt-5.5 pb-8 overflow-auto">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-body font-medium text-[11px] text-cafe-atenuado">
              Jueves 7 de Mayo, 2026 · 20:14
            </p>
            <h1 className="font-display text-[28px] text-cafe">
              8 reservas · noche ocupada
            </h1>
          </div>
          <div className="flex gap-2.5">
            <button className="bg-white border border-cafe/12 rounded-full px-4 py-2.5">
              <span className="font-body font-semibold text-[13px] text-cafe">📅 Hoy</span>
            </button>
            <button className="bg-amarillo rounded-full px-4 py-2.5">
              <span className="font-body font-semibold text-[13px] text-cafe-texto">
                + Reserva manual
              </span>
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <TarjetaEstadistica titulo="Reservas hoy" valor="8" descripcion="2 pendientes" />
          <TarjetaEstadistica titulo="Ocupación" valor="70%" descripcion="14/20 mesas">
            <div className="relative w-13 h-13">
              <svg viewBox="0 0 52 52" className="rotate-[-90deg]">
                <circle cx="26" cy="26" r="22" fill="none" stroke="var(--color-arena)" strokeWidth="4" />
                <circle
                  cx="26" cy="26" r="22" fill="none"
                  stroke="var(--color-amarillo-oscuro)" strokeWidth="4"
                  strokeDasharray={`${0.7 * 2 * Math.PI * 22} ${2 * Math.PI * 22}`}
                />
              </svg>
            </div>
          </TarjetaEstadistica>
          <TarjetaEstadistica
            titulo="Próxima reserva"
            valor="20 min"
            descripcion="Daniel Ortega · 4 pers."
          />
          <TarjetaEstadistica
            titulo="Cubiertos esta noche"
            valor="28"
            descripcion="Meta 30 cubiertos"
          />
        </div>

        <div className="flex gap-5.5">
          <div className="flex-1 bg-white border border-cafe/7 rounded-[20px] p-4.5">
            <div className="flex items-start justify-between mb-3.5">
              <div>
                <h2 className="font-display text-[18px] text-cafe">Plano del salón</h2>
                <p className="font-body text-[12px] text-cafe-atenuado">
                  Toca una mesa para cambiar su estado · 4 libres · 2 reservadas
                </p>
              </div>
              <button className="bg-arena border border-cafe/10 rounded-full px-3 py-2">
                <span className="font-body font-medium text-[12px] text-cafe-atenuado">⊞ Editar layout</span>
              </button>
            </div>
            <div className="flex gap-4.5">
              <div className="flex-1 bg-arena border border-cafe/7 rounded-[16px] p-4 min-h-[280px]">
                <div className="flex flex-wrap gap-2">
                  {MESAS_SALON.map((mesa) => (
                    <div
                      key={mesa.id}
                      className={`w-9 h-9 rounded-[12px] ${estilosMesa[mesa.estado]}`}
                      title={`Mesa ${mesa.id} · ${mesa.estado}`}
                    />
                  ))}
                </div>
              </div>
              <div className="w-45 flex flex-col gap-3.5">
                <p className="font-body font-medium text-[10px] text-cafe-atenuado">LEYENDA</p>
                {leyenda.map(({ estado, etiqueta, clase }) => (
                  <div key={estado} className="flex items-center gap-1.5">
                    <div className={`w-2.5 h-2.5 rounded-[2px] shrink-0 ${clase}`} />
                    <span className="font-body text-[12px] text-cafe-atenuado">{etiqueta}</span>
                  </div>
                ))}
                <div className="h-px bg-cafe/7" />
                <p className="font-body font-medium text-[10px] text-cafe-atenuado">RESUMEN</p>
                {resumenMesas.map(({ etiqueta, valor, color }) => (
                  <div key={etiqueta} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${color}`} />
                      <span className="font-body text-[12px] text-cafe-atenuado">{etiqueta}</span>
                    </div>
                    <span className="font-body font-semibold text-[12px] text-cafe">{valor}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between">
                  <span className="font-body text-[12px] text-cafe-atenuado">Capacidad</span>
                  <span className="font-body font-semibold text-[12px] text-cafe">48 personas</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-90 bg-white border border-cafe/7 rounded-[20px] overflow-hidden">
            <div className="px-4.5 pt-4 pb-3">
              <h2 className="font-display text-[18px] text-cafe">Fila de hoy</h2>
              <p className="font-body text-[12px] text-cafe-atenuado">Ordenadas por hora</p>
            </div>
            <div className="h-px bg-cafe/7" />
            {FILA_HOY.map((reserva, indice) => (
              <div key={reserva.id}>
                <FilaReserva
                  hora={reserva.hora}
                  nombre={reserva.nombre}
                  estado={reserva.estado}
                  personas={reserva.personas}
                  mesa={reserva.mesa}
                />
                {indice < FILA_HOY.length - 1 && (
                  <div className="h-px bg-cafe/7" />
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
