import type { Mesa } from '@/types/index'
import { LAYOUT_MESAS, ANCHO_PLANO as ANCHO, ALTO_PLANO as ALTO, sillasCirculo, sillasRectangulo } from '@/components/plano/planoUtils'
import type { MesaLayout } from '@/components/plano/planoUtils'

interface Props {
  mesas: Mesa[]
  onAlternarMesa: (id: number) => void
}

const PALETA = {
  libre:     { fondo: '#E8DCC8', borde: '#3A2E20', silla: '#3A2E20', num: '#3A2E20' },
  ocupada:   { fondo: '#3A2E20', borde: '#5C4F3D', silla: '#E8DCC8', num: '#9C8B76' },
  reservada: { fondo: 'none',    borde: '#fbd464', silla: '#5C4F3D', num: '#fbd464' },
}

function centroDeMesa(layout: MesaLayout) {
  return layout.forma === 'redonda'
    ? { x: layout.cx, y: layout.cy }
    : { x: layout.x + layout.w / 2, y: layout.y + layout.h / 2 }
}

function MesaDashboard({
  layout,
  mesa,
  onTap,
}: {
  layout: MesaLayout
  mesa: Mesa
  onTap: () => void
}) {
  const cfg = PALETA[mesa.estado]
  const reservada = mesa.estado === 'reservada'
  const centro = centroDeMesa(layout)
  const etiqueta = reservada ? 'R' : String(layout.id)

  return (
    <g
      onClick={reservada ? undefined : onTap}
      style={{ cursor: reservada ? 'default' : 'pointer' }}
    >
      {layout.forma === 'redonda' ? (
        <>
          {sillasCirculo(layout.cx, layout.cy, layout.r, layout.asientos, cfg.silla)}
          <circle
            cx={layout.cx} cy={layout.cy} r={layout.r}
            fill={cfg.fondo} stroke={cfg.borde}
            strokeWidth={reservada ? 1.6 : 1.2}
            strokeDasharray={reservada ? '3 2.5' : undefined}
          />
        </>
      ) : (
        <>
          {sillasRectangulo(layout.x, layout.y, layout.w, layout.h, layout.asientos, cfg.silla)}
          <rect
            x={layout.x} y={layout.y} width={layout.w} height={layout.h} rx={4}
            fill={cfg.fondo} stroke={cfg.borde}
            strokeWidth={reservada ? 1.6 : 1.2}
            strokeDasharray={reservada ? '3 2.5' : undefined}
          />
        </>
      )}
      <text
        x={centro.x} y={centro.y + 3.5}
        textAnchor="middle"
        fontSize={reservada ? 11 : 9.5}
        fontWeight="700"
        fill={cfg.num}
        fontFamily="monospace"
      >
        {etiqueta}
      </text>
    </g>
  )
}

export function PlanoSalon({ mesas, onAlternarMesa }: Props) {
  const estadoPorId = new Map(mesas.map(m => [m.id, m]))

  return (
    <div
      className="relative w-full rounded-[16px] overflow-hidden border border-cafe/7"
      style={{ background: 'linear-gradient(180deg, #f2ede2 0%, #efeae0 100%)' }}
    >
      <svg
        viewBox={`0 0 ${ANCHO} ${ALTO}`}
        style={{ width: '100%', display: 'block' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <g fontFamily="monospace" fontSize={8.5} fontWeight={600} letterSpacing="0.1em" fill="#8a7e70">
          <text x="20"          y="16"          textAnchor="start">VENTANA</text>
          <text x={ANCHO - 31}  y="34"          transform={`rotate(90 ${ANCHO - 31} 34)`}>BARRA</text>
          <text x="150"         y={ALTO - 4}    textAnchor="middle">— ENTRADA —</text>
        </g>

        {LAYOUT_MESAS.map(layout => {
          const mesa = estadoPorId.get(layout.id)
          if (!mesa) return null
          return (
            <MesaDashboard
              key={layout.id}
              layout={layout}
              mesa={mesa}
              onTap={() => onAlternarMesa(layout.id)}
            />
          )
        })}
      </svg>
    </div>
  )
}
