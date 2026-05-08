import { useState } from 'react'
import { NavLateral } from '@/components/navegacion/NavLateral'
import { Plus, X } from 'lucide-react'

type Rol = 'Gerente' | 'Mesero' | 'Hostess' | 'Cocinero' | 'Sommelier'

interface Miembro {
  id: string
  nombre: string
  rol: Rol
  turno: 'Mañana' | 'Tarde' | 'Noche'
  activo: boolean
  iniciales: string
  color: string
}

const ROLES: Rol[] = ['Gerente', 'Mesero', 'Hostess', 'Cocinero', 'Sommelier']

const COLORES_AVATAR = ['#fbd464', '#E8DCC8', '#3A2E20', '#5C4F3D', '#b8ac9c']

const EQUIPO_INICIAL: Miembro[] = [
  { id: '1', nombre: 'Sofía Ramírez',   rol: 'Gerente',   turno: 'Noche',  activo: true,  iniciales: 'SR', color: '#fbd464' },
  { id: '2', nombre: 'Jorge Mendoza',   rol: 'Mesero',    turno: 'Noche',  activo: true,  iniciales: 'JM', color: '#E8DCC8' },
  { id: '3', nombre: 'Claudia Torres',  rol: 'Hostess',   turno: 'Noche',  activo: true,  iniciales: 'CT', color: '#b8ac9c' },
  { id: '4', nombre: 'Andrés López',    rol: 'Cocinero',  turno: 'Noche',  activo: true,  iniciales: 'AL', color: '#5C4F3D' },
  { id: '5', nombre: 'Diana Fuentes',   rol: 'Mesero',    turno: 'Noche',  activo: false, iniciales: 'DF', color: '#E8DCC8' },
  { id: '6', nombre: 'Ricardo Vega',    rol: 'Sommelier', turno: 'Noche',  activo: true,  iniciales: 'RV', color: '#fbd464' },
  { id: '7', nombre: 'Mónica Salinas',  rol: 'Cocinero',  turno: 'Mañana', activo: true,  iniciales: 'MS', color: '#b8ac9c' },
  { id: '8', nombre: 'Héctor Ruiz',     rol: 'Mesero',    turno: 'Tarde',  activo: true,  iniciales: 'HR', color: '#5C4F3D' },
]

const COLOR_ROL: Record<Rol, string> = {
  Gerente:   'bg-amarillo/20 text-amarillo-oscuro',
  Mesero:    'bg-confirmado/10 text-confirmado',
  Hostess:   'bg-disponible/10 text-disponible',
  Cocinero:  'bg-cafe/10 text-cafe',
  Sommelier: 'bg-lleno/10 text-lleno',
}

