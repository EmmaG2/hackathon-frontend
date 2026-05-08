export interface MesaRedonda {
  id: number; forma: 'redonda'
  cx: number; cy: number; r: number
  asientos: number
}

export interface MesaCuadrada {
  id: number; forma: 'cuadrada'
  x: number; y: number; w: number; h: number
  asientos: number
}

export type MesaLayout = MesaRedonda | MesaCuadrada

export const ANCHO_PLANO = 340
export const ALTO_PLANO  = 460

export const LAYOUT_MESAS: MesaLayout[] = [
  { id: 1,  forma: 'redonda',  cx: 60,  cy: 60,  r: 18, asientos: 2 },
  { id: 2,  forma: 'redonda',  cx: 138, cy: 60,  r: 18, asientos: 2 },
  { id: 3,  forma: 'redonda',  cx: 216, cy: 60,  r: 18, asientos: 2 },
  { id: 4,  forma: 'cuadrada', x: 28,  y: 120, w: 54, h: 54, asientos: 4 },
  { id: 5,  forma: 'cuadrada', x: 28,  y: 198, w: 54, h: 54, asientos: 4 },
  { id: 6,  forma: 'cuadrada', x: 28,  y: 276, w: 54, h: 54, asientos: 4 },
  { id: 7,  forma: 'redonda',  cx: 152, cy: 148, r: 26, asientos: 4 },
  { id: 8,  forma: 'redonda',  cx: 230, cy: 148, r: 26, asientos: 4 },
  { id: 9,  forma: 'redonda',  cx: 152, cy: 240, r: 26, asientos: 4 },
  { id: 10, forma: 'redonda',  cx: 230, cy: 240, r: 26, asientos: 4 },
  { id: 11, forma: 'cuadrada', x: 110, y: 320, w: 80, h: 46, asientos: 6 },
  { id: 12, forma: 'cuadrada', x: 200, y: 320, w: 80, h: 46, asientos: 6 },
  { id: 13, forma: 'redonda',  cx: 304, cy: 92,  r: 14, asientos: 2 },
  { id: 14, forma: 'redonda',  cx: 304, cy: 148, r: 14, asientos: 2 },
]

export function sillasCirculo(cx: number, cy: number, r: number, asientos: number, color: string) {
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

export function sillasRectangulo(x: number, y: number, w: number, h: number, asientos: number, color: string) {
  const anchoSilla = 11, altoSilla = 5, gap = 4
  const items: { cx: number; cy: number; rot: number }[] = []

  if (asientos === 4) {
    items.push({ cx: x + w / 2, cy: y - gap - altoSilla / 2,     rot: 0  })
    items.push({ cx: x + w / 2, cy: y + h + gap + altoSilla / 2, rot: 0  })
    items.push({ cx: x - gap - altoSilla / 2,     cy: y + h / 2, rot: 90 })
    items.push({ cx: x + w + gap + altoSilla / 2, cy: y + h / 2, rot: 90 })
  } else {
    items.push({ cx: x + w * 0.27, cy: y - gap - altoSilla / 2,     rot: 0  })
    items.push({ cx: x + w * 0.73, cy: y - gap - altoSilla / 2,     rot: 0  })
    items.push({ cx: x + w * 0.27, cy: y + h + gap + altoSilla / 2, rot: 0  })
    items.push({ cx: x + w * 0.73, cy: y + h + gap + altoSilla / 2, rot: 0  })
    items.push({ cx: x - gap - altoSilla / 2,     cy: y + h / 2, rot: 90 })
    items.push({ cx: x + w + gap + altoSilla / 2, cy: y + h / 2, rot: 90 })
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
