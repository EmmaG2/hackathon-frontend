interface MesaRedonda {
  id: number
  forma: 'redonda'
  cx: number
  cy: number
  r: number
  asientos: number
  estado: 'libre' | 'ocupada' | 'reservada'
}

interface MesaCuadrada {
  id: number
  forma: 'cuadrada'
  x: number
  y: number
  w: number
  h: number
  asientos: number
  estado: 'libre' | 'ocupada' | 'reservada'
}

type MesaPlano = MesaRedonda | MesaCuadrada

interface Props {
  mesaSeleccionada?: number | null
  onSeleccionarMesa?: (id: number) => void
  cantPersonas?: number
}

const ANCHO = 340
const ALTO = 460

const MESAS: MesaPlano[] = [
  { id: 1,  forma: 'redonda',  cx: 60,  cy: 60,  r: 18, asientos: 2, estado: 'ocupada'   },
  { id: 2,  forma: 'redonda',  cx: 138, cy: 60,  r: 18, asientos: 2, estado: 'ocupada'   },
  { id: 3,  forma: 'redonda',  cx: 216, cy: 60,  r: 18, asientos: 2, estado: 'libre'     },
  { id: 4,  forma: 'cuadrada', x: 28,  y: 120, w: 54, h: 54, asientos: 4, estado: 'ocupada'   },
  { id: 5,  forma: 'cuadrada', x: 28,  y: 198, w: 54, h: 54, asientos: 4, estado: 'reservada' },
  { id: 6,  forma: 'cuadrada', x: 28,  y: 276, w: 54, h: 54, asientos: 4, estado: 'ocupada'   },
  { id: 7,  forma: 'redonda',  cx: 152, cy: 148, r: 26, asientos: 4, estado: 'ocupada'   },
  { id: 8,  forma: 'redonda',  cx: 230, cy: 148, r: 26, asientos: 4, estado: 'libre'     },
  { id: 9,  forma: 'redonda',  cx: 152, cy: 240, r: 26, asientos: 4, estado: 'ocupada'   },
  { id: 10, forma: 'redonda',  cx: 230, cy: 240, r: 26, asientos: 4, estado: 'ocupada'   },
  { id: 11, forma: 'cuadrada', x: 110, y: 320, w: 80, h: 46, asientos: 6, estado: 'libre'     },
  { id: 12, forma: 'cuadrada', x: 200, y: 320, w: 80, h: 46, asientos: 6, estado: 'ocupada'   },
  { id: 13, forma: 'redonda',  cx: 304, cy: 92,  r: 14, asientos: 2, estado: 'ocupada'   },
  { id: 14, forma: 'redonda',  cx: 304, cy: 148, r: 14, asientos: 2, estado: 'ocupada'   },
]

const PALETA = {
  libre:        { fondo: '#E8DCC8', borde: '#3A2E20', silla: '#3A2E20',   num: '#3A2E20' },
  ocupada:      { fondo: '#3A2E20', borde: '#5C4F3D', silla: '#E8DCC8',   num: '#9C8B76' },
  reservada:    { fondo: 'none',    borde: '#fbd464', silla: '#5C4F3D',   num: '#fbd464' },
  seleccionada: { fondo: '#fbd464', borde: '#fbd464', silla: '#1a1410',   num: '#1a1410' },
}

function sillasCiruclo(cx: number, cy: number, r: number, asientos: number, color: string) {
  const anchoSilla = 11, altoSilla = 5, gap = 4
  const angulos = asientos === 2
    ? [-Math.PI / 2, Math.PI / 2]
    : Array.from({ length: asientos }, (_, i) => (i / asientos) * Math.PI * 2 - Math.PI / 2)

  return angulos.map((a, i) => {
    const x = cx + Math.cos(a) * (r + gap + altoSilla / 2)
    const y = cy + Math.sin(a) * (r + gap + altoSilla / 2)
    const rot = (a * 180 / Math.PI) + 90
    return (
      <rect
        key={i}
        x={-anchoSilla / 2} y={-altoSilla / 2}
        width={anchoSilla} height={altoSilla}
        rx={1.5} fill={color}
        transform={`translate(${x} ${y}) rotate(${rot})`}
      />
    )
  })
}

