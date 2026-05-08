import { useNavigate } from 'react-router-dom'
import { IcoGoogle } from '@/components/comunes/IcoGoogle'

export function LoginRestaurante() {
  const navegar = useNavigate()

  return (
    <div className="min-h-screen bg-oscuro flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col items-center gap-7">
        <button
          onClick={() => navegar('/')}
          className="font-display text-[28px] text-crema-luz leading-none"
        >
          Mesa<span className="text-amarillo">.</span>
        </button>

        <div className="w-full bg-white/5 border border-white/10 rounded-[24px] p-8 flex flex-col items-center gap-6">
          <div className="text-center">
            <p className="font-body text-[11px] font-medium text-crema-luz/40 uppercase tracking-widest mb-2">
              Panel de administración
            </p>
            <h1 className="font-display text-[26px] text-crema-luz">
              Acceso para restaurantes
            </h1>
            <p className="font-body text-[13px] text-crema-luz/45 mt-1.5">
              Gestiona tus reservas, mesas y ocupación en tiempo real.
            </p>
          </div>

          <div className="w-full h-px bg-white/8" />

          <button
            onClick={() => navegar('/dashboard')}
            className="w-full flex items-center justify-center gap-3 bg-white text-cafe rounded-full py-4 font-body font-semibold text-[14px] hover:bg-crema transition-colors"
          >
            <IcoGoogle size={18} />
            Continuar con Google
          </button>

          <p className="font-body text-[11px] text-crema-luz/30 text-center">
            Solo para administradores de restaurantes registrados.
          </p>
        </div>

        <button
          onClick={() => navegar('/')}
          className="font-body text-[13px] text-crema-luz/30 hover:text-crema-luz/60 transition-colors"
        >
          ← Volver a Mesa
        </button>
      </div>
    </div>
  )
}
