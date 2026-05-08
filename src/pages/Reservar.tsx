import { useEffect, useState } from 'react'
import {
  useNavigate,
  useParams,
  useLocation,
} from 'react-router-dom'

import {
  X,
  Plus,
  Minus,
  ArrowLeft,
} from 'lucide-react'

import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  Timestamp,
} from 'firebase/firestore'

import { db } from '@/lib/firebase'
import { RejillaResumen } from '@/components/reserva/RejillaResumen'
import { PlanoMesasCinepolis } from '@/components/reserva/PlanoMesasCinepolis'
import { FormularioPago } from '@/components/pago/FormularioPago'
import { useRestaurante } from '@/hooks/useRestaurante'
import { formatearMoneda } from '@/lib/utils'
import type { ItemMenu } from '@/types'

const DIAS = [
  { etiqueta: 'Hoy', numero: '8' },
  { etiqueta: 'Sáb', numero: '9' },
  { etiqueta: 'Dom', numero: '10' },
  { etiqueta: 'Lun', numero: '11' },
  { etiqueta: 'Mar', numero: '12' },
  { etiqueta: 'Mié', numero: '13' },
]

const HORARIOS_BASE = [
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
]


const TOTAL_MESAS = 14
function SeccionLabel({
  label,
  derecha,
}: {
  label: string
  derecha?: string
}) {
  return (
    <div className="flex items-baseline justify-between mb-2.5">
      <span className="font-body font-medium text-[10px] text-cafe-atenuado tracking-widest uppercase">
        {label}
      </span>

      {derecha && (
        <span className="font-body text-[10px] text-amarillo-oscuro tracking-wide">
          {derecha}
        </span>
      )}
    </div>
  )
}

function ContadorPersonas({
  valor,
  onChange,
}: {
  valor: number
  onChange: (n: number) => void
}) {
  return (
    <div className="flex items-center gap-0 bg-arena rounded-full border border-cafe/12 p-1 w-fit">
      <button
        onClick={() => onChange(Math.max(1, valor - 1))}
        disabled={valor <= 1}
        className="w-9 h-9 rounded-full bg-crema flex items-center justify-center text-cafe disabled:opacity-30"
      >
        <Minus size={18} />
      </button>
      <span className="min-w-14 text-center font-body font-bold text-[18px] text-cafe tabular-nums">
        {valor}
      </span>
      <button
        onClick={() => onChange(Math.min(12, valor + 1))}
        disabled={valor >= 12}
        className="w-9 h-9 rounded-full bg-amarillo flex items-center justify-center text-cafe-texto disabled:opacity-30"
      >
        <Plus size={18} />
      </button>
    </div>
  )
}

