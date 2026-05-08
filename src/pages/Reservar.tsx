import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { X, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react'
import { RejillaResumen } from '@/components/reserva/RejillaResumen'
import { PlanoMesasCinepolis } from '@/components/reserva/PlanoMesasCinepolis'
import { FormularioPago } from '@/components/pago/FormularioPago'
import { useRestaurante } from '@/hooks/useRestaurante'
import { formatearMoneda } from '@/lib/utils'
import type { ItemMenu } from '@/types'

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
  const { id } = useParams<{ id: string }>()
  const { restaurante, cargando } = useRestaurante(id)
  const [diaSeleccionado, setDiaSeleccionado] = useState('9')
  const [horaSeleccionada, setHoraSeleccionada] = useState('20:30')
  const [cantPersonas, setCantPersonas] = useState(4)
  const [mesaSeleccionada, setMesaSeleccionada] = useState<number | null>(null)
  const [orden, setOrden] = useState<{ item: ItemMenu; cantidad: number }[]>([])
  const [paso, setPaso] = useState<'seleccion' | 'pago'>('seleccion')
  const navegar = useNavigate()

  const subtotal = orden.reduce((acc, current) => acc + current.item.precio * current.cantidad, 0)
  // Supongamos una tarifa de reserva fija de $50 si no hay pre-orden, o incluida si la hay
  const tarifaReserva = subtotal > 0 ? 0 : 50
  const total = subtotal + tarifaReserva

  const camposResumen = [
    { etiqueta: 'Fecha',    valor: 'Sáb 9 May' },
    { etiqueta: 'Hora',     valor: horaSeleccionada },
    { etiqueta: 'Personas', valor: String(cantPersonas) },
    { etiqueta: 'Mesa',     valor: mesaSeleccionada ? `Mesa ${mesaSeleccionada}` : '—', resaltado: true },
    { etiqueta: 'Pre-orden', valor: subtotal > 0 ? formatearMoneda(subtotal) : 'Ninguna' },
  ]

  const puedeConfirmar = !!(diaSeleccionado && horaSeleccionada && mesaSeleccionada)

  function toggleMesa(id: number) {
    setMesaSeleccionada(prev => prev === id ? null : id)
  }

  function agregarAOrden(item: ItemMenu) {
    setOrden(prev => {
      const existe = prev.find(i => i.item.id === item.id)
      if (existe) {
        return prev.map(i => i.item.id === item.id ? { ...i, cantidad: i.cantidad + 1 } : i)
      }
      return [...prev, { item, cantidad: 1 }]
    })
  }

  function quitarDeOrden(itemId: string) {
    setOrden(prev => {
      const existe = prev.find(i => i.item.id === itemId)
      if (existe && existe.cantidad > 1) {
        return prev.map(i => i.item.id === itemId ? { ...i, cantidad: i.cantidad - 1 } : i)
      }
      return prev.filter(i => i.item.id !== itemId)
    })
  }

  if (cargando) return null

  return (
    <div className="fixed inset-0 bg-cafe/40 flex items-end md:items-center justify-center md:p-6 z-50">
      <div className="w-full md:max-w-4xl bg-crema border border-cafe/12 rounded-t-[28px] md:rounded-[28px] max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="w-11 h-1 bg-boton-muted rounded-full mx-auto mt-2.5 md:hidden" />

        <div className="flex items-start justify-between px-4.5 pt-4 pb-2">
          <div className="flex items-center gap-3">
            {paso === 'pago' && (
              <button 
                onClick={() => setPaso('seleccion')}
                className="p-2 -ml-2 text-cafe-atenuado hover:text-cafe transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <div>
              <p className="font-body font-medium text-[10px] text-cafe-atenuado uppercase tracking-widest">
                {paso === 'seleccion' ? 'Reservar en' : 'Confirmar pago'}
              </p>
              <h2 className="font-display text-[22px] text-cafe">{restaurante?.nombre}</h2>
            </div>
          </div>
          <button onClick={() => navegar(-1)} className="text-cafe-atenuado hover:text-cafe mt-2.5 transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="h-px bg-cafe/7" />

        <div className="px-4.5 pt-4 pb-1 flex flex-col gap-6">
          {paso === 'seleccion' ? (
            <div className="flex flex-col gap-6 md:grid md:grid-cols-[1fr_320px] md:gap-8 md:items-start">
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                              activo ? 'bg-amarillo border-amarillo text-cafe-texto' : 'bg-white border-cafe/12 text-cafe'
                            }`}
                          >
                            <span className={`font-body font-medium text-[9px] uppercase tracking-wider ${activo ? 'opacity-70' : 'text-cafe-claro'}`}>
                              {dia.etiqueta}
                            </span>
                            <span className="font-body font-bold text-[18px] tabular-nums">{dia.numero}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <SeccionLabel label="Personas" derecha="Máx 12" />
                    <div className="flex items-center gap-4">
                      <ContadorPersonas valor={cantPersonas} onChange={setCantPersonas} />
                    </div>
                  </div>
                </div>

                <div>
                  <SeccionLabel label="Hora disponible" />
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                    {HORARIOS.map(({ hora, disponible }) => {
                      const activo = horaSeleccionada === hora
                      return (
                        <button
                          key={hora}
                          disabled={!disponible}
                          onClick={() => setHoraSeleccionada(hora)}
                          className={`h-[42px] rounded-[14px] font-body font-medium text-[13px] transition-all ${
                            activo ? 'bg-amarillo text-cafe-texto' : disponible ? 'bg-white border border-cafe/12 text-cafe' : 'bg-white border border-cafe/8 text-cafe-claro/50'
                          }`}
                        >
                          {hora}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <SeccionLabel label="Pre-ordena tu comida" derecha="Opcional" />
                  <div className="bg-white border border-cafe/12 rounded-[20px] p-4 flex flex-col gap-3">
                    <div className="flex flex-col gap-2.5">
                      {restaurante?.itemsMenu.map((item) => {
                        const cantidad = orden.find(o => o.item.id === item.id)?.cantidad || 0
                        return (
                          <div key={item.id} className="flex items-center justify-between py-1 border-b border-cafe/5 last:border-0">
                            <div className="flex-1">
                              <h4 className="font-body font-bold text-[14px] text-cafe">{item.nombre}</h4>
                              <p className="font-body text-[11px] text-cafe-atenuado line-clamp-1">{item.descripcion}</p>
                              <span className="font-body font-medium text-[12px] text-cafe-claro">{formatearMoneda(item.precio)}</span>
                            </div>
                            <div className="flex items-center gap-2.5 ml-4">
                              {cantidad > 0 && (
                                <>
                                  <button
                                    onClick={() => quitarDeOrden(item.id)}
                                    className="w-7 h-7 rounded-full bg-arena flex items-center justify-center text-cafe"
                                  >
                                    <Minus size={14} />
                                  </button>
                                  <span className="font-body font-bold text-[14px] text-cafe min-w-4 text-center">{cantidad}</span>
                                </>
                              )}
                              <button
                                onClick={() => agregarAOrden(item)}
                                className="w-7 h-7 rounded-full bg-amarillo flex items-center justify-center text-cafe-texto"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <SeccionLabel label="Elige tu mesa" />
                  <PlanoMesasCinepolis
                    mesaSeleccionada={mesaSeleccionada}
                    onSeleccionarMesa={toggleMesa}
                    cantPersonas={cantPersonas}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 sticky top-0">
                <div className="bg-white border border-cafe/12 rounded-[20px] p-5 flex flex-col gap-4">
                  <p className="font-body font-medium text-[10px] text-cafe-atenuado uppercase tracking-widest">Resumen de reserva</p>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display text-[22px] text-cafe">{restaurante?.nombre}</h3>
                    <p className="font-body text-[12px] text-cafe-atenuado">📍 {restaurante?.ubicacion}</p>
                  </div>
                  
                  <RejillaResumen campos={camposResumen} />

                  {orden.length > 0 && (
                    <div className="mt-2 pt-3 border-t border-cafe/7">
                      <div className="flex items-center gap-2 mb-2">
                        <ShoppingBag size={14} className="text-cafe-atenuado" />
                        <span className="font-body font-semibold text-[11px] text-cafe uppercase tracking-wider">Tu orden</span>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {orden.map(o => (
                          <div key={o.item.id} className="flex justify-between font-body text-[12px]">
                            <span className="text-cafe-atenuado">{o.cantidad}x {o.item.nombre}</span>
                            <span className="text-cafe-claro">{formatearMoneda(o.item.precio * o.cantidad)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto w-full py-4">
              <FormularioPago 
                totalMxn={total} 
                alExito={() => navegar('/reserva/exito')} 
              />
            </div>
          )}
        </div>

        {paso === 'seleccion' && (
          <div className="flex items-center justify-between px-6 pt-4 pb-8 border-t border-cafe/7 mt-6 bg-white/50 backdrop-blur-sm rounded-b-[28px]">
            <div className="flex flex-col">
              <span className="font-body font-bold text-[20px] text-cafe">{formatearMoneda(total)}</span>
              <span className="font-body text-[11px] text-cafe-atenuado">
                {subtotal > 0 ? 'Total con pre-orden' : 'Cuota de reserva'}
              </span>
            </div>
            <button
              onClick={() => puedeConfirmar && setPaso('pago')}
              disabled={!puedeConfirmar}
              className={`bg-amarillo rounded-full px-10 py-4 transition-all hover:bg-amarillo-oscuro shadow-lg shadow-amarillo/20 ${puedeConfirmar ? 'opacity-100' : 'opacity-40 cursor-not-allowed'}`}
            >
              <span className="font-body font-bold text-[15px] text-cafe-texto">Continuar al pago</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
