import { useState } from 'react'
import { NavLateral } from '@/components/navegacion/NavLateral'
import { Plus, Pencil, Trash2, X } from 'lucide-react'

interface Platillo {
  id: string
  nombre: string
  descripcion: string
  precio: number
  categoria: string
  disponible: boolean
}

type Categoria = 'Entradas' | 'Platos fuertes' | 'Postres' | 'Bebidas'

const CATEGORIAS: Categoria[] = ['Entradas', 'Platos fuertes', 'Postres', 'Bebidas']

const MENU_INICIAL: Platillo[] = [
  { id: '1', nombre: 'Tostadas de atún',       descripcion: 'Atún sellado, aguacate, salsa soya', precio: 185, categoria: 'Entradas',       disponible: true  },
  { id: '2', nombre: 'Carpaccio de res',        descripcion: 'Láminas de res, parmesano, alcaparras', precio: 210, categoria: 'Entradas',   disponible: true  },
  { id: '3', nombre: 'Sopa de fideo seco',      descripcion: 'Receta tradicional de la casa',      precio: 140, categoria: 'Entradas',       disponible: false },
  { id: '4', nombre: 'Filete de huachinango',   descripcion: 'Con verduras salteadas y arroz',     precio: 380, categoria: 'Platos fuertes', disponible: true  },
  { id: '5', nombre: 'Costilla de cerdo',       descripcion: 'BBQ ahumado 12 horas, puré de papa', precio: 345, categoria: 'Platos fuertes', disponible: true  },
  { id: '6', nombre: 'Risotto de hongos',       descripcion: 'Hongos silvestres, parmesano, trufa', precio: 295, categoria: 'Platos fuertes', disponible: true },
  { id: '7', nombre: 'Pannacotta de vainilla',  descripcion: 'Con frutos rojos y miel',            precio: 135, categoria: 'Postres',         disponible: true  },
  { id: '8', nombre: 'Tarta de queso',          descripcion: 'Base de galleta, mermelada de higo', precio: 145, categoria: 'Postres',         disponible: true  },
  { id: '9', nombre: 'Agua de Jamaica',         descripcion: 'Natural, sin azúcar añadida',        precio: 45,  categoria: 'Bebidas',          disponible: true  },
  { id: '10', nombre: 'Limonada de menta',      descripcion: 'Con hierbabuena fresca',             precio: 55,  categoria: 'Bebidas',          disponible: true  },
]

