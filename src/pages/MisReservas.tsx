import { useState } from 'react'
import { BarraNavegacion } from '@/components/navegacion/BarraNavegacion'
import type { Reservacion } from '@/types'

interface ReservacionExtendida extends Reservacion {
  imagen: string
  ubicacion: string
  codigo: string
}

const RESERVACIONES: ReservacionExtendida[] = [
  {
    id: '1',
    restaurante: 'Casa Paloma',
    tipo: 'Mexicana contemporánea',
    fecha: 'Sáb 9 May',
    hora: '20:30',
    personas: 4,
    mesa: '7',
    estado: 'confirmada',
    imagen:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    ubicacion: 'Durango, México',
    codigo: 'CP-7K2N',
  },

  {
    id: '2',
    restaurante: 'Noma Blanca',
    tipo: 'Mariscos · Pacífico',
    fecha: 'Jue 14 May',
    hora: '21:00',
    personas: 2,
    mesa: '',
    estado: 'pendiente',
    imagen:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop',
    ubicacion: 'Mazatlán, México',
    codigo: 'NB-4F8L',
  },
]

const estiloEstado = {
  confirmada: {
    fondo: 'bg-disponible/22',
    texto: 'text-disponible',
  },

  pendiente: {
    fondo: 'bg-amarillo-oscuro/22',
    texto: 'text-amarillo-oscuro',
  },

  sentada: {
    fondo: 'bg-disponible/20',
    texto: 'text-disponible',
  },
}

