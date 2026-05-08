import { useState } from 'react'
import { BarraNavegacion } from '@/components/navegacion/BarraNavegacion'
import type { Reservacion } from '@/types'

const RESERVACIONES: Reservacion[] = [
  {
    id: '1',
    restaurante: 'Casa Paloma',
    tipo: 'Mexicana contemporánea',
    fecha: 'Sáb 9 May',
    hora: '20:30',
    personas: 4,
    mesa: '7',
    estado: 'confirmada',
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
  },
]

const estiloEstado = {
  confirmada: { fondo: 'bg-disponible/22', texto: 'text-disponible' },
  pendiente: { fondo: 'bg-amarillo-oscuro/22', texto: 'text-amarillo-oscuro' },
  sentada: { fondo: 'bg-disponible/20', texto: 'text-disponible' },
}

function TarjetaReservacion({ reservacion }: { reservacion: Reservacion }) {
  const { fondo, texto } = estiloEstado[reservacion.estado]

  return (
    <div className="bg-white border border-cafe/7 rounded-[20px] flex gap-3 items-start p-3.5">
      <div className="w-14 h-14 rounded-[14px] bg-arena shrink-0" />
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <div className="flex items-start justify-between">
          <span className="font-display text-[17px] text-cafe">{reservacion.restaurante}</span>
          <div className={`px-2 py-[3px] rounded-full ${fondo}`}>
            <span className={`font-body font-semibold text-[10px] ${texto}`}>
              {reservacion.estado}
            </span>
          </div>
        </div>
        <p className="font-body text-[12px] text-cafe-atenuado">{reservacion.tipo}</p>
        <p className="font-body text-[12px] text-cafe-atenuado">
          {`📅 ${reservacion.fecha}  🕐 ${reservacion.hora}  👥 ${reservacion.personas}${reservacion.mesa ? `  🪑 Mesa ${reservacion.mesa}` : ''}`}
        </p>
        <div className="flex gap-2 mt-1">
          <button className="bg-amarillo/22 px-3.5 py-2 rounded-full">
            <span className="font-body font-semibold text-[12px] text-amarillo-oscuro">Ver detalle</span>
          </button>
          <button className="border border-lleno/30 px-3.5 py-2 rounded-full">
            <span className="font-body font-semibold text-[12px] text-lleno">Cancelar</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export function MisReservas() {
  const [tabActiva, setTabActiva] = useState<'proximas' | 'anteriores'>('proximas')

  return (
    <div className="min-h-screen bg-crema pb-[82px]">
      <div className="px-4.5 pt-14 pb-2">
        <h1 className="font-display text-[32px] text-cafe">Mis reservas</h1>
      </div>

      <div className="px-4.5 flex gap-0 border-b border-cafe/7">
        <button
          onClick={() => setTabActiva('proximas')}
          className="flex flex-col gap-1.5 items-start pr-4.5 pt-2 pb-2.5"
        >
          <span className={`font-body font-semibold text-[14px] ${tabActiva === 'proximas' ? 'text-cafe' : 'text-cafe-atenuado'}`}>
            Próximas
          </span>
          {tabActiva === 'proximas' && (
            <div className="h-0.5 w-[103px] bg-amarillo rounded-full" />
          )}
        </button>
        <button
          onClick={() => setTabActiva('anteriores')}
          className="flex flex-col gap-1.5 items-start pr-4.5 pt-2 pb-2.5"
        >
          <span className={`font-body font-semibold text-[14px] ${tabActiva === 'anteriores' ? 'text-cafe' : 'text-cafe-atenuado'}`}>
            Anteriores
          </span>
          {tabActiva === 'anteriores' && (
            <div className="h-0.5 w-[103px] bg-amarillo rounded-full" />
          )}
        </button>
      </div>

      <div className="px-4.5 pt-3.5 flex flex-col gap-3">
        {tabActiva === 'proximas'
          ? RESERVACIONES.map((r) => <TarjetaReservacion key={r.id} reservacion={r} />)
          : (
            <p className="font-body text-[14px] text-cafe-atenuado text-center mt-10">
              No hay reservas anteriores
            </p>
          )}
      </div>

      <BarraNavegacion tabActiva="reservas" />
    </div>
  )
}
