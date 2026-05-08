import type { EstadoMesa, Mesa } from '@/types'

interface Props {
  mesas: Mesa[]
  mesaSeleccionada?: number
  onSeleccionarMesa?: (idMesa: number) => void
}

const estilosMesa: Record<EstadoMesa, string> = {
  libre: 'bg-mesa-libre border border-mesa-ocupada',
  ocupada: 'bg-mesa-ocupada border border-mesa-borde',
  reservada: 'bg-transparent border-2 border-dashed border-amarillo',
}

export function PlanoMesas({ mesas, mesaSeleccionada, onSeleccionarMesa }: Props) {
  return (
    <div className="bg-white border border-cafe/7 rounded-[20px] p-4">
      <div className="flex flex-wrap gap-2">
        {mesas.map((mesa) => {
          const estaSeleccionada = mesaSeleccionada === mesa.id
          return (
            <button
              key={mesa.id}
              onClick={() => onSeleccionarMesa?.(mesa.id)}
              disabled={mesa.estado === 'ocupada'}
              className={`w-7 h-7 rounded-[10px] transition-all ${estilosMesa[mesa.estado]} ${
                estaSeleccionada ? 'ring-2 ring-amarillo ring-offset-1' : ''
              } ${onSeleccionarMesa && mesa.estado !== 'ocupada' ? 'cursor-pointer' : 'cursor-default'}`}
              title={`Mesa ${mesa.id} · ${mesa.estado}`}
            />
          )
        })}
      </div>
    </div>
  )
}
