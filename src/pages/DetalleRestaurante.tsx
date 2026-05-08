import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChipFiltro } from '@/components/comunes/ChipFiltro'
import { ElementoMenu } from '@/components/restaurante/ElementoMenu'
import { BarraNavegacion } from '@/components/navegacion/BarraNavegacion'

const TABS_MENU = ['Entradas', 'Platos fuertes', 'Postres', 'Bebidas']
const TABS_SECCION = ['Acerca', 'Menú']

const ITEMS_MENU = [
  { id: '1', nombre: 'Mole de Xico (pato)', descripcion: 'Pato confitado, mole de Xico, plátano macho', precio: 425 },
  { id: '2', nombre: 'Pesca del día', descripcion: 'Robalo a las brasas, hoja santa, salsa de morita', precio: 390 },
  { id: '3', nombre: 'Costilla 18hs', descripcion: 'Costilla braseada, puré de elote, escabeche', precio: 410 },
]

const ETIQUETAS = ['Mezcal', 'Terraza', 'Sin gluten']

function GaleriaDesktop() {
  return (
    <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] grid-rows-2 gap-2 h-80 mb-8 rounded-2xl overflow-hidden">
      <div className="row-span-2 bg-arena" style={{ background: 'linear-gradient(135deg, #d4c9b0 0%, #c8b99a 100%)' }} />
      <div className="bg-arena/80" style={{ background: 'linear-gradient(135deg, #b8a98a 0%, #a89070 100%)' }} />
      <div className="bg-cafe/20" style={{ background: 'linear-gradient(135deg, #9c8b76 0%, #8a7a62 100%)' }} />
      <div className="bg-arena/60" style={{ background: 'linear-gradient(135deg, #c2b49a 0%, #b0a080 100%)' }} />
      <div className="relative" style={{ background: 'linear-gradient(135deg, #8a7a62 0%, #6e5e4a 100%)' }}>
        <div className="absolute inset-0 bg-oscuro/40 flex items-center justify-center gap-1.5">
          <span className="font-body font-semibold text-[13px] text-crema-luz">🖼 188</span>
        </div>
      </div>
    </div>
  )
}

