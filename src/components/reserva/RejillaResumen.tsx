interface CampoResumen {
  etiqueta: string
  valor: string
  resaltado?: boolean
}

interface Props {
  campos: CampoResumen[]
}

export function RejillaResumen({ campos }: Props) {
  return (
    <div className="flex gap-6 items-start">
      {campos.map((campo) => (
        <div key={campo.etiqueta} className="flex flex-col gap-0.5">
          <span className="font-body font-medium text-[10px] text-cafe-atenuado">{campo.etiqueta}</span>
          <span className={`font-body font-semibold text-[14px] ${campo.resaltado ? 'text-amarillo' : 'text-cafe'}`}>
            {campo.valor}
          </span>
        </div>
      ))}
    </div>
  )
}
