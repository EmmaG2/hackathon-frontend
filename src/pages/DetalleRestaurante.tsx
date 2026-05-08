import { useState } from 'react'
import {
  useNavigate,
  useParams,
} from 'react-router-dom'

import { ChipFiltro } from '@/components/comunes/ChipFiltro'
import { ElementoMenu } from '@/components/restaurante/ElementoMenu'
import { BarraNavegacion } from '@/components/navegacion/BarraNavegacion'
import { useRestaurante } from '@/hooks/useRestaurante'

const TABS_MENU = [
  'Entradas',
  'Platos fuertes',
  'Postres',
  'Bebidas',
]

const TABS_SECCION = [
  'Acerca',
  'Menú',
]

const HORAS = [
  '18:00',
  '18:30',
  '19:30',
  '20:30',
  '21:00',
]

const DIAS_CORTOS = [
  'Dom',
  'Lun',
  'Mar',
  'Mié',
  'Jue',
  'Vie',
  'Sáb',
]

const MIN_PERSONAS = 1
const MAX_PERSONAS = 10
function generarFechasProximas(
  cantidad = 4
) {
  const hoy = new Date()

  return Array.from(
    { length: cantidad },
    (_, i) => {
      const fecha = new Date(hoy)
      fecha.setDate(
        hoy.getDate() + i
      )
      const etiqueta =
        i === 0
          ? `Hoy ${fecha.getDate()}`
          : `${
              DIAS_CORTOS[
                fecha.getDay()
              ]
            } ${fecha.getDate()}`

      return {
        id:
          fecha
            .toISOString()
            .split('T')[0],

        etiqueta,
      }
    }
  )
}

const FECHAS =
  generarFechasProximas()

const GALERIA_FALLBACKS = [
  'linear-gradient(135deg, #b8a98a 0%, #a89070 100%)',
  'linear-gradient(135deg, #9c8b76 0%, #8a7a62 100%)',
  'linear-gradient(135deg, #c2b49a 0%, #b0a080 100%)',
  'linear-gradient(135deg, #8a7a62 0%, #6e5e4a 100%)',
]