function ModalMiembro({
  onGuardar,
  onCerrar,
}: {
  onGuardar: (m: Omit<Miembro, 'id' | 'iniciales' | 'color' | 'activo'>) => void
  onCerrar: () => void
}) {
  const [nombre, setNombre] = useState('')
  const [rol,    setRol]    = useState<Rol>('Mesero')
  const [turno,  setTurno]  = useState<Miembro['turno']>('Noche')

  function manejarEnvio(e: React.FormEvent) {
    e.preventDefault()
    if (!nombre.trim()) return
    onGuardar({ nombre: nombre.trim(), rol, turno })
  }

  return (
    <div className="fixed inset-0 bg-oscuro/50 flex items-center justify-center z-50 px-4" onClick={onCerrar}>
      <div className="bg-crema rounded-[24px] p-6 w-full max-w-sm flex flex-col gap-5" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[22px] text-cafe">Nuevo miembro</h2>
          <button onClick={onCerrar} className="text-cafe-atenuado hover:text-cafe"><X size={20} /></button>
        </div>
        <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-body font-medium text-[11px] text-cafe-atenuado uppercase tracking-widest">Nombre</label>
            <input
              autoFocus
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Nombre completo"
              className="bg-white border border-cafe/12 rounded-[12px] px-3.5 py-3 font-body text-[13px] text-cafe placeholder:text-cafe-claro outline-none focus:border-cafe/30 transition-colors"
            />
          </div>
          <div className="flex gap-3">
            {[
              { label: 'Rol',   value: rol,   onChange: (v: string) => setRol(v as Rol),              options: ROLES },
              { label: 'Turno', value: turno, onChange: (v: string) => setTurno(v as Miembro['turno']), options: ['Mañana', 'Tarde', 'Noche'] },
            ].map(({ label, value, onChange, options }) => (
              <div key={label} className="flex flex-col gap-1.5 flex-1">
                <label className="font-body font-medium text-[11px] text-cafe-atenuado uppercase tracking-widest">{label}</label>
                <select
                  value={value}
                  onChange={e => onChange(e.target.value)}
                  className="bg-white border border-cafe/12 rounded-[12px] px-3.5 py-3 font-body text-[13px] text-cafe outline-none focus:border-cafe/30 transition-colors"
                >
                  {options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-1">
            <button type="button" onClick={onCerrar}
              className="flex-1 border border-cafe/15 rounded-full py-3 font-body font-medium text-[13px] text-cafe-atenuado hover:border-cafe/30 transition-colors">
              Cancelar
            </button>
            <button type="submit" disabled={!nombre.trim()}
              className="flex-1 bg-amarillo rounded-full py-3 font-body font-bold text-[13px] text-cafe-texto disabled:opacity-40 transition-opacity">
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function Equipo() {
  const [equipo, setEquipo]       = useState<Miembro[]>(EQUIPO_INICIAL)
  const [modalAbierto, setModal]  = useState(false)
  const [turnoFiltro, setTurno]   = useState<Miembro['turno'] | 'Todos'>('Todos')

  const activos  = equipo.filter(m => m.activo).length
  const visibles = turnoFiltro === 'Todos' ? equipo : equipo.filter(m => m.turno === turnoFiltro)

  function agregarMiembro(datos: Omit<Miembro, 'id' | 'iniciales' | 'color' | 'activo'>) {
    const partes = datos.nombre.split(' ')
    const iniciales = partes.length >= 2
      ? partes[0][0] + partes[1][0]
      : partes[0].slice(0, 2)
    const color = COLORES_AVATAR[equipo.length % COLORES_AVATAR.length]
    setEquipo(prev => [...prev, { ...datos, id: String(Date.now()), iniciales: iniciales.toUpperCase(), color, activo: true }])
    setModal(false)
  }

  function toggleActivo(id: string) {
    setEquipo(prev => prev.map(m => m.id !== id ? m : { ...m, activo: !m.activo }))
  }

  return (
    <div className="flex min-h-screen bg-crema">
      <NavLateral tabActiva="equipo" />

      <main className="flex-1 flex flex-col gap-5.5 px-7 pt-5.5 pb-8 overflow-auto">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-body font-medium text-[11px] text-cafe-atenuado">Casa Paloma · Noche</p>
            <h1 className="font-display text-[28px] text-cafe">{activos} activos · {equipo.length} en total</h1>
          </div>
          <button onClick={() => setModal(true)} className="flex items-center gap-2 bg-amarillo rounded-full px-4 py-2.5">
            <Plus size={14} />
            <span className="font-body font-semibold text-[13px] text-cafe-texto">Agregar miembro</span>
          </button>
        </div>

        <div className="bg-white border border-cafe/7 rounded-[20px] overflow-hidden">
          <div className="px-4.5 pt-4 pb-3 flex items-center justify-between">
            <h2 className="font-display text-[18px] text-cafe">Staff</h2>
            <div className="flex gap-1">
              {(['Todos', 'Mañana', 'Tarde', 'Noche'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTurno(t)}
                  className={`px-3 py-1.5 rounded-full font-body font-medium text-[12px] transition-colors ${
                    turnoFiltro === t
                      ? 'bg-cafe text-crema'
                      : 'bg-arena text-cafe-atenuado hover:bg-arena-oscura'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-px bg-cafe/7" />

          {visibles.map((m, i) => (
            <div key={m.id}>
              <div className="flex items-center gap-3.5 px-4.5 py-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: m.color }}
                >
                  <span className="font-body font-bold text-[13px] text-cafe">{m.iniciales}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-body font-semibold text-[13px] text-cafe">{m.nombre}</span>
                    <span className={`px-1.75 py-0.5 rounded-full font-body font-semibold text-[10px] ${COLOR_ROL[m.rol]}`}>
                      {m.rol}
                    </span>
                  </div>
                  <span className="font-body text-[11px] text-cafe-atenuado">Turno {m.turno}</span>
                </div>
                <button
                  onClick={() => toggleActivo(m.id)}
                  className={`px-3 py-1.5 rounded-full font-body font-medium text-[12px] transition-colors ${
                    m.activo
                      ? 'bg-disponible/12 text-disponible'
                      : 'bg-arena text-cafe-atenuado'
                  }`}
                >
                  {m.activo ? 'Activo' : 'Inactivo'}
                </button>
              </div>
              {i < visibles.length - 1 && <div className="h-px bg-cafe/7" />}
            </div>
          ))}
        </div>
      </main>

      {modalAbierto && (
        <ModalMiembro onGuardar={agregarMiembro} onCerrar={() => setModal(false)} />
      )}
    </div>
  )
}
