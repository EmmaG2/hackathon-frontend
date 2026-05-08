import { useState } from 'react'
import type { Mesa, ReservaEnFila } from '@/types'

const MESAS_INICIAL: Mesa[] = [
  { id: 1,  estado: 'ocupada'   }, { id: 2,  estado: 'ocupada'   }, { id: 3,  estado: 'libre'    },
  { id: 4,  estado: 'ocupada'   }, { id: 5,  estado: 'reservada' }, { id: 6,  estado: 'ocupada'  },
  { id: 7,  estado: 'ocupada'   }, { id: 8,  estado: 'libre'     },
  { id: 9,  estado: 'ocupada'   }, { id: 10, estado: 'libre'     },
  { id: 11, estado: 'ocupada'   }, { id: 12, estado: 'ocupada'   },
  { id: 13, estado: 'libre'     }, { id: 14, estado: 'reservada' },
]

const FILA_INICIAL: ReservaEnFila[] = [
  { id: '1', hora: '19:00', nombre: 'Mariana Esquivel', estado: 'sentada',   personas: 2, mesa: 'M3'  },
  { id: '2', hora: '19:30', nombre: 'Daniel Ortega',    estado: 'confirmada', personas: 4, mesa: 'M7'  },
  { id: '3', hora: '20:00', nombre: 'Familia Reyes',    estado: 'confirmada', personas: 6, mesa: 'M14' },
  { id: '4', hora: '20:00', nombre: 'Carlos H.',        estado: 'pendiente',  personas: 2              },
  { id: '5', hora: '20:30', nombre: 'Ana & Lucía',      estado: 'pendiente',  personas: 2              },
]

export function useDashboard() {
  const [mesas, setMesas] = useState<Mesa[]>(MESAS_INICIAL)
  const [fila, setFila] = useState<ReservaEnFila[]>(FILA_INICIAL)
  const [modalAbierto, setModalAbierto] = useState(false)

  const mesasLibres    = mesas.filter(m => m.estado === 'libre').length
  const mesasOcupadas  = mesas.filter(m => m.estado === 'ocupada').length
  const mesasReservadas = mesas.filter(m => m.estado === 'reservada').length
  const porcentajeOcupacion = Math.round((mesasOcupadas / mesas.length) * 100)
  const pendientes = fila.filter(r => r.estado === 'pendiente').length
  const cubiertos  = fila.reduce((acc, r) => acc + r.personas, 0)
  const proximaReserva = fila.find(r => r.estado === 'confirmada' || r.estado === 'pendiente')

  function alternarMesa(id: number) {
    setMesas(prev => prev.map(m => {
      if (m.id !== id || m.estado === 'reservada') return m
      return { ...m, estado: m.estado === 'libre' ? 'ocupada' as const : 'libre' as const }
    }))
  }

  function accionReserva(id: string) {
    setFila(prev => prev.flatMap(r => {
      if (r.id !== id) return [r]
      if (r.estado === 'sentada')    return []
      if (r.estado === 'pendiente')  return [{ ...r, estado: 'confirmada' as const }]
      if (r.estado === 'confirmada') return [{ ...r, estado: 'sentada' as const }]
      return [r]
    }))
  }

  function cancelarReserva(id: string) {
    setFila(prev => prev.filter(r => r.id !== id))
  }

  function agregarReserva(nueva: Omit<ReservaEnFila, 'id' | 'estado'>) {
    const entrada: ReservaEnFila = { ...nueva, id: String(Date.now()), estado: 'pendiente' }
    setFila(prev => [...prev, entrada].sort((a, b) => a.hora.localeCompare(b.hora)))
    setModalAbierto(false)
  }

  return {
    mesas, fila,
    mesasLibres, mesasOcupadas, mesasReservadas,
    porcentajeOcupacion, pendientes, cubiertos, proximaReserva,
    modalAbierto, setModalAbierto,
    alternarMesa, accionReserva, cancelarReserva, agregarReserva,
  }
}
