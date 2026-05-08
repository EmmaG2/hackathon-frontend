interface Props {
  porcentaje: number
  etiqueta: string
}

const coloresPorOcupacion = (porcentaje: number) => {
  if (porcentaje <= 50) {
    return { fondo: 'bg-disponible/20', punto: 'bg-disponible', texto: 'text-disponible' }
  }
  if (porcentaje <= 80) {
    return {
      fondo: 'bg-amarillo-oscuro/22 border border-amarillo-oscuro/32',
      punto: 'bg-amarillo-oscuro',
      texto: 'text-amarillo-oscuro',
    }
  }
  return { fondo: 'bg-lleno/18', punto: 'bg-lleno', texto: 'text-lleno' }
}

export function InsigniaOcupacion({ porcentaje, etiqueta }: Props) {
  const colores = coloresPorOcupacion(porcentaje)

  return (
    <div className={`flex items-center gap-1.25 px-2 py-0.75 rounded-full ${colores.fondo}`}>
      <div className={`w-1.25 h-1.25 rounded-full shrink-0 ${colores.punto}`} />
      <span className={`font-body font-semibold text-[10px] ${colores.texto}`}>{etiqueta}</span>
    </div>
  )
}
