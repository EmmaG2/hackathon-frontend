import { useState } from 'react'
import { NavLateral } from '@/components/navegacion/NavLateral'
import { FilaReserva } from '@/components/dashboard/FilaReserva'
import { ModalReservaManual } from '@/components/dashboard/ModalReservaManual'
import type { ReservaEnFila, EstadoReserva } from '@/types'

const RESERVAS_INICIAL: ReservaEnFila[] = [
  { id: '1', hora: '18:00', nombre: 'Pedro Castillo',    estado: 'sentada',    personas: 2, mesa: 'M1'  },
  { id: '2', hora: '18:30', nombre: 'Laura Mendoza',     estado: 'sentada',    personas: 4, mesa: 'M4'  },
  { id: '3', hora: '19:00', nombre: 'Mariana Esquivel',  estado: 'sentada',    personas: 2, mesa: 'M3'  },
  { id: '4', hora: '19:30', nombre: 'Daniel Ortega',     estado: 'confirmada', personas: 4, mesa: 'M7'  },
  { id: '5', hora: '20:00', nombre: 'Familia Reyes',     estado: 'confirmada', personas: 6, mesa: 'M14' },
  { id: '6', hora: '20:00', nombre: 'Carlos H.',         estado: 'pendiente',  personas: 2              },
  { id: '7', hora: '20:30', nombre: 'Ana & Lucía',       estado: 'pendiente',  personas: 2              },
  { id: '8', hora: '21:00', nombre: 'Roberto Sánchez',   estado: 'pendiente',  personas: 3              },
]

type FiltroEstado = 'todas' | EstadoReserva

const FILTROS: { key: FiltroEstado; label: string }[] = [
  { key: 'todas',      label: 'Todas'      },
  { key: 'pendiente',  label: 'Pendientes' },
  { key: 'confirmada', label: 'Confirmadas'},
  { key: 'sentada',    label: 'Sentadas'   },
]

export function Reservas() {
  const [reservas, setReservas] = useState<ReservaEnFila[]>(RESERVAS_INICIAL)
  const [filtro, setFiltro] = useState<FiltroEstado>('todas')
  const [modalAbierto, setModalAbierto] = useState(false)

  const visibles = filtro === 'todas' ? reservas : reservas.filter(r => r.estado === filtro)

  const pendientes  = reservas.filter(r => r.estado === 'pendiente').length
  const confirmadas = reservas.filter(r => r.estado === 'confirmada').length
  const sentadas    = reservas.filter(r => r.estado === 'sentada').length
  const cubiertos   = reservas.reduce((acc, r) => acc + r.personas, 0)

  function accionReserva(id: string) {
    setReservas(prev => prev.flatMap(r => {
      if (r.id !== id) return [r]
      if (r.estado === 'sentada')    return []
      if (r.estado === 'pendiente')  return [{ ...r, estado: 'confirmada' as const }]
      if (r.estado === 'confirmada') return [{ ...r, estado: 'sentada'    as const }]
      return [r]
    }))
  }

  function cancelarReserva(id: string) {
    setReservas(prev => prev.filter(r => r.id !== id))
  }

  function agregarReserva(nueva: Omit<ReservaEnFila, 'id' | 'estado'>) {
    const entrada: ReservaEnFila = { ...nueva, id: String(Date.now()), estado: 'pendiente' }
    setReservas(prev => [...prev, entrada].sort((a, b) => a.hora.localeCompare(b.hora)))
    setModalAbierto(false)
  }

  return (
    <div className="flex min-h-screen bg-crema">
      <NavLateral tabActiva="reservas" />

      <main className="flex-1 flex flex-col gap-5.5 px-7 pt-5.5 pb-8 overflow-auto">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-body font-medium text-[11px] text-cafe-atenuado">Jueves 7 de Mayo, 2026</p>
            <h1 className="font-display text-[28px] text-cafe">{reservas.length} reservas · hoy</h1>
          </div>
          <div className="flex gap-2.5">
            <button className="bg-white border border-cafe/12 rounded-full px-4 py-2.5">
              <span className="font-body font-semibold text-[13px] text-cafe">Hoy</span>
            </button>
            <button
              onClick={() => setModalAbierto(true)}
              className="bg-amarillo rounded-full px-4 py-2.5"
            >
              <span className="font-body font-semibold text-[13px] text-cafe-texto">+ Reserva manual</span>
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          {[
            { label: 'Pendientes',  valor: pendientes,  color: 'bg-amarillo-oscuro' },
            { label: 'Confirmadas', valor: confirmadas, color: 'bg-confirmado'       },
            { label: 'Sentadas',    valor: sentadas,    color: 'bg-disponible'       },
            { label: 'Cubiertos',   valor: cubiertos,   color: 'bg-cafe'             },
          ].map(({ label, valor, color }) => (
            <div key={label} className="bg-white border border-cafe/7 rounded-[14px] p-4 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full ${color}`} />
                <span className="font-body text-[11px] text-cafe-atenuado">{label}</span>
              </div>
              <span className="font-display text-[30px] text-cafe leading-none">{valor}</span>
            </div>
          ))}
        </div>

        <div className="bg-white border border-cafe/7 rounded-[20px] overflow-hidden">
          <div className="px-4.5 pt-4 pb-3 flex items-center justify-between">
            <h2 className="font-display text-[18px] text-cafe">Lista de reservas</h2>
            <div className="flex gap-1">
              {FILTROS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFiltro(key)}
                  className={`px-3 py-1.5 rounded-full font-body font-medium text-[12px] transition-colors ${
                    filtro === key
                      ? 'bg-cafe text-crema'
                      : 'bg-arena text-cafe-atenuado hover:bg-arena-oscura'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="h-px bg-cafe/7" />

          {visibles.length === 0 && (
            <p className="font-body text-[13px] text-cafe-atenuado text-center py-10">
              Sin reservas {filtro !== 'todas' ? `en estado "${filtro}"` : ''}
            </p>
          )}

          {visibles.map((reserva, i) => (
            <div key={reserva.id}>
              <FilaReserva
                hora={reserva.hora}
                nombre={reserva.nombre}
                estado={reserva.estado}
                personas={reserva.personas}
                mesa={reserva.mesa}
                onAccionPrincipal={() => accionReserva(reserva.id)}
                onCancelar={() => cancelarReserva(reserva.id)}
              />
              {i < visibles.length - 1 && <div className="h-px bg-cafe/7" />}
            </div>
          ))}
        </div>
      </main>

      {modalAbierto && (
        <ModalReservaManual
          onAgregar={agregarReserva}
          onCerrar={() => setModalAbierto(false)}
        />
      )}
    </div>
  )
}