function TarjetaReservacion({
  reservacion,
  onCancelar,
}: {
  reservacion: ReservacionExtendida
  onCancelar: (id: string) => void
}) {

  const [detalleAbierto, setDetalleAbierto] =
    useState(false)

  const { fondo, texto } =
    estiloEstado[reservacion.estado]

  return (
    <div className="bg-white border border-cafe/7 rounded-[20px] overflow-hidden">

      <div className="flex gap-3 items-start p-3.5">

        {/* IMAGEN */}
        <img
          src={reservacion.imagen}
          alt={reservacion.restaurante}
          className="w-14 h-14 rounded-[14px] object-cover shrink-0"
        />

        <div className="flex-1 flex flex-col gap-1 min-w-0">

          <div className="flex items-start justify-between gap-3">

            <span className="font-display text-[17px] text-cafe">
              {reservacion.restaurante}
            </span>

            <div
              className={`px-2 py-[3px] rounded-full ${fondo}`}
            >
              <span
                className={`font-body font-semibold text-[10px] ${texto}`}
              >
                {reservacion.estado}
              </span>
            </div>
          </div>

          <p className="font-body text-[12px] text-cafe-atenuado">
            {reservacion.tipo}
          </p>

          <p className="font-body text-[12px] text-cafe-atenuado">
            {`📅 ${reservacion.fecha}  🕐 ${reservacion.hora}  👥 ${reservacion.personas}${
              reservacion.mesa
                ? `  🪑 Mesa ${reservacion.mesa}`
                : ''
            }`}
          </p>

          <div className="flex gap-2 mt-1">

            <button
              onClick={() =>
                setDetalleAbierto(
                  !detalleAbierto
                )
              }
              className="bg-amarillo/22 px-3.5 py-2 rounded-full"
            >
              <span className="font-body font-semibold text-[12px] text-amarillo-oscuro">
                {detalleAbierto
                  ? 'Ocultar'
                  : 'Ver detalle'}
              </span>
            </button>

            <button
              onClick={() =>
                onCancelar(
                  reservacion.id
                )
              }
              className="border border-lleno/30 px-3.5 py-2 rounded-full hover:bg-lleno/5 transition-colors"
            >
              <span className="font-body font-semibold text-[12px] text-lleno">
                Cancelar
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* DETALLE EXPANDIDO */}
      {detalleAbierto && (
        <div className="border-t border-cafe/7 px-4 py-4 bg-[#fcfaf6]">

          <div className="flex flex-col gap-3">

            <div className="rounded-[16px] overflow-hidden h-42 bg-arena">

              <img
                src={reservacion.imagen}
                alt={reservacion.restaurante}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-1">

              <h3 className="font-display text-[22px] text-cafe">
                {reservacion.restaurante}
              </h3>

              <p className="font-body text-[13px] text-cafe-atenuado">
                📍 {reservacion.ubicacion}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">

              <div className="bg-white border border-cafe/7 rounded-[14px] p-3">

                <span className="font-body text-[10px] uppercase tracking-widest text-cafe-atenuado">
                  Fecha
                </span>

                <p className="font-body font-semibold text-[14px] text-cafe mt-1">
                  {reservacion.fecha}
                </p>
              </div>

              <div className="bg-white border border-cafe/7 rounded-[14px] p-3">

                <span className="font-body text-[10px] uppercase tracking-widest text-cafe-atenuado">
                  Hora
                </span>

                <p className="font-body font-semibold text-[14px] text-cafe mt-1">
                  {reservacion.hora}
                </p>
              </div>

              <div className="bg-white border border-cafe/7 rounded-[14px] p-3">

                <span className="font-body text-[10px] uppercase tracking-widest text-cafe-atenuado">
                  Personas
                </span>

                <p className="font-body font-semibold text-[14px] text-cafe mt-1">
                  {reservacion.personas}
                </p>
              </div>

              <div className="bg-white border border-cafe/7 rounded-[14px] p-3">

                <span className="font-body text-[10px] uppercase tracking-widest text-cafe-atenuado">
                  Código
                </span>

                <p className="font-body font-semibold text-[14px] text-cafe mt-1">
                  {reservacion.codigo}
                </p>
              </div>
            </div>

            {reservacion.mesa && (
              <div className="bg-amarillo/15 border border-amarillo/20 rounded-[14px] p-3">

                <span className="font-body text-[10px] uppercase tracking-widest text-cafe-atenuado">
                  Mesa asignada
                </span>

                <p className="font-display text-[24px] text-cafe mt-1">
                  Mesa {reservacion.mesa}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export function MisReservas() {

  const [tabActiva, setTabActiva] =
    useState<
      'proximas' | 'anteriores'
    >('proximas')

  const [reservaciones, setReservaciones] =
    useState(RESERVACIONES)

  const [reservaCancelar, setReservaCancelar] =
    useState<string | null>(null)

  function cancelarReservacion() {

    if (!reservaCancelar) return

    setReservaciones((prev) =>
      prev.filter(
        (r) => r.id !== reservaCancelar
      )
    )

    setReservaCancelar(null)
  }

  return (
    <div className="min-h-screen bg-crema pb-[82px]">

      <div className="px-4.5 pt-14 pb-2">

        <h1 className="font-display text-[32px] text-cafe">
          Mis reservas
        </h1>
      </div>

      <div className="px-4.5 flex gap-0 border-b border-cafe/7">

        <button
          onClick={() =>
            setTabActiva(
              'proximas'
            )
          }
          className="flex flex-col gap-1.5 items-start pr-4.5 pt-2 pb-2.5"
        >
          <span
            className={`font-body font-semibold text-[14px] ${
              tabActiva ===
              'proximas'
                ? 'text-cafe'
                : 'text-cafe-atenuado'
            }`}
          >
            Próximas
          </span>

          {tabActiva ===
            'proximas' && (
            <div className="h-0.5 w-[103px] bg-amarillo rounded-full" />
          )}
        </button>

        <button
          onClick={() =>
            setTabActiva(
              'anteriores'
            )
          }
          className="flex flex-col gap-1.5 items-start pr-4.5 pt-2 pb-2.5"
        >
          <span
            className={`font-body font-semibold text-[14px] ${
              tabActiva ===
              'anteriores'
                ? 'text-cafe'
                : 'text-cafe-atenuado'
            }`}
          >
            Anteriores
          </span>

          {tabActiva ===
            'anteriores' && (
            <div className="h-0.5 w-[103px] bg-amarillo rounded-full" />
          )}
        </button>
      </div>

      <div className="px-4.5 pt-3.5 flex flex-col gap-3">

        {tabActiva ===
        'proximas' ? (

          reservaciones.length >
          0 ? (

            reservaciones.map(
              (r) => (
                <TarjetaReservacion
                  key={r.id}
                  reservacion={r}
                  onCancelar={
                    setReservaCancelar
                  }
                />
              )
            )
          ) : (
            <p className="font-body text-[14px] text-cafe-atenuado text-center mt-10">
              No tienes reservas activas
            </p>
          )
        ) : (
          <p className="font-body text-[14px] text-cafe-atenuado text-center mt-10">
            No hay reservas anteriores
          </p>
        )}
      </div>

      {/* MODAL CANCELAR */}
      {reservaCancelar && (

        <div className="fixed inset-0 z-[120] bg-cafe/40 backdrop-blur-[3px] flex items-center justify-center px-4">

          <div className="w-full max-w-sm bg-crema border border-cafe/10 rounded-[28px] p-6 flex flex-col items-center text-center shadow-2xl">

            <div className="w-16 h-16 rounded-full bg-lleno/10 flex items-center justify-center mb-4">

              <span className="text-[28px]">
                🗑️
              </span>
            </div>

            <h3 className="font-display text-[28px] text-cafe mb-2">
              ¿Cancelar reserva?
            </h3>

            <p className="font-body text-[14px] text-cafe-atenuado mb-6 max-w-[260px]">
              Esta acción eliminará tu reservación activa.
            </p>

            <div className="flex gap-3 w-full">

              <button
                onClick={() =>
                  setReservaCancelar(null)
                }
                className="flex-1 h-12 rounded-full border border-cafe/10 bg-white"
              >
                <span className="font-body font-semibold text-[14px] text-cafe">
                  Conservar
                </span>
              </button>

              <button
                onClick={cancelarReservacion}
                className="flex-1 h-12 rounded-full bg-lleno"
              >
                <span className="font-body font-bold text-[14px] text-white">
                  Cancelar
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      <BarraNavegacion tabActiva="reservas" />
    </div>
  )
}