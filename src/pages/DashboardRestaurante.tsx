import { NavLateral } from '@/components/navegacion/NavLateral'
import { TarjetaEstadistica } from '@/components/dashboard/TarjetaEstadistica'
import { FilaReserva } from '@/components/dashboard/FilaReserva'
import { ModalReservaManual } from '@/components/dashboard/ModalReservaManual'
import { PlanoSalon } from '@/components/dashboard/PlanoSalon'
import { useDashboard } from '@/hooks/useDashboard'

const leyenda = [
  { etiqueta: 'Libre',     fondo: '#E8DCC8', borde: '#3A2E20', dash: false },
  { etiqueta: 'Ocupada',   fondo: '#3A2E20', borde: '#5C4F3D', dash: false },
  { etiqueta: 'Reservada', fondo: 'none',    borde: '#fbd464', dash: true  },
]

export function DashboardRestaurante() {
  const {
    mesas, fila,
    mesasLibres, mesasOcupadas, mesasReservadas,
    porcentajeOcupacion, pendientes, cubiertos, proximaReserva,
    modalAbierto, setModalAbierto,
    alternarMesa, accionReserva, cancelarReserva, agregarReserva,
  } = useDashboard()

  const resumenMesas = [
    { etiqueta: 'Libres',     valor: mesasLibres,     color: 'bg-mesa-libre'  },
    { etiqueta: 'Ocupadas',   valor: mesasOcupadas,   color: 'bg-mesa-ocupada' },
    { etiqueta: 'Reservadas', valor: mesasReservadas, color: 'bg-amarillo'    },
  ]

  const tituloNoche = porcentajeOcupacion >= 70 ? 'noche ocupada' : 'disponibilidad'

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
              {fila.length} reservas · {tituloNoche}
            </h1>
          </div>
          <div className="flex gap-2.5">
            <button className="bg-white border border-cafe/12 rounded-full px-4 py-2.5">
              <span className="font-body font-semibold text-[13px] text-cafe">📅 Hoy</span>
            </button>
            <button
              onClick={() => setModalAbierto(true)}
              className="bg-amarillo rounded-full px-4 py-2.5"
            >
              <span className="font-body font-semibold text-[13px] text-cafe-texto">
                + Reserva manual
              </span>
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <TarjetaEstadistica
            titulo="Reservas hoy"
            valor={String(fila.length)}
            descripcion={`${pendientes} pendiente${pendientes !== 1 ? 's' : ''}`}
          />
          <TarjetaEstadistica
            titulo="Ocupación"
            valor={`${porcentajeOcupacion}%`}
            descripcion={`${mesasOcupadas}/${mesas.length} mesas`}
          >
            <div className="relative w-13 h-13">
              <svg viewBox="0 0 52 52" className="rotate-[-90deg]">
                <circle cx="26" cy="26" r="22" fill="none" stroke="var(--color-arena)" strokeWidth="4" />
                <circle
                  cx="26" cy="26" r="22" fill="none"
                  stroke="var(--color-amarillo-oscuro)" strokeWidth="4"
                  strokeDasharray={`${(porcentajeOcupacion / 100) * 2 * Math.PI * 22} ${2 * Math.PI * 22}`}
                  style={{ transition: 'stroke-dasharray 0.4s ease' }}
                />
              </svg>
            </div>
          </TarjetaEstadistica>
          <TarjetaEstadistica
            titulo="Próxima reserva"
            valor={proximaReserva ? proximaReserva.hora : '—'}
            descripcion={proximaReserva ? `${proximaReserva.nombre} · ${proximaReserva.personas} pers.` : 'Sin pendientes'}
          />
          <TarjetaEstadistica
            titulo="Cubiertos esta noche"
            valor={String(cubiertos)}
            descripcion="Meta 30 cubiertos"
          />
        </div>

        <div className="flex gap-5.5">
          <div className="flex-1 bg-white border border-cafe/7 rounded-[20px] p-4.5">
            <div className="flex items-start justify-between mb-3.5">
              <div>
                <h2 className="font-display text-[18px] text-cafe">Plano del salón</h2>
                <p className="font-body text-[12px] text-cafe-atenuado">
                  Toca una mesa libre u ocupada para cambiar su estado · {mesasLibres} libres · {mesasReservadas} reservadas
                </p>
              </div>
              <button className="bg-arena border border-cafe/10 rounded-full px-3 py-2">
                <span className="font-body font-medium text-[12px] text-cafe-atenuado">⊞ Editar layout</span>
              </button>
            </div>
            <div className="flex gap-4.5">
              <div className="flex-1">
                <PlanoSalon mesas={mesas} onAlternarMesa={alternarMesa} />
              </div>
              <div className="w-45 flex flex-col gap-3.5">
                <p className="font-body font-medium text-[10px] text-cafe-atenuado">LEYENDA</p>
                {leyenda.map(({ etiqueta, fondo, borde, dash }) => (
                  <div key={etiqueta} className="flex items-center gap-1.5">
                    <span
                      className="w-3 h-3 rounded-[3px] shrink-0"
                      style={{ background: fondo, border: `1.4px ${dash ? 'dashed' : 'solid'} ${borde}` }}
                    />
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
            {fila.length === 0 && (
              <p className="font-body text-[13px] text-cafe-atenuado text-center py-10">
                Sin reservas pendientes
              </p>
            )}
            {fila.map((reserva, indice) => (
              <div key={reserva.id}>
                <FilaReserva
                  hora={reserva.hora}
                  nombre={reserva.nombre}
                  estado={reserva.estado}
                  personas={reserva.personas}
                  mesa={reserva.mesa}
                  onAccionPrincipal={() => accionReserva(reserva.id)}
                  onCancelar={() => cancelarReserva(reserva.id)}
                />
                {indice < fila.length - 1 && <div className="h-px bg-cafe/7" />}
              </div>
            ))}
          </div>
        </div>
      </main>

      {modalAbierto && (
        <ModalReservaManual
          onAgregar={agregarReserva}
          onCerrar={() => setModalAbierto(false)}
        />
      )}
    </div>
  )
}
