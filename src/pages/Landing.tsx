import { useNavigate } from 'react-router-dom'
import { Utensils, Zap, CalendarDays, CheckCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { IcoGoogle } from '@/components/comunes/IcoGoogle'

type Restaurante = { nombre: string; zona: string; mesas: number }
type Caracteristica = { Icono: LucideIcon; titulo: string; descripcion: string }

const RESTAURANTES_EN_VIVO: Restaurante[] = [
  { nombre: 'Café Marfil', zona: 'Roma Norte', mesas: 3 },
  { nombre: 'Rincón Ma. Elena', zona: 'Condesa',    mesas: 1 },
  { nombre: 'Mamboretá Coffee',    zona: 'Polanco',    mesas: 5 },
]

const CARACTERISTICAS: Caracteristica[] = [
  {
    Icono: Zap,
    titulo: 'Disponibilidad en tiempo real',
    descripcion: 'Ve exactamente cuántas mesas hay libres ahora mismo en cada restaurante. Sin sorpresas al llegar.',
  },
  {
    Icono: CalendarDays,
    titulo: 'Reserva en segundos',
    descripcion: 'Elige fecha, hora y mesa directamente desde tu teléfono. Sin llamadas, sin formularios largos.',
  },
  {
    Icono: CheckCircle,
    titulo: 'Cancela sin cargo',
    descripcion: 'Cambia de planes sin penalización hasta 2 horas antes. Tu agenda, tus reglas.',
  },
]

function NavegacionLanding({ onIniciarSesion, onRestaurante }: { onIniciarSesion: () => void; onRestaurante: () => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 bg-crema/96 backdrop-blur-sm border-b border-cafe/7">
      <span className="font-display text-[24px] text-cafe leading-none">
        Mesa<span className="text-amarillo">.</span>
      </span>
      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={onRestaurante}
          className="hidden md:block font-body text-[13px] text-cafe-atenuado hover:text-cafe transition-colors"
        >
          ¿Eres un restaurante?
        </button>
        <button
          onClick={onIniciarSesion}
          className="flex items-center gap-2 bg-oscuro text-crema-luz rounded-full px-4 py-2.5 font-body font-medium text-[13px] hover:bg-cafe transition-all"
        >
          <IcoGoogle />
          <span className="hidden md:inline">Iniciar sesión con Google</span>
          <span className="md:hidden">Entrar</span>
        </button>
      </div>
    </nav>
  )
}

function TarjetaRestauranteLive({ r }: { r: Restaurante }) {
  return (
    <div className="bg-white/6 border border-white/8 rounded-2xl px-4 py-3.5 flex items-center gap-3 hover:bg-white/10 transition-colors cursor-pointer">
      <div className="w-9 h-9 bg-amarillo/15 rounded-xl flex items-center justify-center shrink-0">
        <Utensils size={15} className="text-amarillo" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body font-semibold text-[13px] text-crema-luz truncate">{r.nombre}</p>
        <p className="font-body text-[11px] text-crema-luz/45">
          {r.zona} · {r.mesas} {r.mesas === 1 ? 'mesa libre' : 'mesas libres'}
        </p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="w-1.5 h-1.5 bg-disponible rounded-full" />
        <span className="font-body text-[10px] text-disponible">Ahora</span>
      </div>
    </div>
  )
}

function PanelOscuro({ onExplorar }: { onExplorar: () => void }) {
  return (
    <div
      className="hidden md:flex w-[50%] bg-oscuro relative overflow-hidden flex-col justify-center px-12 gap-4"
      style={{ clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
    >
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, #e8dcc8 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="absolute top-16 right-8 bg-amarillo rounded-[18px] px-4 py-3 shadow-lg">
        <p className="font-body text-[10px] font-medium text-cafe/70 uppercase tracking-wider">Ahora mismo</p>
        <p className="font-display text-[32px] text-cafe leading-none">247</p>
        <p className="font-body text-[11px] text-cafe/70">restaurantes disponibles</p>
      </div>

      <div className="absolute top-1/2 right-12 -translate-y-1/2 w-52 h-52 rounded-full border border-white/5 opacity-30" />
      <div className="absolute top-1/2 right-6 -translate-y-1/2 w-72 h-72 rounded-full border border-white/4 opacity-20" />

      <div className="relative z-10 mt-28 flex flex-col gap-3 pl-8">
        <p className="font-body font-medium text-[10px] text-crema-luz/35 uppercase tracking-widest mb-1">
          Disponibles ahora
        </p>
        {RESTAURANTES_EN_VIVO.map((r) => (
          <TarjetaRestauranteLive key={r.nombre} r={r} />
        ))}
        <button
          onClick={onExplorar}
          className="mt-1 text-crema-luz/35 font-body text-[12px] hover:text-crema-luz/65 transition-colors text-left pl-1"
        >
          Ver todos los restaurantes →
        </button>
      </div>
    </div>
  )
}

function SeccionCaracteristicas() {
  return (
    <section className="px-6 md:px-12 py-20 border-t border-cafe/7">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-[34px] md:text-[42px] text-cafe mb-3">
            Reservar nunca fue tan fácil
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {CARACTERISTICAS.map((c) => (
            <div
              key={c.titulo}
              className="bg-white border border-cafe/7 rounded-[20px] p-6 flex flex-col gap-3 hover:border-amarillo/30 hover:shadow-sm transition-all"
            >
              <c.Icono size={26} className="text-cafe" />
              <h3 className="font-display text-[18px] text-cafe">{c.titulo}</h3>
              <p className="font-body text-[13px] text-cafe-atenuado leading-relaxed">{c.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SeccionCTAFinal({ onIniciarSesion, onRestaurante }: { onIniciarSesion: () => void; onRestaurante: () => void }) {
  return (
    <section className="bg-oscuro px-6 md:px-12 py-20">
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
        <h2 className="font-display text-[34px] md:text-[44px] text-crema-luz leading-tight">
          ¿Listo para tu próxima<br />reservación?
        </h2>
        <p className="font-body text-[14px] text-crema-luz/55 max-w-sm">
          Únete a miles de personas que ya reservan su mesa en segundos.
        </p>
        <button
          onClick={onIniciarSesion}
          className="flex items-center gap-2.5 bg-amarillo text-cafe-texto rounded-full px-8 py-4 font-body font-bold text-[15px] hover:bg-amarillo-oscuro transition-colors"
        >
          <IcoGoogle />
          Comenzar con Google
        </button>
        <button
          onClick={onRestaurante}
          className="font-body text-[13px] text-crema-luz/35 hover:text-crema-luz/65 transition-colors"
        >
          ¿Tienes un restaurante? Regístralo aquí →
        </button>
      </div>
    </section>
  )
}

export function Landing() {
  const navegar = useNavigate()

  function irAExplorar() { navegar('/explorar') }
  function irALoginRestaurante() { navegar('/login-restaurante') }

  return (
    <div className="min-h-screen bg-crema overflow-x-hidden">
      <NavegacionLanding onIniciarSesion={irAExplorar} onRestaurante={irALoginRestaurante} />

      <section className="min-h-screen pt-16 flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col justify-center px-6 md:px-16 py-16 md:py-0">
          <div className="max-w-lg">
            <h1 className="font-display text-[44px] md:text-[58px] text-cafe leading-[1.05] mb-5">
              Tu próxima cena,<br />
              <span className="text-amarillo-oscuro">a un toque</span>{' '}
              de distancia.
            </h1>

            <p className="font-body text-[15px] text-cafe-atenuado leading-relaxed mb-8 max-w-sm">
              Encuentra mesas disponibles ahora mismo en los mejores restaurantes de tu ciudad.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={irAExplorar}
                className="flex items-center justify-center gap-2.5 bg-oscuro text-crema-luz rounded-full px-6 py-4 font-body font-semibold text-[14px] hover:bg-cafe transition-all"
              >
                <IcoGoogle />
                Iniciar sesión con Google
              </button>
              <button
                onClick={irALoginRestaurante}
                className="flex items-center justify-center gap-2 border border-cafe/20 text-cafe rounded-full px-6 py-4 font-body text-[14px] hover:bg-cafe/5 transition-colors"
              >
                ¿Eres un restaurante? →
              </button>
            </div>

            <div className="flex items-center gap-6 mt-10">
              {[
                { valor: '500+', etiqueta: 'restaurantes' },
                { valor: '10k+', etiqueta: 'reservas realizadas' },
                { valor: '4.9 ★', etiqueta: 'valoración media' },
              ].map((stat, i) => (
                <div key={stat.etiqueta} className="flex items-center gap-6">
                  {i > 0 && <div className="w-px h-8 bg-cafe/10" />}
                  <div className="flex flex-col">
                    <span className="font-display text-[24px] text-cafe leading-tight">{stat.valor}</span>
                    <span className="font-body text-[11px] text-cafe-atenuado">{stat.etiqueta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <PanelOscuro onExplorar={irAExplorar} />

        <div className="md:hidden px-6 py-8 bg-oscuro flex flex-col gap-3">
          <p className="font-body font-medium text-[10px] text-crema-luz/35 uppercase tracking-widest">
            Disponibles ahora
          </p>
          {RESTAURANTES_EN_VIVO.map((r) => (
            <TarjetaRestauranteLive key={r.nombre} r={r} />
          ))}
        </div>
      </section>

      <SeccionCaracteristicas />
      <SeccionCTAFinal onIniciarSesion={irAExplorar} onRestaurante={irALoginRestaurante} />
    </div>
  )
}
