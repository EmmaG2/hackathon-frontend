import {
  sillasCirculo,
  sillasRectangulo,
  ANCHO_PLANO as ANCHO,
  ALTO_PLANO as ALTO,
} from '@/components/plano/planoUtils'

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
  mesasOcupadas?: number[]
}

const MESAS: MesaPlano[] = [
  { id: 1,  forma: 'redonda',  cx: 60,  cy: 60,  r: 18, asientos: 2, estado: 'libre' },
  { id: 2,  forma: 'redonda',  cx: 138, cy: 60,  r: 18, asientos: 2, estado: 'libre' },
  { id: 3,  forma: 'redonda',  cx: 216, cy: 60,  r: 18, asientos: 2, estado: 'libre' },

  { id: 4,  forma: 'cuadrada', x: 28,  y: 120, w: 54, h: 54, asientos: 4, estado: 'libre' },
  { id: 5,  forma: 'cuadrada', x: 28,  y: 198, w: 54, h: 54, asientos: 4, estado: 'libre' },
  { id: 6,  forma: 'cuadrada', x: 28,  y: 276, w: 54, h: 54, asientos: 4, estado: 'libre' },

  { id: 7,  forma: 'redonda',  cx: 152, cy: 148, r: 26, asientos: 4, estado: 'libre' },
  { id: 8,  forma: 'redonda',  cx: 230, cy: 148, r: 26, asientos: 4, estado: 'libre' },
  { id: 9,  forma: 'redonda',  cx: 152, cy: 240, r: 26, asientos: 4, estado: 'libre' },
  { id: 10, forma: 'redonda',  cx: 230, cy: 240, r: 26, asientos: 4, estado: 'libre' },

  { id: 11, forma: 'cuadrada', x: 110, y: 320, w: 80, h: 46, asientos: 6, estado: 'libre' },
  { id: 12, forma: 'cuadrada', x: 200, y: 320, w: 80, h: 46, asientos: 6, estado: 'libre' },

  { id: 13, forma: 'redonda',  cx: 304, cy: 92,  r: 14, asientos: 2, estado: 'libre' },
  { id: 14, forma: 'redonda',  cx: 304, cy: 148, r: 14, asientos: 2, estado: 'libre' },
]