function sillasRectangulo(x: number, y: number, w: number, h: number, asientos: number, color: string) {
  const anchoSilla = 11, altoSilla = 5, gap = 4
  const items: { cx: number; cy: number; rot: number }[] = []

  if (asientos === 4) {
    items.push({ cx: x + w / 2, cy: y - gap - altoSilla / 2,       rot: 0  })
    items.push({ cx: x + w / 2, cy: y + h + gap + altoSilla / 2,   rot: 0  })
    items.push({ cx: x - gap - altoSilla / 2,       cy: y + h / 2, rot: 90 })
    items.push({ cx: x + w + gap + altoSilla / 2,   cy: y + h / 2, rot: 90 })
  } else {
    items.push({ cx: x + w * 0.27, cy: y - gap - altoSilla / 2,     rot: 0  })
    items.push({ cx: x + w * 0.73, cy: y - gap - altoSilla / 2,     rot: 0  })
    items.push({ cx: x + w * 0.27, cy: y + h + gap + altoSilla / 2, rot: 0  })
    items.push({ cx: x + w * 0.73, cy: y + h + gap + altoSilla / 2, rot: 0  })
    items.push({ cx: x - gap - altoSilla / 2,       cy: y + h / 2,  rot: 90 })
    items.push({ cx: x + w + gap + altoSilla / 2,   cy: y + h / 2,  rot: 90 })
  }

  return items.map((s, i) => (
    <rect
      key={i}
      x={-anchoSilla / 2} y={-altoSilla / 2}
      width={anchoSilla} height={altoSilla}
      rx={1.5} fill={color}
      transform={`translate(${s.cx} ${s.cy}) rotate(${s.rot})`}
    />
  ))
}

function MesaSVG({
  mesa,
  seleccionada,
  opaca,
  interactiva,
  onTap,
}: {
  mesa: MesaPlano
  seleccionada: boolean
  opaca: boolean
  interactiva: boolean
  onTap: () => void
}) {
  const estado = seleccionada ? 'seleccionada' : mesa.estado
  const cfg = PALETA[estado]
  const esDashedReservada = estado === 'reservada'
  const esSeleccionada = estado === 'seleccionada'

  const centro = mesa.forma === 'redonda'
    ? { x: mesa.cx, y: mesa.cy }
    : { x: mesa.x + mesa.w / 2, y: mesa.y + mesa.h / 2 }

  const etiqueta = estado === 'reservada' ? 'R' : estado === 'ocupada' ? null : String(mesa.id)

  return (
    <g
      opacity={opaca ? 0.3 : 1}
      style={{ cursor: interactiva && !opaca && mesa.estado === 'libre' ? 'pointer' : 'default' }}
      onClick={interactiva && mesa.estado === 'libre' && !opaca ? onTap : undefined}
    >
      {esSeleccionada && (
        <circle
          cx={centro.x} cy={centro.y}
          r={(mesa.forma === 'redonda' ? mesa.r : Math.max(mesa.w, mesa.h) / 2) + 10}
          fill="#fbd464" opacity={0.18}
        />
      )}

      {mesa.forma === 'redonda' ? (
        <>
          {sillasCiruclo(mesa.cx, mesa.cy, mesa.r, mesa.asientos, cfg.silla)}
          <circle
            cx={mesa.cx} cy={mesa.cy} r={mesa.r}
            fill={cfg.fondo} stroke={cfg.borde}
            strokeWidth={esDashedReservada ? 1.6 : 1.2}
            strokeDasharray={esDashedReservada ? '3 2.5' : undefined}
            filter={esSeleccionada ? 'url(#brillo)' : undefined}
          />
        </>
      ) : (
        <>
          {sillasRectangulo(mesa.x, mesa.y, mesa.w, mesa.h, mesa.asientos, cfg.silla)}
          <rect
            x={mesa.x} y={mesa.y} width={mesa.w} height={mesa.h} rx={4}
            fill={cfg.fondo} stroke={cfg.borde}
            strokeWidth={esDashedReservada ? 1.6 : 1.2}
            strokeDasharray={esDashedReservada ? '3 2.5' : undefined}
            filter={esSeleccionada ? 'url(#brillo)' : undefined}
          />
        </>
      )}

      {etiqueta && (
        <text
          x={centro.x} y={centro.y + 3.5}
          textAnchor="middle"
          fontSize={estado === 'reservada' ? 11 : 9.5}
          fontWeight="700"
          fill={cfg.num}
          fontFamily="monospace"
        >
          {etiqueta}
        </text>
      )}
    </g>
  )
}

