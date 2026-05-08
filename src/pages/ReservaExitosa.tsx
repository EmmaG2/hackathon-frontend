import { useNavigate } from 'react-router-dom'
import { RejillaResumen } from '@/components/reserva/RejillaResumen'

const CAMPOS_TICKET = [
  { etiqueta: 'Fecha', valor: 'Sáb 9 May' },
  { etiqueta: 'Hora', valor: '20:30' },
  { etiqueta: 'Personas', valor: '4' },
  { etiqueta: 'Mesa', valor: 'Mesa 8', resaltado: true },
]
export function ReservaExitosa() {
  const navegar = useNavigate()

  const agregarAGoogleCalendar = () => {
    // Fecha del evento
    const inicio = new Date('2026-05-09T20:30:00')
    const fin = new Date('2026-05-09T22:00:00')

    // Formato requerido por Google Calendar
    const formatoFecha = (fecha: Date) =>
      fecha.toISOString().replace(/-|:|\.\d\d\d/g, '')

    const fechaInicio = formatoFecha(inicio)
    const fechaFin = formatoFecha(fin)

    // Datos del evento
    const titulo = encodeURIComponent('Reservación en Casa Paloma')
    const detalles = encodeURIComponent(
      'Tu mesa ha sido reservada exitosamente.\nMesa: 8\nPersonas: 4'
    )

    const ubicacion = encodeURIComponent('Casa Paloma')

    // URL de Google Calendar
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${titulo}&dates=${fechaInicio}/${fechaFin}&details=${detalles}&location=${ubicacion}`

    // Abrir Google Calendar
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen bg-crema flex flex-col items-center justify-start md:justify-center pt-24 md:pt-0 px-4.5">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="w-23 h-23 rounded-full bg-amarillo flex items-center justify-center mb-7">
          <span className="font-body font-bold text-[42px] text-cafe-texto">✓</span>
        </div>

        <h1 className="font-display text-[30px] md:text-[36px] text-cafe text-center mb-4">
          ¡Mesa apartada!
        </h1>

        <p className="font-body text-[14px] text-cafe-atenuado text-center mb-10 max-w-[320px]">
          Te esperamos en Casa Paloma. Recibirás confirmación por correo.
        </p>

        <div className="w-full bg-white border border-cafe/12 rounded-[20px] p-4.5 flex flex-col gap-3 mb-8 md:shadow-sm">
          <RejillaResumen campos={CAMPOS_TICKET} />

          <div className="h-px bg-cafe/15" />

          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="font-body font-medium text-[10px] text-cafe-atenuado">
                CÓDIGO
              </span>

              <span className="font-body font-bold text-[18px] text-cafe">
                CP-7K2N
              </span>
            </div>

            <div className="w-14 h-14 bg-white border border-cafe/12 rounded-[8px] flex items-center justify-center overflow-hidden">
              <div className="grid grid-cols-7 gap-px p-1">
                {[1,0,0,1,1,0,1, 1,1,1,0,1,1,0, 0,1,0,0,1,0,1, 1,0,1,0,0,1,0, 0,1,1,0,1,1,1, 1,0,0,1,0,0,1, 1,1,1,0,1,0,0].map((v, i) => (
                  <div
                    key={i}
                    className={`w-1 h-1 ${
                      v ? 'bg-cafe-texto' : 'bg-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 w-full">
          <button
            onClick={() => navegar('/mis-reservas')}
            className="bg-amarillo rounded-full h-13 flex items-center justify-center flex-1"
          >
            <span className="font-body font-bold text-[15px] text-cafe-texto">
              Ver mis reservas
            </span>
          </button>

          <button
            onClick={agregarAGoogleCalendar}
            className="bg-white border border-cafe/12 rounded-full h-13 flex items-center justify-center flex-1 hover:bg-[#f8f6f2] transition"
          >
            <span className="font-body font-semibold text-[15px] text-cafe">
              📅 Añadir al calendario
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}