import { useState } from 'react'
import { X } from 'lucide-react'
import type { ReservaEnFila } from '@/types'

const HORAS = ['18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30']

interface Props {
  onAgregar: (reserva: Omit<ReservaEnFila, 'id' | 'estado'>) => void
  onCerrar: () => void
}

export function ModalReservaManual({ onAgregar, onCerrar }: Props) {
  const [nombre, setNombre] = useState('')
  const [hora, setHora] = useState('20:00')
  const [personas, setPersonas] = useState(2)

  function manejarEnvio(e: React.FormEvent) {
    e.preventDefault()
    if (!nombre.trim()) return
    onAgregar({ nombre: nombre.trim(), hora, personas })
  }

  return (
    <div className="fixed inset-0 bg-oscuro/50 flex items-center justify-center z-50 px-4" onClick={onCerrar}>
      <div className="bg-crema rounded-[24px] p-6 w-full max-w-sm flex flex-col gap-5" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[22px] text-cafe">Reserva manual</h2>
          <button onClick={onCerrar} className="text-cafe-atenuado hover:text-cafe transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-body font-medium text-[11px] text-cafe-atenuado uppercase tracking-widest">
              Nombre del cliente
            </label>
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Ej. Familia Morales"
              className="bg-white border border-cafe/12 rounded-[12px] px-3.5 py-3 font-body text-[13px] text-cafe placeholder:text-cafe-claro outline-none focus:border-cafe/30 transition-colors"
              autoFocus
            />
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="font-body font-medium text-[11px] text-cafe-atenuado uppercase tracking-widest">
                Hora
              </label>
              <select
                value={hora}
                onChange={e => setHora(e.target.value)}
                className="bg-white border border-cafe/12 rounded-[12px] px-3.5 py-3 font-body text-[13px] text-cafe outline-none focus:border-cafe/30 transition-colors"
              >
                {HORAS.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-body font-medium text-[11px] text-cafe-atenuado uppercase tracking-widest">
                Personas
              </label>
              <div className="flex items-center bg-arena rounded-full border border-cafe/12 p-1">
                <button
                  type="button"
                  onClick={() => setPersonas(p => Math.max(1, p - 1))}
                  className="w-8 h-8 rounded-full bg-crema flex items-center justify-center font-body font-bold text-[16px] text-cafe"
                >
                  −
                </button>
                <span className="min-w-8 text-center font-body font-bold text-[14px] text-cafe tabular-nums">
                  {personas}
                </span>
                <button
                  type="button"
                  onClick={() => setPersonas(p => Math.min(12, p + 1))}
                  className="w-8 h-8 rounded-full bg-amarillo flex items-center justify-center font-body font-bold text-[16px] text-cafe-texto"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-1">
            <button
              type="button"
              onClick={onCerrar}
              className="flex-1 border border-cafe/15 rounded-full py-3 font-body font-medium text-[13px] text-cafe-atenuado hover:border-cafe/30 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!nombre.trim()}
              className="flex-1 bg-amarillo rounded-full py-3 font-body font-bold text-[13px] text-cafe-texto disabled:opacity-40 transition-opacity"
            >
              Agregar reserva
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
