import { useEffect, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { BarraNavegacion } from '@/components/navegacion/BarraNavegacion'
import { ChipFiltro } from '@/components/comunes/ChipFiltro'
import { InsigniaOcupacion } from '@/components/comunes/InsigniaOcupacion'
import { CarruselCategoria } from '@/components/restaurante/CarruselCategoria'
import { obtenerTodosLosRestaurantes } from '@/lib/api'
import type { CategoriaRestaurante, Restaurante } from '@/types'

const FILTROS = [
  'Disponible ahora',
  'Todo',
  'Mexicana',
  'Mariscos',
  'Vegetal',
  'Vinos',
]

const ORDEN_CATEGORIAS: CategoriaRestaurante[] = [
  'Mexicana',
  'Mariscos & Carnes',
  'Internacional',
  'Vegetal & Café',
]

function agruparPorCategoria(restaurantes: Restaurante[]) {
  return ORDEN_CATEGORIAS
    .map((categoria) => ({
      titulo: categoria,
      restaurantes: restaurantes.filter((r) => r.categoria === categoria),
    }))
    .filter((grupo) => grupo.restaurantes.length > 0)
}

function CabeceraDesktop() {
  return (
    <header className="hidden md:flex sticky top-0 z-50 bg-crema/95 backdrop-blur-sm border-b border-cafe/7 items-center gap-8 px-8 h-16">
      <span className="font-display text-[22px] text-cafe shrink-0">
        Mesa
      </span>
      <div className="flex-1 max-w-sm">
        <div className="flex items-center gap-2.5 bg-white border border-cafe/12 rounded-full px-3.5 h-10">
          <span className="text-[14px]">🔍</span>

          <span className="font-body text-[13px] text-cafe-claro">
            Buscar restaurante...
          </span>
        </div>
      </div>
      <nav className="flex items-center gap-6 ml-auto">
        <Link
          to="/explorar"
          className="font-body font-medium text-[13px] text-cafe"
        >
          Explorar
        </Link>
        <Link
          to="/mis-reservas"
          className="font-body text-[13px] text-cafe-atenuado"
        >
          Mis reservas
        </Link>
      </nav>
    </header>
  )
}

export function Inicio() {

  const [filtroActivo, setFiltroActivo] =
    useState('Disponible ahora')
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([])

  const [nombreUsuario, setNombreUsuario] =
    useState('Invitado')
  const navegar = useNavigate()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
        const primerNombre =
        user.displayName.split(' ')[0]
      const nombreFormateado =
      primerNombre.charAt(0).toUpperCase() +
      primerNombre.slice(1).toLowerCase()
    setNombreUsuario(nombreFormateado)
      }
    })

    return () => unsubscribe()

  }, [])

  return (
    <div className="min-h-screen bg-crema pb-20.5 md:pb-12">
      <CabeceraDesktop />
      <div className="max-w-7xl mx-auto px-4.5 md:px-8">
        <div className="pt-14.5 pb-3.5 md:pt-8 md:pb-5 flex flex-col gap-1.5">
          <span className="font-body font-medium text-[11px] text-cafe-atenuado">
            📍 DURANGO · DURANGO
          </span>

          <h1 className="font-display text-[30px] md:text-[40px] text-cafe">
            Hola, {nombreUsuario}
          </h1>

          <p className="font-body text-[14px] text-cafe-atenuado">
            ¿Dónde cenamos esta noche?
          </p>

        </div>
        <div className="mb-3 md:hidden">
          <div className="flex items-center gap-2.5 bg-white border border-cafe/12 rounded-full px-3.5 h-12">
            <span className="text-[16px]">🔍</span>
            <span className="font-body text-[14px] text-cafe-claro">
              Buscar restaurante...
            </span>
          </div>
        </div>
        <div className="mb-6">

          <div className="flex gap-2 overflow-x-auto pb-0.5 [&::-webkit-scrollbar]:hidden [-webkit-overflow-scrolling:touch] md:flex-wrap md:overflow-visible md:pb-0">

            {FILTROS.map((filtro) => (
              <ChipFiltro
                key={filtro}
                etiqueta={filtro}
                activo={filtroActivo === filtro}
                onClick={() => setFiltroActivo(filtro)}
              />
            ))}

          </div>
        </div>
        <div className="mb-6">
          <button
            onClick={() =>
              navegar('/restaurante/casa-paloma')
            }
            className="w-full h-70 md:h-96 bg-arena rounded-[28px] overflow-hidden relative text-left"
          >
            <div className="absolute inset-0 bg-linear-to-b from-marron via-marron/40 to-oscuro/95" />
            <div className="absolute inset-0 bg-linear-to-t from-oscuro/30 via-transparent to-oscuro/95" />
            <div className="absolute top-3.5 left-3.5">
              <div className="bg-amarillo px-2.5 py-1.25 rounded-full">
                <span className="font-body font-semibold text-[11px] text-cafe-texto">
                  ✦ Recomendado
                </span>
              </div>
            </div>

            <div className="absolute top-3.5 right-3.5">
              <InsigniaOcupacion
                porcentaje={70}
                etiqueta="70% · Ocupado"
              />
            </div>

            <div className="absolute bottom-4.5 left-4.5 flex flex-col gap-1.5">

              <span className="font-body font-medium text-[10px] text-crema-luz/72">
                MEXICANA CONTEMPORÁNEA
              </span>

              <h2 className="font-display text-[28px] md:text-[40px] text-crema-luz">
                Casa Paloma
              </h2>

              <span className="font-body text-[12px] md:text-[15px] text-crema-luz/78">
                ⭐ 4.8 · 📍 Roma Norte · $$$
              </span>

            </div>

          </button>

        </div>

        <div>

          <h2 className="font-display text-[18px] md:text-[24px] text-cafe mb-3">
            Cerca de ti
          </h2>

          <div className="flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-4">

            {RESTAURANTES_CERCANOS.map((restaurante) => (
              <TarjetaRestaurante
                key={restaurante.id}
                {...restaurante}
                onClick={() =>
                  navegar(`/restaurante/${restaurante.id}`)
                }
              />
            ))}

          </div>

        </div>

      </div>

      <BarraNavegacion tabActiva="buscar" />

    </div>
  )
}