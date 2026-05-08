import { Lock, CreditCard, User, Calendar, MapPin, RotateCcw } from 'lucide-react'
import { useFormularioTarjeta } from '@/hooks/useFormularioTarjeta'
import { TarjetaCredito } from './TarjetaCredito'
import { InsigniaMarcaTarjeta } from './InsigniaMarcaTarjeta'
import { formatearMoneda } from '@/lib/utils'

type Props = {
  totalMxn: number
  alExito: () => void
}

const claseInput =
  'w-full h-11 rounded-lg border border-cafe/12 bg-white text-sm transition-all outline-none focus:ring-2 focus:ring-amarillo/50 focus:border-amarillo placeholder:text-cafe-claro'

export function FormularioPago({ totalMxn, alExito }: Props) {
  const {
    formulario,
    marca,
    estaVolteada,
    cargando,
    error,
    esValido,
    longitudCvv,
    setEstaVolteada,
    manejarNumeroTarjeta,
    manejarVencimiento,
    manejarCvv,
    manejarTitular,
    manejarCodigoPostal,
    manejarEnvio,
  } = useFormularioTarjeta(alExito)

  return (
    <div className="space-y-6">
      <TarjetaCredito formulario={formulario} marca={marca} estaVolteada={estaVolteada} />

      <form onSubmit={manejarEnvio} className="space-y-4" noValidate>
        {/* Número de tarjeta */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-medium text-cafe-atenuado uppercase tracking-widest">
            Número de tarjeta
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cafe-claro" />
            <input
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="0000 0000 0000 0000"
              value={formulario.numeroTarjeta}
              onChange={manejarNumeroTarjeta}
              maxLength={marca === 'amex' ? 17 : 19}
              className={`${claseInput} pl-10 ${marca ? 'pr-14' : 'pr-4'} font-mono tracking-wider`}
            />
            {marca && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                <InsigniaMarcaTarjeta marca={marca} tamano="sm" />
              </div>
            )}
          </div>
        </div>

        {/* Nombre del titular */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-medium text-cafe-atenuado uppercase tracking-widest">
            Nombre del titular
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cafe-claro" />
            <input
              type="text"
              autoComplete="cc-name"
              placeholder="COMO APARECE EN LA TARJETA"
              value={formulario.titular}
              onChange={manejarTitular}
              className={`${claseInput} pl-10 pr-4 uppercase tracking-wider`}
            />
          </div>
        </div>

        {/* Vencimiento + CVV */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[10px] font-medium text-cafe-atenuado uppercase tracking-widest">
              Vencimiento
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cafe-claro" />
              <input
                type="text"
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM/AA"
                value={formulario.vencimiento}
                onChange={manejarVencimiento}
                maxLength={5}
                className={`${claseInput} pl-10 pr-3 font-mono`}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-medium text-cafe-atenuado uppercase tracking-widest">
              CVV
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setEstaVolteada(f => !f)}
                title={estaVolteada ? 'Ver frente' : 'Ver reverso'}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-cafe-claro hover:text-amarillo-oscuro transition-colors"
                tabIndex={-1}
              >
                <RotateCcw className={`w-4 h-4 transition-transform duration-300 ${estaVolteada ? 'rotate-180' : ''}`} />
              </button>
              <input
                type="password"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder={marca === 'amex' ? '••••' : '•••'}
                value={formulario.cvv}
                onChange={manejarCvv}
                onFocus={() => setEstaVolteada(true)}
                onBlur={() => setEstaVolteada(false)}
                maxLength={longitudCvv}
                className={`${claseInput} pl-10 pr-3 font-mono`}
              />
            </div>
          </div>
        </div>

        {/* Código postal */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-medium text-cafe-atenuado uppercase tracking-widest">
            Código postal
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cafe-claro" />
            <input
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              placeholder="00000"
              value={formulario.codigoPostal}
              onChange={manejarCodigoPostal}
              maxLength={5}
              className={`${claseInput} pl-10 pr-4 font-mono`}
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex items-center gap-2 text-[11px] text-cafe-atenuado pt-2">
          <Lock className="w-3.5 h-3.5 shrink-0" />
          <span>Tus datos están encriptados con TLS 256-bit</span>
        </div>

        <button
          type="submit"
          className={`w-full h-[52px] rounded-full flex items-center justify-center gap-2 transition-all shadow-lg shadow-amarillo/20 ${
            esValido && !cargando ? 'bg-amarillo hover:bg-amarillo-oscuro' : 'bg-cafe/10 opacity-50 cursor-not-allowed'
          }`}
          disabled={cargando || !esValido}
        >
          {cargando ? (
            <>
              <span className="w-4 h-4 border-2 border-cafe/30 border-t-cafe rounded-full animate-spin" />
              <span className="font-body font-bold text-[15px] text-cafe-texto">Procesando...</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 text-cafe-texto" />
              <span className="font-body font-bold text-[15px] text-cafe-texto">
                Pagar {formatearMoneda(totalMxn)}
              </span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}
