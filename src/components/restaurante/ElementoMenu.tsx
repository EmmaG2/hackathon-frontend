interface Props {
  nombre: string
  descripcion: string
  precio: number
}

export function ElementoMenu({ nombre, descripcion, precio }: Props) {
  return (
    <div className="bg-white border border-cafe/7 rounded-[14px] flex gap-3 items-start p-3">
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <span className="font-body font-semibold text-[13px] text-cafe">{nombre}</span>
          <span className="font-body font-semibold text-[13px] text-amarillo shrink-0">${precio}</span>
        </div>
        <p className="font-body text-[11px] text-cafe-atenuado">{descripcion}</p>
      </div>
      <div className="w-15 h-15 rounded-[10px] bg-arena shrink-0" />
    </div>
  )
}
