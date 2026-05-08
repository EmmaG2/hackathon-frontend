import { InsigniaOcupacion } from '@/components/comunes/InsigniaOcupacion'

interface Props {
  nombre: string
  ubicacion: string
  precio: string
  porcentajeOcupacion: number
  etiquetaOcupacion: string
  img: string
  onClick?: () => void
}

export function TarjetaRestaurante({
  nombre,
  ubicacion,
  precio,
  porcentajeOcupacion,
  etiquetaOcupacion,
  img,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white border border-cafe/7 rounded-[20px] overflow-hidden text-left"
    >
      <div className="relative h-27 bg-arena">
        <img
          src={img}
          alt={nombre}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-oscuro/85 to-transparent via-30%" />
        <div className="absolute top-2.25 left-2.25">
          <InsigniaOcupacion porcentaje={porcentajeOcupacion} etiqueta={etiquetaOcupacion} />
        </div>
        <p className="absolute bottom-1.75 left-3 font-display text-[18px] text-crema-luz">{nombre}</p>
      </div>
      <div className="flex items-center justify-between px-3.5 py-2.5">
        <span className="font-body text-[12px] text-cafe-atenuado">📍 {ubicacion}</span>
        <span className="font-body font-medium text-[11px] text-cafe-claro">{precio}</span>
      </div>
    </button>
  )
}