function ModalPlatillo({
  platillo,
  categorias,
  onGuardar,
  onCerrar,
}: {
  platillo?: Platillo
  categorias: Categoria[]
  onGuardar: (p: Omit<Platillo, 'id'>) => void
  onCerrar: () => void
}) {
  const [nombre,      setNombre]      = useState(platillo?.nombre      ?? '')
  const [descripcion, setDescripcion] = useState(platillo?.descripcion ?? '')
  const [precio,      setPrecio]      = useState(platillo?.precio      ?? 0)
  const [categoria,   setCategoria]   = useState<string>(platillo?.categoria ?? categorias[0])
  const [disponible,  setDisponible]  = useState(platillo?.disponible  ?? true)

  function manejarEnvio(e: React.FormEvent) {
    e.preventDefault()
    if (!nombre.trim()) return
    onGuardar({ nombre: nombre.trim(), descripcion, precio, categoria, disponible })
  }

  return (
    <div className="fixed inset-0 bg-oscuro/50 flex items-center justify-center z-50 px-4" onClick={onCerrar}>
      <div className="bg-crema rounded-[24px] p-6 w-full max-w-sm flex flex-col gap-5" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[22px] text-cafe">{platillo ? 'Editar platillo' : 'Nuevo platillo'}</h2>
          <button onClick={onCerrar} className="text-cafe-atenuado hover:text-cafe"><X size={20} /></button>
        </div>

        <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
          {[
            { label: 'Nombre', value: nombre, onChange: setNombre, type: 'text', placeholder: 'Ej. Filete de res' },
            { label: 'Descripción', value: descripcion, onChange: setDescripcion, type: 'text', placeholder: 'Ingredientes principales' },
          ].map(({ label, value, onChange, type, placeholder }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <label className="font-body font-medium text-[11px] text-cafe-atenuado uppercase tracking-widest">{label}</label>
              <input
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="bg-white border border-cafe/12 rounded-[12px] px-3.5 py-3 font-body text-[13px] text-cafe placeholder:text-cafe-claro outline-none focus:border-cafe/30 transition-colors"
              />
            </div>
          ))}

          <div className="flex gap-3">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="font-body font-medium text-[11px] text-cafe-atenuado uppercase tracking-widest">Precio</label>
              <input
                type="number"
                value={precio}
                onChange={e => setPrecio(Number(e.target.value))}
                className="bg-white border border-cafe/12 rounded-[12px] px-3.5 py-3 font-body text-[13px] text-cafe outline-none focus:border-cafe/30 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="font-body font-medium text-[11px] text-cafe-atenuado uppercase tracking-widest">Categoría</label>
              <select
                value={categoria}
                onChange={e => setCategoria(e.target.value)}
                className="bg-white border border-cafe/12 rounded-[12px] px-3.5 py-3 font-body text-[13px] text-cafe outline-none focus:border-cafe/30 transition-colors"
              >
                {categorias.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={disponible}
              onChange={e => setDisponible(e.target.checked)}
              className="w-4 h-4 accent-amarillo"
            />
            <span className="font-body text-[13px] text-cafe">Disponible hoy</span>
          </label>

          <div className="flex gap-2 mt-1">
            <button
              type="button"
              onClick={onCerrar}
              className="flex-1 border border-cafe/15 rounded-full py-3 font-body font-medium text-[13px] text-cafe-atenuado hover:border-cafe/30 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!nombre.trim()}
              className="flex-1 bg-amarillo rounded-full py-3 font-body font-bold text-[13px] text-cafe-texto disabled:opacity-40 transition-opacity"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function Menu() {
  const [platillos, setPlatillos] = useState<Platillo[]>(MENU_INICIAL)
  const [categoriaActiva, setCategoriaActiva] = useState<Categoria>('Entradas')
  const [modalAbierto, setModalAbierto] = useState(false)
  const [platilloEditando, setPlatilloEditando] = useState<Platillo | undefined>()

  const visibles = platillos.filter(p => p.categoria === categoriaActiva)

  function abrirNuevo() {
    setPlatilloEditando(undefined)
    setModalAbierto(true)
  }

  function abrirEditar(p: Platillo) {
    setPlatilloEditando(p)
    setModalAbierto(true)
  }

  function guardar(datos: Omit<Platillo, 'id'>) {
    if (platilloEditando) {
      setPlatillos(prev => prev.map(p => p.id === platilloEditando.id ? { ...datos, id: p.id } : p))
    } else {
      setPlatillos(prev => [...prev, { ...datos, id: String(Date.now()) }])
    }
    setModalAbierto(false)
  }

  function eliminar(id: string) {
    setPlatillos(prev => prev.filter(p => p.id !== id))
  }

  function toggleDisponible(id: string) {
    setPlatillos(prev => prev.map(p => p.id !== id ? p : { ...p, disponible: !p.disponible }))
  }

  return (
    <div className="flex min-h-screen bg-crema">
      <NavLateral tabActiva="menu" />

      <main className="flex-1 flex flex-col gap-5.5 px-7 pt-5.5 pb-8 overflow-auto">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-body font-medium text-[11px] text-cafe-atenuado">Carta activa</p>
            <h1 className="font-display text-[28px] text-cafe">{platillos.length} platillos · Casa Paloma</h1>
          </div>
          <button onClick={abrirNuevo} className="flex items-center gap-2 bg-amarillo rounded-full px-4 py-2.5">
            <Plus size={14} />
            <span className="font-body font-semibold text-[13px] text-cafe-texto">Nuevo platillo</span>
          </button>
        </div>

        <div className="bg-white border border-cafe/7 rounded-[20px] overflow-hidden">
          <div className="px-4.5 pt-4 pb-0 flex items-center gap-1">
            {CATEGORIAS.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoriaActiva(cat)}
                className={`px-4 py-2.5 font-body font-medium text-[13px] transition-colors border-b-2 ${
                  categoriaActiva === cat
                    ? 'text-cafe border-cafe'
                    : 'text-cafe-atenuado border-transparent hover:text-cafe'
                }`}
              >
                {cat}
                <span className="ml-1.5 font-body text-[11px] text-cafe-claro">
                  ({platillos.filter(p => p.categoria === cat).length})
                </span>
              </button>
            ))}
          </div>
          <div className="h-px bg-cafe/7" />

          {visibles.length === 0 && (
            <p className="font-body text-[13px] text-cafe-atenuado text-center py-10">
              Sin platillos en esta categoría
            </p>
          )}

          {visibles.map((p, i) => (
            <div key={p.id}>
              <div className="flex items-center gap-4 px-4.5 py-3.5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-body font-semibold text-[13px] text-cafe">{p.nombre}</span>
                    {!p.disponible && (
                      <span className="px-1.5 py-0.5 bg-lleno/10 text-lleno rounded-full font-body text-[10px] font-semibold">
                        No disponible
                      </span>
                    )}
                  </div>
                  <span className="font-body text-[12px] text-cafe-atenuado">{p.descripcion}</span>
                </div>
                <span className="font-body font-bold text-[15px] text-cafe shrink-0">${p.precio}</span>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => toggleDisponible(p.id)}
                    className={`px-2.5 py-1.25 rounded-[6px] font-body font-medium text-[11px] transition-colors ${
                      p.disponible
                        ? 'bg-disponible/12 text-disponible'
                        : 'bg-arena text-cafe-atenuado'
                    }`}
                  >
                    {p.disponible ? 'Activo' : 'Inactivo'}
                  </button>
                  <button
                    onClick={() => abrirEditar(p)}
                    className="w-8 h-8 rounded-[8px] bg-arena flex items-center justify-center text-cafe-atenuado hover:text-cafe transition-colors"
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => eliminar(p.id)}
                    className="w-8 h-8 rounded-[8px] bg-arena flex items-center justify-center text-cafe-atenuado hover:text-lleno transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              {i < visibles.length - 1 && <div className="h-px bg-cafe/7" />}
            </div>
          ))}
        </div>
      </main>

      {modalAbierto && (
        <ModalPlatillo
          platillo={platilloEditando}
          categorias={CATEGORIAS}
          onGuardar={guardar}
          onCerrar={() => setModalAbierto(false)}
        />
      )}
    </div>
  )
}
