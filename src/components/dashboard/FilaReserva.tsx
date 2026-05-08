import type { EstadoReserva } from '@/types'

interface Props {
  hora: string
  nombre: string
  estado: EstadoReserva
  personas: number
  mesa?: string
  onAccionPrincipal?: () => void
  onCancelar?: () => void
}

const estiloEstado: Record<EstadoReserva, { texto: string; clases: string }> = {
  sentada: { texto: 'sentada', clases: 'bg-disponible/14 text-disponible' },
  confirmada: { texto: 'confirmada', clases: 'bg-confirmado/14 text-confirmado' },
  pendiente: { texto: 'pendiente', clases: 'bg-amarillo-oscuro/14 text-amarillo-oscuro' },
}

const accionPrincipal: Record<EstadoReserva, string | null> = {
  sentada: 'Cerrar mesa',
  confirmada: 'Sentar',
  pendiente: 'Confirmar',
}

export function FilaReserva({ hora, nombre, estado, personas, mesa, onAccionPrincipal, onCancelar }: Props) {
  const { texto, clases } = estiloEstado[estado]
  const textoAccion = accionPrincipal[estado]

  return (
    <div className="flex gap-3 items-center p-3">
      <div className="bg-arena w-[41px] h-11 rounded-[10px] flex items-center justify-center shrink-0">
        <span className="font-body font-bold text-[13px] text-cafe">{hora}</span>
      </div>
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="font-body font-semibold text-[13px] text-cafe">{nombre}</span>
          <div className={`px-1.75 py-0.5 rounded-full ${clases}`}>
            <span className="font-body font-semibold text-[10px]">{texto}</span>
          </div>
        </div>
        <span className="font-body text-[11px] text-cafe-atenuado">
          {`👥 ${personas}${mesa ? `  ·  🪑 ${mesa}` : ''}  ·  sin cargo`}
        </span>
        <div className="flex gap-1 items-center">
          {textoAccion && (
            <button
              onClick={onAccionPrincipal}
              className={`px-2.5 py-1.25 rounded-[6px] font-body font-semibold text-[11px] ${
                estado === 'confirmada' ? 'bg-amarillo text-cafe-texto' : 'bg-boton-muted text-cafe'
              }`}
            >
              {textoAccion}
            </button>
          )}
          {estado !== 'sentada' && (
            <button
              onClick={onCancelar}
              className="px-2.5 py-1.25 rounded-[6px] border border-lleno/30 font-body font-semibold text-[11px] text-lleno"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