function SidebarReserva({ onReservar }: { onReservar: () => void }) {
  return (
    <div className="hidden md:block sticky top-20 self-start">
      <div className="bg-white border border-cafe/12 rounded-[20px] p-5 flex flex-col gap-4">
        <div>
          <h3 className="font-display text-[22px] text-cafe">Reservar mesa</h3>
          <span className="font-body text-[12px] text-cafe-atenuado">Sin cargo</span>
        </div>

        <div className="bg-amarillo/12 border border-amarillo/20 rounded-[10px] px-3 py-2 text-center">
          <span className="font-body text-[12px] text-amarillo-oscuro">
            🔥 Ya hay <strong>8 reservas</strong> para hoy
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="font-body font-medium text-[10px] text-cafe-atenuado uppercase tracking-widest">Fecha</span>
          <div className="flex gap-1.5 flex-wrap">
            {['Hoy 7', 'Vier 8', 'Sáb 9', 'Dom 10'].map((dia, i) => (
              <button
                key={dia}
                className={`px-3 py-1.5 rounded-[10px] font-body text-[12px] border transition-all ${
                  i === 2
                    ? 'bg-amarillo border-amarillo text-cafe-texto font-semibold'
                    : 'bg-white border-cafe/12 text-cafe'
                }`}
              >
                {dia}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="font-body font-medium text-[10px] text-cafe-atenuado uppercase tracking-widest">Hora</span>
          <div className="grid grid-cols-3 gap-1.5">
            {['18:00', '18:30', '19:30', '20:30', '21:00'].map((hora) => (
              <button
                key={hora}
                className={`py-2 rounded-[10px] font-body text-[12px] border transition-all ${
                  hora === '20:30'
                    ? 'bg-amarillo border-amarillo text-cafe-texto font-semibold'
                    : 'bg-white border-cafe/12 text-cafe'
                }`}
              >
                {hora}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="font-body font-medium text-[10px] text-cafe-atenuado uppercase tracking-widest">Personas</span>
          <div className="flex items-center gap-0 bg-arena rounded-full border border-cafe/12 p-1 w-fit">
            <button className="w-8 h-8 rounded-full bg-crema flex items-center justify-center font-body font-bold text-[16px] text-cafe">−</button>
            <span className="min-w-10 text-center font-body font-bold text-[16px] text-cafe tabular-nums">4</span>
            <button className="w-8 h-8 rounded-full bg-amarillo flex items-center justify-center font-body font-bold text-[16px] text-cafe-texto">+</button>
          </div>
        </div>

        <button
          onClick={onReservar}
          className="w-full bg-amarillo rounded-full py-4 font-body font-bold text-[15px] text-cafe-texto"
        >
          Ver disponibilidad →
        </button>

        <p className="font-body text-[10px] text-cafe-atenuado text-center">
          Cancela hasta 2h antes sin cargo
        </p>
      </div>
    </div>
  )
}

function SeccionOcupacion() {
  return (
    <div className="mb-8">
      <h2 className="font-display text-[20px] text-cafe mb-1">Ocupación en vivo</h2>
      <p className="font-body text-[12px] text-cafe-atenuado mb-3">
        14/20 mesas ocupadas · próxima libre en ~25 min
      </p>
      <div className="relative h-1.5 bg-arena rounded-full">
        <div className="absolute left-0 top-0 h-full w-[70%] bg-amarillo-oscuro rounded-full" />
      </div>
    </div>
  )
}

export function DetalleRestaurante() {
  const [tabMenu, setTabMenu] = useState('Platos fuertes')
  const [tabSeccion, setTabSeccion] = useState('Acerca')
  const navegar = useNavigate()

  return (
    <div className="min-h-screen bg-crema pb-25 md:pb-16">
      <div className="md:hidden relative h-70 bg-arena">
        <div className="absolute inset-0 bg-linear-to-t from-oscuro/60 via-transparent to-oscuro/95" />
        <button
          onClick={() => navegar(-1)}
          className="absolute top-14.5 left-4.5 w-9.5 h-9.5 rounded-full bg-oscuro/55 flex items-center justify-center"
        >
          <span className="font-body font-bold text-[16px] text-crema-luz">←</span>
        </button>
        <button className="absolute top-14.5 right-4.5 w-9.5 h-9.5 rounded-full bg-oscuro/55 flex items-center justify-center">
          <span className="text-[16px] text-crema-luz">♡</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4.5 md:px-8">
        <nav className="hidden md:flex items-center gap-1.5 pt-5 pb-3 font-body text-[12px] text-cafe-atenuado">
          <span>🏠</span>
          <span className="opacity-40">›</span>
          <span>Restaurantes</span>
          <span className="opacity-40">›</span>
          <span className="text-cafe font-medium">Casa Paloma</span>
        </nav>

        <div className="pt-5 md:pt-2 pb-4 md:pb-6 flex flex-col gap-2">
          <div className="flex gap-2 flex-wrap">
            {ETIQUETAS.map((etiqueta) => (
              <div key={etiqueta} className="bg-white border border-cafe/12 rounded-full px-2.5 py-1.25">
                <span className="font-body text-[11px] text-cafe-atenuado">{etiqueta}</span>
              </div>
            ))}
          </div>

          <div className="flex items-start justify-between">
            <div>
              <span className="font-body font-medium text-[10px] text-cafe-atenuado">MEXICANA CONTEMPORÁNEA</span>
              <h1 className="font-display text-[32px] md:text-[40px] text-cafe leading-tight">Casa Paloma</h1>
            </div>
            <button className="hidden md:flex w-9.5 h-9.5 border border-cafe/12 rounded-full items-center justify-center text-cafe-atenuado hover:border-cafe/30 transition-colors mt-3 shrink-0">
              ♡
            </button>
          </div>

          <p className="font-body text-[12px] text-cafe-atenuado">⭐ 4.8 (412) · $$$ · Roma Norte</p>

          <div className="hidden md:flex gap-5 font-body text-[12px] text-cafe-atenuado">
            <span>🕐 Mar–Dom · 13:00–23:30</span>
            <span>📍 Colima 142, Roma Nte.</span>
          </div>
        </div>

        <GaleriaDesktop />

        <div className="md:hidden mb-4 bg-white border border-cafe/7 rounded-[14px] px-3.5 py-2 flex flex-col gap-1">
          <p className="font-body text-[12px] text-cafe-atenuado">🕐 Horario: Mar–Dom · 13:00–23:30</p>
          <p className="font-body text-[12px] text-cafe-atenuado">📍 Dirección: Colima 142, Roma Nte.</p>
        </div>

        <div className="flex gap-6 border-b border-cafe/10 mb-6">
          {TABS_SECCION.map((tab) => (
            <button
              key={tab}
              onClick={() => setTabSeccion(tab)}
              className={`pb-3 font-body font-medium text-[14px] border-b-2 -mb-px transition-colors ${
                tabSeccion === tab
                  ? 'border-cafe text-cafe'
                  : 'border-transparent text-cafe-atenuado'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="md:grid md:grid-cols-[1fr_360px] md:gap-10 md:items-start">
          <div>
            {tabSeccion === 'Acerca' && <SeccionOcupacion />}

            <div>
              <h2 className="font-display text-[20px] text-cafe mb-3">Menú</h2>
              <div className="flex gap-1.5 mb-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                {TABS_MENU.map((tab) => (
                  <ChipFiltro key={tab} etiqueta={tab} activo={tabMenu === tab} onClick={() => setTabMenu(tab)} />
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {ITEMS_MENU.map((item) => (
                  <ElementoMenu key={item.id} {...item} />
                ))}
              </div>
            </div>
          </div>

          <SidebarReserva onReservar={() => navegar('/restaurante/casa-paloma/reservar')} />
        </div>
      </div>

      <div className="md:hidden fixed bottom-20.5 left-1/2 -translate-x-1/2 w-full max-w-97.5 px-3">
        <div className="bg-oscuro-cta/85 rounded-full flex items-center gap-2 p-1.5">
          <div className="pl-3.5 pr-2 flex flex-col gap-0.5">
            <span className="font-body text-[10px] text-cafe-atenuado">Hoy desde</span>
            <span className="font-body font-semibold text-[13px] text-crema-luz">20:30 · 4 pers.</span>
          </div>
          <button
            onClick={() => navegar('/restaurante/casa-paloma/reservar')}
            className="flex-1 bg-amarillo rounded-full px-5 py-3.5 text-center"
          >
            <span className="font-body font-bold text-[14px] text-cafe-texto">Reservar mesa →</span>
          </button>
        </div>
      </div>

      <BarraNavegacion tabActiva="buscar" />
    </div>
  )
}
