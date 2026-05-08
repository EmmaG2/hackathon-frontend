import { NavLateral } from '@/components/navegacion/NavLateral'
import { TarjetaEstadistica } from '@/components/dashboard/TarjetaEstadistica'

const OCUPACION_POR_HORA: { hora: string; pct: number }[] = [
  { hora: '18:00', pct: 20 },
  { hora: '18:30', pct: 35 },
  { hora: '19:00', pct: 55 },
  { hora: '19:30', pct: 72 },
  { hora: '20:00', pct: 93 },
  { hora: '20:30', pct: 86 },
  { hora: '21:00', pct: 79 },
  { hora: '21:30', pct: 64 },
  { hora: '22:00', pct: 42 },
  { hora: '22:30', pct: 18 },
]

const SEMANA: { dia: string; cubiertos: number; ingresos: number }[] = [
  { dia: 'Lun', cubiertos: 28, ingresos: 9800  },
  { dia: 'Mar', cubiertos: 34, ingresos: 11200  },
  { dia: 'Mié', cubiertos: 22, ingresos: 7600   },
  { dia: 'Jue', cubiertos: 41, ingresos: 14300  },
  { dia: 'Vie', cubiertos: 58, ingresos: 21400  },
  { dia: 'Sáb', cubiertos: 62, ingresos: 23100  },
  { dia: 'Dom', cubiertos: 49, ingresos: 17800  },
]

const maxCubiertos = Math.max(...SEMANA.map(d => d.cubiertos))

function GraficaOcupacion() {
  const alto = 80
  const ancho = 340
  const barW = 24
  const gap = (ancho - OCUPACION_POR_HORA.length * barW) / (OCUPACION_POR_HORA.length + 1)

  return (
    <svg viewBox={`0 0 ${ancho} ${alto + 20}`} className="w-full" preserveAspectRatio="xMidYMid meet">
      {OCUPACION_POR_HORA.map(({ hora, pct }, i) => {
        const x = gap + i * (barW + gap)
        const h = (pct / 100) * alto
        const y = alto - h
        return (
          <g key={hora}>
            <rect x={x} y={y} width={barW} height={h} rx={4}
              fill={pct >= 80 ? '#fbd464' : '#E8DCC8'} />
            <text x={x + barW / 2} y={alto + 14} textAnchor="middle"
              fontSize={7} fill="#8a7e70" fontFamily="monospace">
              {hora.split(':')[0]}h
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export function Reportes() {
  const totalCubiertos = SEMANA.reduce((a, d) => a + d.cubiertos, 0)
  const totalIngresos  = SEMANA.reduce((a, d) => a + d.ingresos, 0)
  const ticketPromedio = Math.round(totalIngresos / totalCubiertos)

  return (
    <div className="flex min-h-screen bg-crema">
      <NavLateral tabActiva="reportes" />

      <main className="flex-1 flex flex-col gap-5.5 px-7 pt-5.5 pb-8 overflow-auto">
        <div>
          <p className="font-body font-medium text-[11px] text-cafe-atenuado">Semana del 1 al 7 de Mayo, 2026</p>
          <h1 className="font-display text-[28px] text-cafe">Reportes · Casa Paloma</h1>
        </div>

        <div className="flex gap-3">
          <TarjetaEstadistica
            titulo="Ingresos esta semana"
            valor={`$${(totalIngresos / 1000).toFixed(1)}k`}
            descripcion="Meta $120k mensuales"
          />
          <TarjetaEstadistica
            titulo="Cubiertos totales"
            valor={String(totalCubiertos)}
            descripcion="Meta 210 semanales"
          />
          <TarjetaEstadistica
            titulo="Ticket promedio"
            valor={`$${ticketPromedio}`}
            descripcion="Por comensal"
          />
          <TarjetaEstadistica
            titulo="Ocupación pico"
            valor="93%"
            descripcion="Jueves 20:00 hrs"
          />
        </div>

        <div className="flex gap-5.5">
          <div className="flex-1 bg-white border border-cafe/7 rounded-[20px] p-4.5">
            <h2 className="font-display text-[18px] text-cafe mb-1">Ocupación por hora</h2>
            <p className="font-body text-[12px] text-cafe-atenuado mb-4">Jueves 7 de Mayo · promedio del salón</p>
            <GraficaOcupacion />
            <div className="flex gap-4 mt-4">
              {[
                { color: '#fbd464', label: 'Alta ocupación (≥80%)' },
                { color: '#E8DCC8', label: 'Ocupación normal'      },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-[3px] shrink-0" style={{ background: color, border: '1px solid #3A2E2022' }} />
                  <span className="font-body text-[11px] text-cafe-atenuado">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-72 bg-white border border-cafe/7 rounded-[20px] overflow-hidden">
            <div className="px-4.5 pt-4 pb-3">
              <h2 className="font-display text-[18px] text-cafe">Resumen semanal</h2>
              <p className="font-body text-[12px] text-cafe-atenuado">Por día</p>
            </div>
            <div className="h-px bg-cafe/7" />
            {SEMANA.map(({ dia, cubiertos, ingresos }, i) => (
              <div key={dia}>
                <div className="flex items-center gap-3 px-4.5 py-3">
                  <span className="font-body font-semibold text-[12px] text-cafe-atenuado w-8 shrink-0">{dia}</span>
                  <div className="flex-1">
                    <div className="h-2 bg-arena rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amarillo rounded-full"
                        style={{ width: `${(cubiertos / maxCubiertos) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="font-body font-semibold text-[12px] text-cafe">{cubiertos} cub.</span>
                    <span className="font-body text-[11px] text-cafe-atenuado">${(ingresos / 1000).toFixed(1)}k</span>
                  </div>
                </div>
                {i < SEMANA.length - 1 && <div className="h-px bg-cafe/7" />}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
