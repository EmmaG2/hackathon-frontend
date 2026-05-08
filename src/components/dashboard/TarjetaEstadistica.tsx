interface Props {
  titulo: string
  valor: string
  descripcion: string
  children?: React.ReactNode
}

export function TarjetaEstadistica({ titulo, valor, descripcion, children }: Props) {
  return (
    <div className="bg-white border border-cafe/7 rounded-[14px] p-4 flex items-start justify-between flex-1">
      <div className="flex flex-col gap-0.5">
        <span className="font-body font-medium text-[11px] text-cafe-atenuado">{titulo}</span>
        <span className="font-display text-[30px] text-cafe leading-none">{valor}</span>
        <span className="font-body text-[12px] text-cafe-atenuado">{descripcion}</span>
      </div>
      {children}
    </div>
  )
}