const LEYENDA_ITEMS = [
  { key: 'libre',        label: 'Libre',        fondo: '#E8DCC8', borde: '#3A2E20', dash: false },
  { key: 'seleccionada', label: 'Seleccionada', fondo: '#fbd464', borde: '#fbd464', dash: false },
  { key: 'ocupada',      label: 'Ocupada',      fondo: '#3A2E20', borde: '#5C4F3D', dash: false },
  { key: 'reservada',    label: 'Reservada',    fondo: 'none',    borde: '#fbd464', dash: true  },
]

function LeyendaPlano() {
  return (
    <div className="flex flex-wrap gap-3 text-[11px] font-body text-cafe-atenuado">
      {LEYENDA_ITEMS.map(item => (
        <div key={item.key} className="flex items-center gap-1.5">
          <span
            className="w-3 h-3 rounded-[3px] shrink-0"
            style={{
              background: item.fondo,
              border: `1.4px ${item.dash ? 'dashed' : 'solid'} ${item.borde}`,
            }}
          />
          {item.label}
        </div>
      ))}
    </div>
  )
}

export function PlanoMesasCinepolis({ mesaSeleccionada, onSeleccionarMesa, cantPersonas = 1 }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="relative w-full rounded-[16px] overflow-hidden border border-cafe/7"
        style={{ background: 'linear-gradient(180deg, #f2ede2 0%, #efeae0 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, rgba(245,235,220,0.018) 0 14px, transparent 14px 30px)',
          }}
        />
        <svg
          viewBox={`0 0 ${ANCHO} ${ALTO}`}
          style={{ width: '100%', display: 'block', position: 'relative' }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="brillo" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feFlood floodColor="#fbd464" floodOpacity="0.55" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="colorBlur" />
              <feMerge>
                <feMergeNode in="colorBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g fontFamily="monospace" fontSize={8.5} fontWeight={600} letterSpacing="0.1em" fill="#8a7e70">
            <text x="20"       y="16"  textAnchor="start">VENTANA</text>
            <text x={ANCHO - 31} y="34" transform={`rotate(90 ${ANCHO - 31} 34)`}>BARRA</text>
            <text x="150"      y={ALTO - 4} textAnchor="middle">— ENTRADA —</text>
          </g>

          {MESAS.map(mesa => {
            const muyPequena = cantPersonas > 1 && mesa.asientos < cantPersonas && mesa.estado === 'libre'
            return (
              <MesaSVG
                key={mesa.id}
                mesa={mesa}
                seleccionada={mesaSeleccionada === mesa.id}
                opaca={muyPequena}
                interactiva={!!onSeleccionarMesa}
                onTap={() => {
                  if (mesaSeleccionada === mesa.id) {
                    onSeleccionarMesa?.(mesa.id)
                  } else {
                    onSeleccionarMesa?.(mesa.id)
                  }
                }}
              />
            )
          })}
        </svg>
      </div>

      <LeyendaPlano />
    </div>
  )
}
