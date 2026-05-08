import type { MarcaTarjeta, DatosFormularioTarjeta } from '@/hooks/useFormularioTarjeta'
import { InsigniaMarcaTarjeta } from './InsigniaMarcaTarjeta'

type Props = {
  formulario: DatosFormularioTarjeta
  marca: MarcaTarjeta
  estaVolteada: boolean
}

export function TarjetaCredito({ formulario, marca, estaVolteada }: Props) {
  const numero = formulario.numeroTarjeta || '•••• •••• •••• ••••'
  const titular = formulario.titular || 'NOMBRE TITULAR'
  const vencimiento = formulario.vencimiento || 'MM/AA'
  const cvvOculto = formulario.cvv ? '•'.repeat(formulario.cvv.length) : '•••'

  return (
    <div style={{ perspective: '1200px' }} className="w-full select-none" aria-hidden="true">
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 190,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: estaVolteada ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* ── Frente ── */}
        <div
          className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, #3D2F26 0%, #1A1410 55%, #5C1F12 100%)',
            boxShadow: '0 20px 50px rgba(26,20,16,0.5), 0 8px 16px rgba(196,69,45,0.2)',
          }}
        >
          {/* Reflejo de luz */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 55%, rgba(196,69,45,0.04) 100%)',
            }}
          />

          {/* Fila superior: chip + logo */}
          <div className="flex justify-between items-start relative z-10">
            <div
              className="w-10 h-7 rounded"
              style={{
                background: 'linear-gradient(135deg, #E8C97A 0%, #B8971F 100%)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
              }}
            />
            <InsigniaMarcaTarjeta marca={marca} tamano="lg" />
          </div>

          {/* Número */}
          <div
            className="relative z-10 tracking-widest"
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: '1rem',
              color: '#F5E6D3',
              textShadow: '0 1px 4px rgba(0,0,0,0.6)',
              letterSpacing: '0.16em',
            }}
          >
            {numero}
          </div>

          {/* Fila inferior: titular + vencimiento */}
          <div className="flex justify-between items-end relative z-10">
            <div className="min-w-0 flex-1 mr-4">
              <p
                className="mb-0.5"
                style={{
                  fontSize: '0.45rem',
                  color: 'rgba(245,230,211,0.5)',
                  letterSpacing: '0.12em',
                }}
              >
                TITULAR
              </p>
              <p
                className="truncate"
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: '0.68rem',
                  color: '#F5E6D3',
                  letterSpacing: '0.04em',
                }}
              >
                {titular}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p
                className="mb-0.5"
                style={{
                  fontSize: '0.45rem',
                  color: 'rgba(245,230,211,0.5)',
                  letterSpacing: '0.12em',
                }}
              >
                VENCE
              </p>
              <p
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: '0.68rem',
                  color: '#F5E6D3',
                  letterSpacing: '0.06em',
                }}
              >
                {vencimiento}
              </p>
            </div>
          </div>
        </div>

        {/* ── Reverso ── */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, #1A1410 0%, #3D2F26 100%)',
            boxShadow: '0 20px 50px rgba(26,20,16,0.5)',
          }}
        >
          {/* Banda magnética */}
          <div className="w-full mt-7" style={{ height: 42, background: 'rgba(0,0,0,0.85)' }} />

          {/* Franja CVV */}
          <div className="px-5 mt-3">
            <div
              className="rounded px-3 py-2 flex justify-end items-center"
              style={{ background: 'rgba(251,247,240,0.92)' }}
            >
              <span
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: '0.85rem',
                  letterSpacing: '0.22em',
                  color: '#1A1410',
                }}
              >
                {cvvOculto}
              </span>
            </div>
            <p
              className="text-right mt-1"
              style={{
                fontSize: '0.45rem',
                color: 'rgba(245,230,211,0.4)',
                letterSpacing: '0.1em',
              }}
            >
              CVV
            </p>
          </div>

          {/* Logo reverso */}
          <div className="absolute bottom-4 right-5">
            <InsigniaMarcaTarjeta marca={marca} tamano="lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
