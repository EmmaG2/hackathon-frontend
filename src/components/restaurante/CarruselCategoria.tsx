import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TarjetaRestaurante } from './TarjetaRestaurante'
import type { Restaurante } from '@/types'

interface Props {
  titulo: string
  restaurantes: Restaurante[]
  onVerRestaurante: (id: string) => void
}

export function CarruselCategoria({ titulo, restaurantes, onVerRestaurante }: Props) {
  const contenedorRef = useRef<HTMLDivElement>(null)

  function desplazar(direccion: 'izquierda' | 'derecha') {
    contenedorRef.current?.scrollBy({
      left: direccion === 'derecha' ? 300 : -300,
      behavior: 'smooth',
    })
  }

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-[18px] md:text-[22px] text-cafe">{titulo}</h2>
        <div className="hidden md:flex gap-1.5">
          <button
            onClick={() => desplazar('izquierda')}
            className="w-8 h-8 rounded-full border border-cafe/15 flex items-center justify-center text-cafe hover:border-cafe/40 transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => desplazar('derecha')}
            className="w-8 h-8 rounded-full border border-cafe/15 flex items-center justify-center text-cafe hover:border-cafe/40 transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div
        ref={contenedorRef}
        className="flex gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-webkit-overflow-scrolling:touch]"
      >
        {restaurantes.map((restaurante) => (
          <div key={restaurante.id} className="shrink-0 w-[260px] md:w-[280px]">
            <TarjetaRestaurante
              nombre={restaurante.nombre}
              ubicacion={restaurante.ubicacion}
              precio={restaurante.precio}
              porcentajeOcupacion={restaurante.porcentajeOcupacion}
              etiquetaOcupacion={restaurante.etiquetaOcupacion}
              img={restaurante.img ?? ''}
              onClick={() => onVerRestaurante(restaurante.id)}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
