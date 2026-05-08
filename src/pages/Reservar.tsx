import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { RejillaResumen } from '@/components/reserva/RejillaResumen'
import { PlanoMesasCinepolis } from '@/components/reserva/PlanoMesasCinepolis'

const DIAS = [
  { etiqueta: 'Hoy',  numero: '7'  },
  { etiqueta: 'Vier', numero: '8'  },
  { etiqueta: 'Sáb',  numero: '9'  },
  { etiqueta: 'Dom',  numero: '10' },
  { etiqueta: 'Lun',  numero: '11' },
  { etiqueta: 'Mar',  numero: '12' },
]

const HORARIOS = [
  { hora: '18:00', disponible: true  },
  { hora: '18:30', disponible: true  },
  { hora: '19:00', disponible: false },
  { hora: '19:30', disponible: true  },
  { hora: '20:00', disponible: false },
  { hora: '20:30', disponible: true  },
  { hora: '21:00', disponible: true  },
  { hora: '21:30', disponible: false },
]

function SeccionLabel({ label, derecha }: { label: string; derecha?: string }) {
  return (
    <div className="flex items-baseline justify-between mb-2.5">
      <span className="font-body font-medium text-[10px] text-cafe-atenuado tracking-widest uppercase">
        {label}
      </span>
      {derecha && (
        <span className="font-body text-[10px] text-amarillo-oscuro tracking-wide">
          {derecha}
        </span>
      )}
    </div>
  )
}

function ContadorPersonas({ valor, onChange }: { valor: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center gap-0 bg-arena rounded-full border border-cafe/12 p-1 w-fit">
      <button
        onClick={() => onChange(Math.max(1, valor - 1))}
        disabled={valor <= 1}
        className="w-9 h-9 rounded-full bg-crema flex items-center justify-center font-body font-bold text-[18px] text-cafe disabled:opacity-30"
      >
        −
      </button>
      <span className="min-w-14 text-center font-body font-bold text-[18px] text-cafe tabular-nums">
        {valor}
      </span>
      <button
        onClick={() => onChange(Math.min(12, valor + 1))}
        disabled={valor >= 12}
        className="w-9 h-9 rounded-full bg-amarillo flex items-center justify-center font-body font-bold text-[18px] text-cafe-texto disabled:opacity-30"
      >
        +
      </button>
    </div>
  )
}

