import { useState } from 'react'
import { NavLateral } from '@/components/navegacion/NavLateral'
import { PlanoSalon } from '@/components/dashboard/PlanoSalon'
import type { Mesa, EstadoMesa } from '@/types'

const MESAS_INICIAL: Mesa[] = [
  { id: 1,  estado: 'ocupada',   personas: 2 },
  { id: 2,  estado: 'ocupada',   personas: 2 },
  { id: 3,  estado: 'libre'                  },
  { id: 4,  estado: 'ocupada',   personas: 3 },
  { id: 5,  estado: 'reservada'              },
  { id: 6,  estado: 'ocupada',   personas: 4 },
  { id: 7,  estado: 'ocupada',   personas: 4 },
  { id: 8,  estado: 'libre'                  },
  { id: 9,  estado: 'ocupada',   personas: 2 },
  { id: 10, estado: 'libre'                  },
  { id: 11, estado: 'ocupada',   personas: 5 },
  { id: 12, estado: 'ocupada',   personas: 6 },
  { id: 13, estado: 'libre'                  },
  { id: 14, estado: 'reservada'              },
]

const CAPACIDADES: Record<number, number> = {
  1: 2, 2: 2, 3: 2, 4: 4, 5: 4, 6: 4,
  7: 4, 8: 4, 9: 4, 10: 4, 11: 6, 12: 6,
  13: 2, 14: 2,
}

const ETIQUETA_ESTADO: Record<EstadoMesa, { texto: string; clase: string }> = {
  libre:     { texto: 'Libre',     clase: 'bg-disponible/12 text-disponible'       },
  ocupada:   { texto: 'Ocupada',   clase: 'bg-cafe/10 text-cafe'                   },
  reservada: { texto: 'Reservada', clase: 'bg-amarillo-oscuro/12 text-amarillo-oscuro' },
}

export function Mesas() {
  const [mesas, setMesas] = useState<Mesa[]>(MESAS_INICIAL)
  const [mesaFocal, setMesaFocal] = useState<number | null>(null)

  const libres    = mesas.filter(m => m.estado === 'libre').length
  const ocupadas  = mesas.filter(m => m.estado === 'ocupada').length
  const reservadas = mesas.filter(m => m.estado === 'reservada').length

  function alternarMesa(id: number) {
    setMesas(prev => prev.map(m => {
      if (m.id !== id || m.estado === 'reservada') return m
      return { ...m, estado: m.estado === 'libre' ? 'ocupada' : 'libre' }
    }))
    setMesaFocal(id)
  }

  function cambiarEstado(id: number, estado: EstadoMesa) {
    setMesas(prev => prev.map(m => m.id !== id ? m : { ...m, estado }))
  }

  const mesa = mesas.find(m => m.id === mesaFocal)

  return (
    <div className="flex min-h-screen bg-crema">
      <NavLateral tabActiva="mesas" />

      <main className="flex-1 flex flex-col gap-5.5 px-7 pt-5.5 pb-8 overflow-auto">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-body font-medium text-[11px] text-cafe-atenuado">Jueves 7 de Mayo, 2026 · 20:14</p>
            <h1 className="font-display text-[28px] text-cafe">Mesas del salón</h1>
          </div>
        </div>

        <div className="flex gap-3">
          {[
            { label: 'Libres',     valor: libres,     dot: 'bg-disponible'      },
            { label: 'Ocupadas',   valor: ocupadas,   dot: 'bg-mesa-ocupada'    },
            { label: 'Reservadas', valor: reservadas, dot: 'bg-amarillo-oscuro' },
            { label: 'Total',      valor: mesas.length, dot: 'bg-cafe-claro'   },
          ].map(({ label, valor, dot }) => (
            <div key={label} className="bg-white border border-cafe/7 rounded-[14px] p-4 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full ${dot}`} />
                <span className="font-body text-[11px] text-cafe-atenuado">{label}</span>
              </div>
              <span className="font-display text-[30px] text-cafe leading-none">{valor}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-5.5">
          <div className="flex-1 bg-white border border-cafe/7 rounded-[20px] p-4.5">
            <div className="flex items-center justify-between mb-3.5">
              <div>
                <h2 className="font-display text-[18px] text-cafe">Plano interactivo</h2>
                <p className="font-body text-[12px] text-cafe-atenuado">Toca una mesa para ver detalles o cambiar estado</p>
              </div>
            </div>
            <PlanoSalon mesas={mesas} onAlternarMesa={alternarMesa} />
          </div>

          <div className="w-72 flex flex-col gap-3.5">
            {mesa ? (
              <div className="bg-white border border-cafe/7 rounded-[20px] p-4.5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-[18px] text-cafe">Mesa {mesa.id}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-body font-semibold ${ETIQUETA_ESTADO[mesa.estado].clase}`}>
                    {ETIQUETA_ESTADO[mesa.estado].texto}
                  </span>
                </div>

                <div className="flex flex-col gap-2 text-[12px] font-body text-cafe-atenuado">
                  <div className="flex justify-between">
                    <span>Capacidad</span>
                    <span className="text-cafe font-semibold">{CAPACIDADES[mesa.id]} personas</span>
                  </div>
                  {mesa.personas && (
                    <div className="flex justify-between">
                      <span>Ocupantes</span>
                      <span className="text-cafe font-semibold">{mesa.personas} personas</span>
                    </div>
                  )}
                </div>

                <div className="h-px bg-cafe/7" />

                <div className="flex flex-col gap-2">
                  <p className="font-body font-medium text-[10px] text-cafe-atenuado uppercase tracking-widest">Cambiar estado</p>
                  {(['libre', 'ocupada', 'reservada'] as EstadoMesa[]).map(estado => (
                    <button
                      key={estado}
                      onClick={() => cambiarEstado(mesa.id, estado)}
                      className={`py-2.5 rounded-[10px] font-body font-medium text-[12px] transition-colors ${
                        mesa.estado === estado
                          ? 'bg-amarillo text-cafe-texto'
                          : 'bg-arena text-cafe-atenuado hover:bg-arena-oscura'
                      }`}
                    >
                      {ETIQUETA_ESTADO[estado].texto}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white border border-cafe/7 rounded-[20px] p-4.5 flex flex-col items-center justify-center gap-2 min-h-[180px]">
                <p className="font-body text-[13px] text-cafe-atenuado text-center">Selecciona una mesa para ver sus detalles</p>
              </div>
            )}

            <div className="bg-white border border-cafe/7 rounded-[20px] p-4.5 flex flex-col gap-3">
              <p className="font-body font-medium text-[10px] text-cafe-atenuado uppercase tracking-widest">Leyenda</p>
              {[
                { fondo: '#E8DCC8', borde: '#3A2E20', dash: false, label: 'Libre'     },
                { fondo: '#3A2E20', borde: '#5C4F3D', dash: false, label: 'Ocupada'   },
                { fondo: 'none',    borde: '#fbd464', dash: true,  label: 'Reservada' },
              ].map(({ fondo, borde, dash, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-[3px] shrink-0"
                    style={{ background: fondo, border: `1.4px ${dash ? 'dashed' : 'solid'} ${borde}` }}
                  />
                  <span className="font-body text-[12px] text-cafe-atenuado">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
