interface Props {
  etiqueta: string
  activo?: boolean
  onClick?: () => void
}

export function ChipFiltro({ etiqueta, activo = false, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-2 rounded-full font-body font-medium text-[12px] whitespace-nowrap transition-colors ${
        activo
          ? 'bg-cafe text-crema'
          : 'bg-white border border-cafe/10 text-cafe-atenuado'
      }`}
    >
      {etiqueta}
    </button>
  )
}