export function Reservar() {
  const [diaSeleccionado, setDiaSeleccionado] = useState('9')
  const [horaSeleccionada, setHoraSeleccionada] = useState('20:30')
  const [cantPersonas, setCantPersonas] = useState(4)
  const [mesaSeleccionada, setMesaSeleccionada] = useState<number | null>(null)
  const navegar = useNavigate()

  const camposResumen = [
    { etiqueta: 'Fecha',    valor: 'Sáb 9 May' },
    { etiqueta: 'Hora',     valor: horaSeleccionada },
    { etiqueta: 'Personas', valor: String(cantPersonas) },
    { etiqueta: 'Mesa',     valor: mesaSeleccionada ? `Mesa ${mesaSeleccionada}` : '—', resaltado: true },
  ]

  const puedeConfirmar = !!(diaSeleccionado && horaSeleccionada && mesaSeleccionada)

  function toggleMesa(id: number) {
    setMesaSeleccionada(prev => prev === id ? null : id)
  }

  return (
    <div className="fixed inset-0 bg-cafe/40 flex items-end md:items-center justify-center md:p-6">
      <div className="w-full md:max-w-3xl bg-crema border border-cafe/12 rounded-t-[28px] md:rounded-[28px] max-h-[90vh] overflow-y-auto">
        {/* Drag handle — solo mobile */}
        <div className="w-11 h-1 bg-boton-muted rounded-full mx-auto mt-2.5 md:hidden" />

        <div className="flex items-start justify-between px-4.5 pt-4 pb-2">
          <div>
            <p className="font-body font-medium text-[10px] text-cafe-atenuado">Reservar en</p>
            <h2 className="font-display text-[22px] text-cafe">Casa Paloma</h2>
          </div>
          <button onClick={() => navegar(-1)} className="text-cafe-atenuado hover:text-cafe mt-2.5 transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="h-px bg-cafe/7" />

        <div className="px-4.5 pt-4 pb-1 flex flex-col gap-5">
          {/* Desktop: dos columnas / Mobile: una columna */}
          <div className="flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-8 md:items-start">
            {/* Columna izquierda: controles del formulario */}
            <div className="flex flex-col gap-5">
              <div>
                <SeccionLabel label="Fecha" />
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                  {DIAS.map(dia => {
                    const activo = diaSeleccionado === dia.numero
                    return (
                      <button
                        key={dia.numero}
                        onClick={() => setDiaSeleccionado(dia.numero)}
                        className={`flex flex-col gap-0.5 items-center justify-center px-1.5 py-2.5 rounded-[14px] min-w-[52px] shrink-0 border transition-all ${
                          activo
                            ? 'bg-amarillo border-amarillo text-cafe-texto'
                            : 'bg-white border-cafe/12 text-cafe'
                        }`}
                      >
                        <span className={`font-body font-medium text-[9px] uppercase tracking-wider ${activo ? 'opacity-70' : 'text-cafe-claro'}`}>
                          {dia.etiqueta}
                        </span>
                        <span className="font-body font-bold text-[18px] tabular-nums">
                          {dia.numero}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <SeccionLabel label="Personas" derecha="Máx 12" />
                <div className="flex items-center gap-4">
                  <ContadorPersonas valor={cantPersonas} onChange={setCantPersonas} />
                  <span className="font-body text-[12px] text-cafe-atenuado">
                    {cantPersonas === 1 ? '1 persona' : `${cantPersonas} personas`}
                  </span>
                </div>
              </div>

              <div>
                <SeccionLabel
                  label="Hora disponible"
                  derecha={`${HORARIOS.filter(h => h.disponible).length} horarios libres`}
                />
                <div className="grid grid-cols-4 gap-2">
                  {HORARIOS.map(({ hora, disponible }) => {
                    const activo = horaSeleccionada === hora
                    return (
                      <button
                        key={hora}
                        disabled={!disponible}
                        onClick={() => setHoraSeleccionada(hora)}
                        className={`h-[42px] rounded-[14px] font-body font-medium text-[13px] transition-all ${
                          activo
                            ? 'bg-amarillo text-cafe-texto'
                            : disponible
                              ? 'bg-white border border-cafe/12 text-cafe'
                              : 'bg-white border border-cafe/8 text-cafe-claro/50'
                        }`}
                      >
                        {hora}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Resumen visible solo en desktop dentro de columna izquierda */}
              <div className="hidden md:flex flex-col gap-2 bg-white border border-cafe/12 rounded-[14px] p-3.5">
                <p className="font-body font-medium text-[10px] text-cafe-atenuado uppercase tracking-widest">Resumen</p>
                <h3 className="font-display text-[18px] text-cafe">Casa Paloma</h3>
                <RejillaResumen campos={camposResumen} />
              </div>
            </div>

            {/* Columna derecha: selección de mesa */}
            <div className="flex flex-col gap-2">
              <SeccionLabel
                label="Elige tu mesa"
                derecha={mesaSeleccionada ? `MESA ${mesaSeleccionada} SELECCIONADA` : 'TOCA UNA MESA LIBRE'}
              />
              <PlanoMesasCinepolis
                mesaSeleccionada={mesaSeleccionada}
                onSeleccionarMesa={toggleMesa}
                cantPersonas={cantPersonas}
              />
              {mesaSeleccionada && (
                <div className="mt-2 bg-amarillo/10 px-3.5 py-2 rounded-[8px]">
                  <span className="font-body font-semibold text-[11px] text-amarillo-oscuro">
                    ✦ Mesa {mesaSeleccionada} · {cantPersonas} personas · Disponible 15 min
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Resumen visible solo en mobile */}
          <div className="md:hidden bg-white border border-cafe/12 rounded-[14px] p-3.5 flex flex-col gap-2">
            <p className="font-body font-medium text-[10px] text-cafe-atenuado uppercase tracking-widest">Resumen</p>
            <h3 className="font-display text-[18px] text-cafe">Casa Paloma</h3>
            <RejillaResumen campos={camposResumen} />
          </div>
        </div>

        <div className="flex items-center justify-between px-4 pt-3 pb-6.5 md:pb-4 border-t border-cafe/7 mt-4">
          <div className="flex flex-col gap-0.5">
            <span className="font-body font-medium text-[10px] text-cafe-atenuado uppercase tracking-widest">Sin cargo</span>
            <span className="font-body text-[13px] text-cafe">Cancela hasta 2h antes</span>
          </div>
          <button
            onClick={() => puedeConfirmar && navegar('/reserva/exito')}
            disabled={!puedeConfirmar}
            className={`bg-amarillo rounded-full px-6 py-4 transition-opacity ${puedeConfirmar ? 'opacity-100' : 'opacity-40'}`}
          >
            <span className="font-body font-bold text-[15px] text-cafe-texto">Confirmar reserva</span>
          </button>
        </div>
      </div>
    </div>
  )
}