const PALETA = {
  libre: {
    fondo: '#E8DCC8',
    borde: '#3A2E20',
    silla: '#3A2E20',
    num: '#3A2E20',
  },

  ocupada: {
    fondo: '#3A2E20',
    borde: '#5C4F3D',
    silla: '#E8DCC8',
    num: '#9C8B76',
  },

  reservada: {
    fondo: 'none',
    borde: '#fbd464',
    silla: '#5C4F3D',
    num: '#fbd464',
  },

  seleccionada: {
    fondo: '#fbd464',
    borde: '#fbd464',
    silla: '#1a1410',
    num: '#1a1410',
  },
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
  const estado = seleccionada
    ? 'seleccionada'
    : mesa.estado

  const cfg =
    PALETA[
      estado as keyof typeof PALETA
    ]

  const esDashedReservada =
    estado === 'reservada'

  const esSeleccionada =
    estado === 'seleccionada'

  const centro =
    mesa.forma === 'redonda'
      ? { x: mesa.cx, y: mesa.cy }
      : {
          x: mesa.x + mesa.w / 2,
          y: mesa.y + mesa.h / 2,
        }

  const etiqueta =
    estado === 'reservada'
      ? 'R'
      : estado === 'ocupada'
      ? null
      : String(mesa.id)

  return (
    <g
      opacity={opaca ? 0.3 : 1}
      style={{
        cursor:
          interactiva &&
          !opaca &&
          mesa.estado === 'libre'
            ? 'pointer'
            : 'default',
      }}
      onClick={
        interactiva &&
        mesa.estado === 'libre' &&
        !opaca
          ? onTap
          : undefined
      }
    >
      {esSeleccionada && (
        <circle
          cx={centro.x}
          cy={centro.y}
          r={
            (mesa.forma === 'redonda'
              ? mesa.r
              : Math.max(
                  mesa.w,
                  mesa.h
                ) / 2) + 10
          }
          fill="#fbd464"
          opacity={0.18}
        />
      )}

      {mesa.forma === 'redonda' ? (
        <>
          {sillasCirculo(
            mesa.cx,
            mesa.cy,
            mesa.r,
            mesa.asientos,
            cfg.silla
          )}

          <circle
            cx={mesa.cx}
            cy={mesa.cy}
            r={mesa.r}
            fill={cfg.fondo}
            stroke={cfg.borde}
            strokeWidth={
              esDashedReservada
                ? 1.6
                : 1.2
            }
            strokeDasharray={
              esDashedReservada
                ? '3 2.5'
                : undefined
            }
            filter={
              esSeleccionada
                ? 'url(#brillo)'
                : undefined
            }
          />
        </>
      ) : (
        <>
          {sillasRectangulo(
            mesa.x,
            mesa.y,
            mesa.w,
            mesa.h,
            mesa.asientos,
            cfg.silla
          )}

          <rect
            x={mesa.x}
            y={mesa.y}
            width={mesa.w}
            height={mesa.h}
            rx={4}
            fill={cfg.fondo}
            stroke={cfg.borde}
            strokeWidth={
              esDashedReservada
                ? 1.6
                : 1.2
            }
            strokeDasharray={
              esDashedReservada
                ? '3 2.5'
                : undefined
            }
            filter={
              esSeleccionada
                ? 'url(#brillo)'
                : undefined
            }
          />
        </>
      )}

      {etiqueta && (
        <text
          x={centro.x}
          y={centro.y + 3.5}
          textAnchor="middle"
          fontSize={
            estado === 'reservada'
              ? 11
              : 9.5
          }
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
  {
    key: 'libre',
    label: 'Libre',
    fondo: '#E8DCC8',
    borde: '#3A2E20',
    dash: false,
  },

  {
    key: 'seleccionada',
    label: 'Seleccionada',
    fondo: '#fbd464',
    borde: '#fbd464',
    dash: false,
  },

  {
    key: 'ocupada',
    label: 'Ocupada',
    fondo: '#3A2E20',
    borde: '#5C4F3D',
    dash: false,
  },

  {
    key: 'reservada',
    label: 'Reservada',
    fondo: 'none',
    borde: '#fbd464',
    dash: true,
  },
]

function LeyendaPlano() {
  return (
    <div className="flex flex-wrap gap-3 text-[11px] font-body text-cafe-atenuado">
      {LEYENDA_ITEMS.map((item) => (
        <div
          key={item.key}
          className="flex items-center gap-1.5"
        >
          <span
            className="w-3 h-3 rounded-[3px] shrink-0"
            style={{
              background: item.fondo,
              border: `1.4px ${
                item.dash
                  ? 'dashed'
                  : 'solid'
              } ${item.borde}`,
            }}
          />

          {item.label}
        </div>
      ))}
    </div>
  )
}

export function PlanoMesasCinepolis({
  mesaSeleccionada,
  onSeleccionarMesa,
  cantPersonas = 1,
  mesasOcupadas = [],
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="relative w-full rounded-[16px] overflow-hidden border border-cafe/7"
        style={{
          background:
            'linear-gradient(180deg, #f2ede2 0%, #efeae0 100%)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, rgba(245,235,220,0.018) 0 14px, transparent 14px 30px)',
          }}
        />

        <svg
          viewBox={`0 0 ${ANCHO} ${ALTO}`}
          style={{
            width: '100%',
            display: 'block',
            position: 'relative',
          }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter
              id="brillo"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur
                stdDeviation="5"
                result="blur"
              />

              <feFlood
                floodColor="#fbd464"
                floodOpacity="0.55"
                result="color"
              />

              <feComposite
                in="color"
                in2="blur"
                operator="in"
                result="colorBlur"
              />

              <feMerge>
                <feMergeNode in="colorBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {MESAS.map((mesa) => {

            const ocupadaPorReserva =
              mesasOcupadas.includes(
                mesa.id
              )

            const mesaActualizada =
              ocupadaPorReserva
                ? {
                    ...mesa,
                    estado:
                      'reservada' as const,
                  }
                : mesa

            const muyPequena =
              cantPersonas >
                mesa.asientos &&
              mesaActualizada.estado ===
                'libre'

            const bloqueada =
              mesaActualizada.estado !==
              'libre'

            return (
              <MesaSVG
                key={mesa.id}
                mesa={mesaActualizada}
                seleccionada={
                  mesaSeleccionada ===
                  mesa.id
                }
                opaca={muyPequena}
                interactiva={
                  !!onSeleccionarMesa &&
                  !bloqueada
                }
                onTap={() => {
                  if (bloqueada) return

                  onSeleccionarMesa?.(
                    mesa.id
                  )
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