export function Reservar() {
  const { id } = useParams<{ id: string }>()
  const navegar = useNavigate()
  const location = useLocation()
  const { restaurante, cargando } =
    useRestaurante(id)
  const [diaSeleccionado, setDiaSeleccionado] =
    useState(
      location.state?.dia || ''
    )

  const [horaSeleccionada, setHoraSeleccionada] =
    useState(
      location.state?.hora || ''
    )
  const [cantPersonas, setCantPersonas] =
    useState(
      location.state?.personas || 1
    )
  const [mesaSeleccionada, setMesaSeleccionada] =
    useState<number | null>(null)

  const [orden, setOrden] = useState<
    { item: ItemMenu; cantidad: number }[]
  >([])
  const [paso, setPaso] = useState<
    'seleccion' | 'pago'
  >('seleccion')
  // MESAS OCUPADAS
  const [mesasOcupadas, setMesasOcupadas] =
    useState<number[]>([])

  //  HORARIOS DINÁMICOS
  const [horariosDisponibles, setHorariosDisponibles] =
    useState(
      HORARIOS_BASE.map((hora) => ({
        hora,
        disponible: true,
      }))
    )

  // CARGAR RESERVAS
  useEffect(() => {
    async function cargarReservas() {
      if (!diaSeleccionado || !horaSeleccionada) {
        setMesasOcupadas([])
        return
      }
      if (!id) return
      const fecha = `2026-05-${diaSeleccionado.padStart(2, '0')}`
      const q = query(
        collection(db, 'reservas'),
        where('restauranteId', '==', id),
        where('fecha', '==', fecha)
      )
      const snapshot = await getDocs(q)
      const reservas = snapshot.docs.map((doc) =>
        doc.data()
      )
      // MESAS OCUPADAS DE ESA HORA
      const mesas = reservas
        .filter(
          (r: any) =>
            r.hora === horaSeleccionada
        )
        .map((r: any) => r.mesa)
      setMesasOcupadas(mesas)

      //  HORARIOS DISPONIBLES
      const horarios = HORARIOS_BASE.map((hora) => {
        const reservasHora = reservas.filter(
          (r: any) => r.hora === hora
        )
        return {
          hora,
          disponible:
            reservasHora.length < TOTAL_MESAS,
        }
      })
      setHorariosDisponibles(horarios)
    }
    cargarReservas()
  }, [id, diaSeleccionado, horaSeleccionada])

  const subtotal = orden.reduce(
    (acc, current) =>
      acc +
      current.item.precio * current.cantidad,
    0
  )
  const tarifaReserva = subtotal > 0 ? 0 : 50
  const total = subtotal + tarifaReserva
  const camposResumen = [
    { 
      etiqueta: 'Fecha', 
      valor: diaSeleccionado ? `${diaSeleccionado} May` : '—' 
    },
    { etiqueta: 'Hora', valor: horaSeleccionada || '—' },

    {
      etiqueta: 'Personas',
      valor: String(cantPersonas),
    },

    {
      etiqueta: 'Mesa',
      valor:
        mesaSeleccionada
          ? `Mesa ${mesaSeleccionada}`
          : '—',

      resaltado: true,
    },

    {
      etiqueta: 'Pre-orden',

      valor:
        subtotal > 0
          ? formatearMoneda(subtotal)
          : 'Ninguna',
    },
  ]

  const puedeConfirmar = !!(
    diaSeleccionado &&
    horaSeleccionada &&
    mesaSeleccionada
  )

  function toggleMesa(idMesa: number) {

    if (mesasOcupadas.includes(idMesa))
      return

    setMesaSeleccionada((prev) =>
      prev === idMesa ? null : idMesa
    )
  }

  if (cargando) return null

  return (
    <div className="fixed inset-0 bg-cafe/40 flex items-end md:items-center justify-center md:p-6 z-50">

      <div className="w-full md:max-w-4xl bg-crema border border-cafe/12 rounded-t-[28px] md:rounded-[28px] max-h-[90vh] overflow-y-auto shadow-2xl">

        <div className="w-11 h-1 bg-boton-muted rounded-full mx-auto mt-2.5 md:hidden" />

        {/* HEADER */}
        <div className="flex items-start justify-between px-4.5 pt-4 pb-2">

          <div className="flex items-center gap-3">

            {paso === 'pago' && (
              <button
                onClick={() =>
                  setPaso('seleccion')
                }
                className="p-2 -ml-2 text-cafe-atenuado hover:text-cafe transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            )}

            <div>

              <p className="font-body font-medium text-[10px] text-cafe-atenuado uppercase tracking-widest">
                {paso === 'seleccion'
                  ? 'Reservar en'
                  : 'Confirmar pago'}
              </p>

              <h2 className="font-display text-[22px] text-cafe">
                {restaurante?.nombre}
              </h2>
            </div>
          </div>

          <button
            onClick={() => navegar(-1)}
            className="text-cafe-atenuado hover:text-cafe mt-2.5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="h-px bg-cafe/7" />

        <div className="px-4.5 pt-4 pb-1 flex flex-col gap-6">

          {paso === 'seleccion' ? (

            <div className="flex flex-col gap-6 md:grid md:grid-cols-[1fr_320px] md:gap-8 md:items-start">

              <div className="flex flex-col gap-6">

                {/* FECHAS */}
                <div>

                  <SeccionLabel label="Fecha" />

                  <div className="flex gap-1.5 overflow-x-auto pb-1">

                    {DIAS.map((dia) => {

                      const activo =
                        diaSeleccionado ===
                        dia.numero

                      return (
                        <button
                          key={dia.numero}
                          onClick={() => {
                            setDiaSeleccionado(dia.numero)
                            setMesaSeleccionada(null)
                          }}
                          className={`flex flex-col gap-0.5 items-center justify-center px-1.5 py-2.5 rounded-[14px] min-w-[52px] shrink-0 border transition-all ${
                            activo
                              ? 'bg-amarillo border-amarillo text-cafe-texto'
                              : 'bg-white border-cafe/12 text-cafe'
                          }`}
                        >

                          <span className="font-body font-medium text-[9px] uppercase tracking-wider">
                            {dia.etiqueta}
                          </span>

                          <span className="font-body font-bold text-[18px]">
                            {dia.numero}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* HORARIOS */}
                <div>

                  <SeccionLabel label="Hora disponible" />

                  <div className="grid grid-cols-4 md:grid-cols-8 gap-2">

                    {horariosDisponibles.map(
                      ({
                        hora,
                        disponible,
                      }) => {

                        const activo =
                          horaSeleccionada === hora

                        return (
                          <button
                            key={hora}
                            disabled={!disponible}
                            onClick={() => {

                              setHoraSeleccionada(hora)

                              setMesaSeleccionada(null)
                            }}
                            className={`h-[42px] rounded-[14px] font-body font-medium text-[13px] transition-all ${
                              activo
                                ? 'bg-amarillo text-cafe-texto'
                                : disponible
                                ? 'bg-white border border-cafe/12 text-cafe'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {hora}
                          </button>
                        )
                      }
                    )}
                  </div>
                </div>

                {/* PERSONAS */}
                <div>

                  <SeccionLabel
                    label="Personas"
                    derecha="Máx 12"
                  />

                  <ContadorPersonas
                    valor={cantPersonas}
                    onChange={setCantPersonas}
                  />
                </div>

                {/* MESAS */}
                <div>

                  <SeccionLabel label="Elige tu mesa" />

                  <PlanoMesasCinepolis
                    mesaSeleccionada={mesaSeleccionada}
                    onSeleccionarMesa={toggleMesa}
                    cantPersonas={cantPersonas}
                    mesasOcupadas={mesasOcupadas}
                  />
                </div>
              </div>

              {/* RESUMEN */}
              <div className="flex flex-col gap-4 sticky top-0">

                <div className="bg-white border border-cafe/12 rounded-[20px] p-5 flex flex-col gap-4">

                  <p className="font-body font-medium text-[10px] text-cafe-atenuado uppercase tracking-widest">
                    Resumen de reserva
                  </p>

                  <RejillaResumen
                    campos={camposResumen}
                  />

                  <div className="flex items-center justify-between pt-3 border-t border-cafe/7">

                    <span className="font-body text-[14px] text-cafe-atenuado">
                      Total
                    </span>

                    <span className="font-display text-[24px] text-cafe">
                      {formatearMoneda(total)}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      puedeConfirmar &&
                      setPaso('pago')
                    }
                    disabled={!puedeConfirmar}
                    className={`bg-amarillo rounded-full h-13 flex items-center justify-center transition-all ${
                      puedeConfirmar
                        ? 'opacity-100'
                        : 'opacity-40 cursor-not-allowed'
                    }`}
                  >

                    <span className="font-body font-bold text-[15px] text-cafe-texto">
                      Continuar al pago
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ) : (

            <div className="max-w-md mx-auto w-full py-4">

              <FormularioPago
                totalMxn={total}
                alExito={async () => {

                  try {

                    if (
                      !mesaSeleccionada ||
                      !id
                    )
                      return

                    await addDoc(
                      collection(db, 'reservas'),
                      {
                        restauranteId: id,
                        nombre: 'Cliente',

                        fecha:
                          `2026-05-${diaSeleccionado.padStart(2, '0')}`,

                        hora:
                          horaSeleccionada,

                        mesa:
                          mesaSeleccionada,

                        personas:
                          cantPersonas,

                        estado:
                          'pendiente',

                        creadoEn:
                          Timestamp.now(),
                      }
                    )

                    navegar('/reserva/exito', {

                      state: {

                        restaurante:
                          restaurante?.nombre,

                        fecha:
                          `2026-05-${diaSeleccionado.padStart(2, '0')}`,

                        hora:
                          horaSeleccionada,

                        personas:
                          cantPersonas,

                        mesa:
                          mesaSeleccionada,
                      },
                    })

                  } catch (error) {

                    console.error(error)
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}