function GaleriaDesktop({
  img,
  nombre,
  galeria,
}: {
  img: string
  nombre: string
  galeria?: string[]
}) {
  return (
    <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] grid-rows-2 gap-2 h-80 mb-8 rounded-2xl overflow-hidden">

      <div className="row-span-2 bg-arena relative">
        <img
          src={img}
          alt={nombre}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {GALERIA_FALLBACKS.map(
        (fallback, i) => (
          <div
            key={i}
            className="relative"
            style={{
              background:
                galeria?.[i]
                  ? undefined
                  : fallback,
            }}
          >
            {galeria?.[i] && (
              <img
                src={galeria[i]}
                alt={`${nombre} ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>
        )
      )}
    </div>
  )
}

interface PropsSidebar {
  reservasHoy: number
  fechaSeleccionada: string
  horaSeleccionada: string
  personas: number
  onSeleccionarFecha: (
    id: string
  ) => void
  onSeleccionarHora: (
    hora: string
  ) => void
  onCambiarPersonas: (
    delta: number
  ) => void
  onReservar: () => void
}

function SidebarReserva({
  reservasHoy,
  fechaSeleccionada,
  horaSeleccionada,
  personas,
  onSeleccionarFecha,
  onSeleccionarHora,
  onCambiarPersonas,
  onReservar,
}: PropsSidebar) {
  return (
    <div className="hidden md:block sticky top-20 self-start">

      <div className="bg-white border border-cafe/12 rounded-[20px] p-5 flex flex-col gap-4">

        <div>
          <h3 className="font-display text-[22px] text-cafe">
            Reservar mesa
          </h3>

          <span className="font-body text-[12px] text-cafe-atenuado">
            Sin cargo
          </span>
        </div>

        <div className="bg-amarillo/12 border border-amarillo/20 rounded-[10px] px-3 py-2 text-center">

          <span className="font-body text-[12px] text-amarillo-oscuro">
             Ya hay{' '}
            <strong>
              {reservasHoy} reservas
            </strong>{' '}
            para hoy
          </span>
        </div>

        {/* FECHAS */}
        <div className="flex flex-col gap-1.5">

          <span className="font-body font-medium text-[10px] text-cafe-atenuado uppercase tracking-widest">
            Fecha
          </span>

          <div className="flex gap-1.5 flex-wrap">

            {FECHAS.map(
              (fecha) => (
                <button
                  key={fecha.id}
                  onClick={() =>
                    onSeleccionarFecha(
                      fecha.id
                    )
                  }
                  className={`px-3 py-1.5 rounded-[10px] font-body text-[12px] border transition-all ${
                    fechaSeleccionada ===
                    fecha.id
                      ? 'bg-amarillo border-amarillo text-cafe-texto font-semibold'
                      : 'bg-white border-cafe/12 text-cafe'
                  }`}
                >
                  {fecha.etiqueta}
                </button>
              )
            )}
          </div>
        </div>

        {/* HORAS */}
        <div className="flex flex-col gap-1.5">

          <span className="font-body font-medium text-[10px] text-cafe-atenuado uppercase tracking-widest">
            Hora
          </span>

          <div className="grid grid-cols-3 gap-1.5">

            {HORAS.map(
              (hora) => (
                <button
                  key={hora}
                  onClick={() =>
                    onSeleccionarHora(
                      hora
                    )
                  }
                  className={`py-2 rounded-[10px] font-body text-[12px] border transition-all ${
                    horaSeleccionada ===
                    hora
                      ? 'bg-amarillo border-amarillo text-cafe-texto font-semibold'
                      : 'bg-white border-cafe/12 text-cafe'
                  }`}
                >
                  {hora}
                </button>
              )
            )}
          </div>
        </div>

        {/* PERSONAS */}
        <div className="flex flex-col gap-1.5">

          <span className="font-body font-medium text-[10px] text-cafe-atenuado uppercase tracking-widest">
            Personas
          </span>

          <div className="flex items-center gap-0 bg-arena rounded-full border border-cafe/12 p-1 w-fit">

            <button
              onClick={() =>
                onCambiarPersonas(
                  -1
                )
              }
              disabled={
                personas <=
                MIN_PERSONAS
              }
              className="w-8 h-8 rounded-full bg-crema flex items-center justify-center font-body font-bold text-[16px] text-cafe disabled:opacity-30"
            >
              −
            </button>

            <span className="min-w-10 text-center font-body font-bold text-[16px] text-cafe tabular-nums">
              {personas}
            </span>

            <button
              onClick={() =>
                onCambiarPersonas(
                  1
                )
              }
              disabled={
                personas >=
                MAX_PERSONAS
              }
              className="w-8 h-8 rounded-full bg-amarillo flex items-center justify-center font-body font-bold text-[16px] text-cafe-texto disabled:opacity-30"
            >
              +
            </button>
          </div>
        </div>

        {/* BOTON */}
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

function SeccionOcupacion({
  porcentaje,
}: {
  porcentaje: number
}) {

  const mesasOcupadas =
    Math.round(
      (porcentaje / 100) * 20
    )

  return (
    <div className="mb-8">

      <h2 className="font-display text-[20px] text-cafe mb-1">
        Ocupación en vivo
      </h2>

      <p className="font-body text-[12px] text-cafe-atenuado mb-3">
        {mesasOcupadas}/20 mesas ocupadas · próxima libre en ~25 min
      </p>

      <div className="relative h-1.5 bg-arena rounded-full">

        <div
          className="absolute left-0 top-0 h-full rounded-full bg-amarillo-oscuro"
          style={{
            width: `${porcentaje}%`,
          }}
        />
      </div>
    </div>
  )
}

export function DetalleRestaurante() {

  const { id } =
    useParams<{
      id: string
    }>()

  const {
    restaurante,
    cargando,
  } = useRestaurante(id)

  const [
    tabMenu,
    setTabMenu,
  ] = useState(
    'Platos fuertes'
  )

  const [
    tabSeccion,
    setTabSeccion,
  ] = useState('Acerca')

  const [
    fechaSeleccionada,
    setFechaSeleccionada,
  ] = useState(
    FECHAS[0].id
  )

  const [
    horaSeleccionada,
    setHoraSeleccionada,
  ] = useState('20:30')

  const [
    personas,
    setPersonas,
  ] = useState(4)

  const navegar =
    useNavigate()

  function cambiarPersonas(
    delta: number
  ) {
    setPersonas((prev) =>
      Math.min(
        MAX_PERSONAS,
        Math.max(
          MIN_PERSONAS,
          prev + delta
        )
      )
    )
  }

  // ESTA ES LA PARTE IMPORTANTE
  function irAReservar() {

    const fechaObj =
      new Date(
        fechaSeleccionada
      )

    navegar(
      `/restaurante/${id}/reservar`,
      {
        state: {

          // SOLO EL DIA
          dia: String(
            fechaObj.getDate()
          ).padStart(2, '0'),

          hora:
            horaSeleccionada,

          personas,
        },
      }
    )
  }

  if (cargando) {
    return (
      <div className="min-h-screen bg-crema flex items-center justify-center">
        <span className="font-body text-[14px] text-cafe-atenuado">
          Cargando...
        </span>
      </div>
    )
  }

  if (!restaurante) {
    return (
      <div className="min-h-screen bg-crema flex flex-col items-center justify-center gap-3">

        <span className="font-display text-[24px] text-cafe">
          Restaurante no encontrado
        </span>

        <button
          onClick={() =>
            navegar(-1)
          }
          className="font-body text-[13px] text-cafe-atenuado underline"
        >
          Regresar
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-crema pb-25 md:pb-16">

      {/* MOBILE HERO */}
      <div className="md:hidden relative h-70 bg-arena">

        <img
          src={restaurante.img}
          alt={
            restaurante.nombre
          }
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-oscuro/60 via-transparent to-oscuro/95" />

        <button
          onClick={() =>
            navegar(-1)
          }
          className="absolute top-14.5 left-4.5 w-9.5 h-9.5 rounded-full bg-oscuro/55 flex items-center justify-center"
        >
          <span className="font-body font-bold text-[16px] text-crema-luz">
            ←
          </span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4.5 md:px-8">

        {/* HEADER */} <div className="pt-5 md:pt-2 pb-4 md:pb-6 flex flex-col gap-2">

          <div className="flex gap-2 flex-wrap">

            {restaurante.etiquetas.map(
              (etiqueta) => (
                <div
                  key={etiqueta}
                  className="bg-white border border-cafe/12 rounded-full px-2.5 py-1.25"
                >
                  <span className="font-body text-[11px] text-cafe-atenuado">
                    {etiqueta}
                  </span>
                </div>
              )
            )}
          </div>

          <div className="flex items-start justify-between">

            <div>

              <span className="font-body font-medium text-[10px] text-cafe-atenuado">
                {
                  restaurante.tipo
                }
              </span>

              <h1 className="font-display text-[32px] md:text-[40px] text-cafe leading-tight">
                {
                  restaurante.nombre
                }
              </h1>
            </div>
          </div>
          <p className="font-body text-[12px] text-cafe-atenuado">
            ⭐{' '}
            {
              restaurante.calificacion
            }{' '}
            (
            {
              restaurante.totalReseñas
            }
            ) ·{' '}
            {
              restaurante.precio
            }{' '}
            ·{' '}
            {
              restaurante.ubicacion
            }
          </p>
        </div>

        <GaleriaDesktop
          img={
            restaurante.img ??
            ''
          }
          nombre={
            restaurante.nombre
          }
          galeria={
            restaurante.galeria
          }
        />

        <div className="flex gap-6 border-b border-cafe/10 mb-6">

          {TABS_SECCION.map(
            (tab) => (
              <button
                key={tab}
                onClick={() =>
                  setTabSeccion(
                    tab
                  )
                }
                className={`pb-3 font-body font-medium text-[14px] border-b-2 -mb-px transition-colors ${
                  tabSeccion === tab
                    ? 'border-cafe text-cafe'
                    : 'border-transparent text-cafe-atenuado'
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        <div className="md:grid md:grid-cols-[1fr_360px] md:gap-10 md:items-start">

          <div>

            {tabSeccion ===
              'Acerca' && (
              <SeccionOcupacion
                porcentaje={
                  restaurante.porcentajeOcupacion
                }
              />
            )}

            <div>

              <h2 className="font-display text-[20px] text-cafe mb-3">
                Menú
              </h2>

              <div className="flex gap-1.5 mb-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">

                {TABS_MENU.map(
                  (tab) => (
                    <ChipFiltro
                      key={tab}
                      etiqueta={
                        tab
                      }
                      activo={
                        tabMenu ===
                        tab
                      }
                      onClick={() =>
                        setTabMenu(
                          tab
                        )
                      }
                    />
                  )
                )}
              </div>

              <div className="flex flex-col gap-2">

                {restaurante.itemsMenu.map(
                  (item) => (
                    <ElementoMenu
                      key={item.id}
                      {...item}
                    />
                  )
                )}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <SidebarReserva
            reservasHoy={
              restaurante.reservasHoy
            }
            fechaSeleccionada={
              fechaSeleccionada
            }
            horaSeleccionada={
              horaSeleccionada
            }
            personas={personas}
            onSeleccionarFecha={
              setFechaSeleccionada
            }
            onSeleccionarHora={
              setHoraSeleccionada
            }
            onCambiarPersonas={
              cambiarPersonas
            }
            onReservar={
              irAReservar
            }
          />
        </div>
      </div>

      {/* MOBILE CTA */}
      <div className="md:hidden fixed bottom-20.5 left-1/2 -translate-x-1/2 w-full max-w-97.5 px-3">

        <div className="bg-oscuro-cta/85 rounded-full flex items-center gap-2 p-1.5">

          <div className="pl-3.5 pr-2 flex flex-col gap-0.5">

            <span className="font-body text-[10px] text-cafe-atenuado">
              Hoy desde
            </span>

            <span className="font-body font-semibold text-[13px] text-crema-luz">
              {
                horaSeleccionada
              }{' '}
              · {personas} pers.
            </span>
          </div>

          <button
            onClick={irAReservar}
            className="flex-1 bg-amarillo rounded-full px-5 py-3.5 text-center"
          >
            <span className="font-body font-bold text-[14px] text-cafe-texto">
              Reservar mesa →
            </span>
          </button>
        </div>
      </div>

      <BarraNavegacion tabActiva="buscar" />
    </div>
  )
}