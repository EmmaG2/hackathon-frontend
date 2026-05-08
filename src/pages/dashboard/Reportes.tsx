import { useEffect, useState, useRef, useCallback } from 'react'
import { NavLateral } from '@/components/navegacion/NavLateral'
import { getBubbleInsight } from '@/lib/api'
import type { InsightBubble } from '@/lib/api'

const RESTAURANT_ID = 'casa-paloma'

const AREA: Record<string, { nombre: string; desc: string; icono: string }> = {
  flujo_clientes: { nombre: 'Flujo de clientes',     desc: 'Llegada y rotación',       icono: '👥' },
  consumo:        { nombre: 'Consumo',                desc: 'Tendencias de compra',     icono: '🍽️' },
  operaciones:    { nombre: 'Operación',              desc: 'Cocina y personal',        icono: '⚙️' },
  experiencia:    { nombre: 'Experiencia',            desc: 'Satisfacción del cliente', icono: '⭐' },
  espacial:       { nombre: 'Distribución',           desc: 'Uso del espacio',          icono: '🗺️' },
}

const FACTOR: Record<string, string> = {
  flujo_clientes: 'el flujo de clientes',
  consumo:        'los patrones de consumo',
  operaciones:    'la carga operativa de cocina',
  experiencia:    'la experiencia del cliente',
  espacial:       'la distribución del espacio',
}

const SHAP_NOMBRE: Record<string, string> = {
  return_rate:       'Clientes recurrentes',
  avg_rating:        'Calificación promedio',
  cancellation_rate: 'Cancelaciones',
  avg_wait_time:     'Tiempo de espera',
  complaint_rate:    'Quejas registradas',
  time_of_day:       'Hora del día',
  day_of_week:       'Día de la semana',
  avg_order_value:   'Valor de orden',
  staff_load:        'Carga de personal',
  kitchen_queue_depth: 'Cola de cocina',
}

const PREGUNTAS = [
  { id: 'ocupacion',        texto: '¿Cómo estará la ocupación?' },
  { id: 'factor',           texto: '¿Qué afecta más al negocio?' },
  { id: 'recomendaciones',  texto: '¿Qué recomendaciones tienes?' },
  { id: 'experiencia',      texto: '¿Cómo está la experiencia?' },
  { id: 'atencion',         texto: '¿Qué necesita atención?' },
  { id: 'resumen',          texto: 'Ver resumen general' },
]

const nivelTexto = (s: number) => s >= 0.68 ? 'elevado' : s >= 0.48 ? 'moderado' : s >= 0.32 ? 'estable' : 'bajo'
const nivelColor = (s: number) => s >= 0.68 ? '#c8a96e' : s >= 0.48 ? '#6e8c5e' : '#a09080'
const nivelBg    = (s: number) => s >= 0.68 ? '#fdf6e8' : s >= 0.48 ? '#eef4ec' : '#f4f0ec'

const descOcupacion = (p: number) =>
  p >= 85 ? 'Alta — prepare personal adicional' :
  p >= 65 ? 'Moderada — operación estable' :
  p >= 40 ? 'Baja — buena disponibilidad' : 'Muy baja — momento tranquilo'

const minArea = (scores: Record<string, number>): [string, number] =>
  Object.entries(scores).reduce((a, b) => b[1] < a[1] ? b : a)

const bold = (texto: string) => texto.split(/\*\*(.*?)\*\*/).map((p, i) =>
  i % 2 === 1
    ? <strong key={i} style={{ fontWeight: 600, color: '#14110d' }}>{p}</strong>
    : <span key={i}>{p}</span>
)

function generarRespuesta(id: string, d: InsightBubble): { texto: string; widget?: string } {
  const pct   = Math.round(d.occupancy_prediction * 100)
  const fac   = FACTOR[d.dominant_factor] ?? d.dominant_factor
  const [am, sm] = minArea(d.bubble_scores)
  const exp   = d.bubble_scores['experiencia'] ?? 0.5

  if (id === 'ocupacion')
    return { texto: `La ocupación prevista es del **${pct}%** — ${descOcupacion(pct).split(' — ')[1]}. El análisis considera el horario actual, reservas activas y actividad en cocina.`, widget: 'gauge' }

  if (id === 'factor')
    return { texto: `El factor que más impulsa el negocio hoy es **${fac}**. A continuación el estado de cada área:`, widget: 'areas' }

  if (id === 'recomendaciones')
    return { texto: `Basándome en el análisis actual, estas son las acciones prioritarias para el turno:`, widget: 'recomendaciones' }

  if (id === 'experiencia')
    return { texto: `La experiencia del cliente se encuentra en nivel **${nivelTexto(exp)}** (${Math.round(exp * 100)}%). ${exp < 0.42 ? 'Se detectan señales de alerta — revise tiempos de espera y cancelaciones.' : exp > 0.65 ? 'Los indicadores de satisfacción son positivos.' : 'Los indicadores están dentro de parámetros normales.'}`, widget: 'factor' }

  if (id === 'atencion')
    return { texto: `El área que requiere mayor atención es **${AREA[am]?.nombre ?? am}** (${Math.round(sm * 100)}%). ${sm < 0.35 ? 'Nivel bajo — revisión recomendada.' : 'Por debajo del promedio — monitorear de cerca.'}`, widget: 'areas' }

  return { texto: `Ocupación prevista **${pct}%** — ${descOcupacion(pct).split(' — ')[0]}. Factor principal: **${fac}**. Incertidumbre operativa: **±${Math.round(d.uncertainty * 100)}%**.`, widget: 'resumen' }
}

interface Msg {
  id: number
  rol: 'a' | 'u'
  texto: string
  widget?: string
  ts: Date
  visible?: boolean
}

const css = `
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes blink {
  0%, 80%, 100% { opacity: 0.15; transform: scale(0.8); }
  40%           { opacity: 1;    transform: scale(1); }
}
@keyframes barFill {
  from { width: 0%; }
}
@keyframes gaugeIn {
  from { stroke-dashoffset: var(--arco); }
}
.msg-in   { animation: fadeUp 0.35s cubic-bezier(.22,1,.36,1) both; }
.dot1     { animation: blink 1.2s 0.0s infinite; }
.dot2     { animation: blink 1.2s 0.2s infinite; }
.dot3     { animation: blink 1.2s 0.4s infinite; }
.bar-fill { animation: barFill 0.8s cubic-bezier(.22,1,.36,1) both; }
`

function Gauge({ d }: { d: InsightBubble }) {
  const pct   = Math.round(d.occupancy_prediction * 100)
  const r     = 48
  const circ  = 2 * Math.PI * r
  const arco  = circ * 0.68
  const off   = arco - arco * d.occupancy_prediction
  const col   = pct >= 75 ? '#c8a96e' : pct >= 48 ? '#6e8c5e' : '#a09080'

  return (
    <div style={{ display:'flex', alignItems:'center', gap:20, padding:'16px 20px', background:'#faf7f2', borderRadius:16, marginTop:10 }}>
      <svg width={118} height={82} viewBox="0 0 118 82" style={{ flexShrink:0 }}>
        <circle cx={59} cy={72} r={r} fill="none" stroke="#e8dcc8" strokeWidth={9}
          strokeDasharray={`${arco} ${circ}`} strokeLinecap="round" transform="rotate(162 59 72)" />
        <circle cx={59} cy={72} r={r} fill="none" stroke={col} strokeWidth={9}
          strokeDasharray={`${arco} ${circ}`} strokeDashoffset={off}
          strokeLinecap="round" transform="rotate(162 59 72)"
          style={{ transition:'stroke-dashoffset 1.1s cubic-bezier(.22,1,.36,1)' }} />
        <text x={59} y={68} textAnchor="middle" fontSize={22} fill="#14110d"
          fontFamily="'DM Serif Display', Georgia, serif" fontWeight="700">{pct}%</text>
        <text x={59} y={80} textAnchor="middle" fontSize={8} fill="#8a7e70"
          fontFamily="Poppins, sans-serif">ocupación prevista</text>
      </svg>
      <div>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background:col, flexShrink:0 }} />
          <span style={{ fontFamily:'Poppins,sans-serif', fontSize:13, fontWeight:600, color:'#14110d' }}>
            {descOcupacion(pct).split(' — ')[0]}
          </span>
        </div>
        <p style={{ fontFamily:'Poppins,sans-serif', fontSize:12, color:'#8a7e70', margin:0, lineHeight:1.5 }}>
          {descOcupacion(pct).split(' — ')[1]}
        </p>
        <p style={{ fontFamily:'Poppins,sans-serif', fontSize:11, color:'#b8ac9c', margin:'6px 0 0', letterSpacing:.2 }}>
          ±{Math.round(d.uncertainty * 100)}% incertidumbre
        </p>
      </div>
    </div>
  )
}

function Areas({ d }: { d: InsightBubble }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:10, padding:'16px 20px', background:'#faf7f2', borderRadius:16, marginTop:10 }}>
      {Object.entries(d.bubble_scores).map(([et, sc], idx) => {
        const m = AREA[et]
        const pct = Math.round(sc * 100)
        return (
          <div key={et} style={{ display:'flex', alignItems:'center', gap:12 }}>
            <span style={{ fontSize:15, width:22, flexShrink:0 }}>{m?.icono}</span>
            <div style={{ width:88, flexShrink:0 }}>
              <p style={{ margin:0, fontFamily:'Poppins,sans-serif', fontSize:11, fontWeight:600, color:'#14110d' }}>{m?.nombre}</p>
              <p style={{ margin:0, fontFamily:'Poppins,sans-serif', fontSize:10, color:'#a09080' }}>{m?.desc}</p>
            </div>
            <div style={{ flex:1, height:7, background:'#e8dcc8', borderRadius:99, overflow:'hidden' }}>
              <div className="bar-fill" style={{
                height:'100%', borderRadius:99,
                background:`linear-gradient(90deg, ${nivelColor(sc)}cc, ${nivelColor(sc)})`,
                width:`${pct}%`,
                animationDelay:`${idx * 80}ms`,
              }} />
            </div>
            <div style={{ width:52, flexShrink:0, textAlign:'right' }}>
              <span style={{ fontFamily:'Poppins,sans-serif', fontSize:11, fontWeight:700,
                color:nivelColor(sc), background:nivelBg(sc),
                padding:'2px 7px', borderRadius:99 }}>
                {nivelTexto(sc)}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function Factor({ d }: { d: InsightBubble }) {
  const top = Object.entries(d.shap_summary).slice(0, 4)
  const max = Math.max(...top.map(([,v]) => v), 0.01)
  return (
    <div style={{ padding:'16px 20px', background:'#faf7f2', borderRadius:16, marginTop:10 }}>
      <p style={{ margin:'0 0 12px', fontFamily:'Poppins,sans-serif', fontSize:11, color:'#a09080', letterSpacing:.3 }}>
        INDICADORES QUE MÁS INFLUYEN
      </p>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {top.map(([k, v], i) => (
          <div key={k} style={{ display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ fontFamily:'Poppins,sans-serif', fontSize:11, color:'#8a7e70', width:140, flexShrink:0 }}>
              {SHAP_NOMBRE[k] ?? k.replace(/_/g,' ')}
            </span>
            <div style={{ flex:1, height:5, background:'#e8dcc8', borderRadius:99, overflow:'hidden' }}>
              <div className="bar-fill" style={{
                height:'100%', borderRadius:99, background:'#fbd464',
                width:`${(v / max) * 100}%`, animationDelay:`${i * 60}ms`,
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Recomendaciones({ items }: { items: string[] }) {
  const cols = ['#c8a96e','#6e8c5e','#a09080']
  const labs = ['Alta','Media','Baja']
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:10 }}>
      {items.map((rec, i) => (
        <div key={i} style={{
          display:'flex', alignItems:'flex-start', gap:12,
          padding:'12px 16px', background:'#faf7f2', borderRadius:14,
          borderLeft:`3px solid ${cols[i] ?? '#a09080'}`,
        }}>
          <span style={{
            flexShrink:0, marginTop:1, fontFamily:'Poppins,sans-serif',
            fontSize:9, fontWeight:700, color:'white', letterSpacing:.5,
            background:cols[i] ?? '#a09080', padding:'2px 8px', borderRadius:99,
          }}>{labs[i] ?? 'Info'}</span>
          <p style={{ margin:0, fontFamily:'Poppins,sans-serif', fontSize:12, color:'#14110d', lineHeight:1.6 }}>{rec}</p>
        </div>
      ))}
    </div>
  )
}

function Typing() {
  const dot = { width:6, height:6, borderRadius:'50%', background:'#c8b89a', display:'inline-block' }
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, padding:'14px 18px',
      background:'white', borderRadius:20, borderTopLeftRadius:6,
      boxShadow:'0 1px 8px rgba(20,17,13,.06)', width:'fit-content' }}>
      <div className="dot1" style={dot} />
      <div className="dot2" style={dot} />
      <div className="dot3" style={dot} />
    </div>
  )
}

function MsgAsistente({ msg, d, isNew }: { msg: Msg; d: InsightBubble; isNew: boolean }) {
  return (
    <div className={isNew ? 'msg-in' : ''} style={{ display:'flex', alignItems:'flex-start', gap:10, maxWidth:'88%' }}>
      <div style={{
        width:28, height:28, borderRadius:'50%', background:'#14110d',
        display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:2,
      }}>
        <span style={{ fontSize:12, color:'#fbd464' }}>✦</span>
      </div>
      <div style={{ flex:1 }}>
        <div style={{
          background:'white', border:'1px solid rgba(20,17,13,.07)',
          borderRadius:20, borderTopLeftRadius:6, padding:'14px 18px',
          boxShadow:'0 1px 12px rgba(20,17,13,.06)',
        }}>
          <p style={{ margin:0, fontFamily:'Poppins,sans-serif', fontSize:13, color:'#14110d', lineHeight:1.65 }}>
            {bold(msg.texto)}
          </p>
          {msg.widget === 'gauge'          && <Gauge d={d} />}
          {msg.widget === 'areas'          && <Areas d={d} />}
          {msg.widget === 'factor'         && <Factor d={d} />}
          {msg.widget === 'recomendaciones'&& <Recomendaciones items={d.recommendations} />}
          {msg.widget === 'resumen'        && <><Gauge d={d} /><Areas d={d} /></>}
        </div>
        <p style={{ margin:'4px 0 0 4px', fontFamily:'Poppins,sans-serif', fontSize:10, color:'#b8ac9c' }}>
          {msg.ts.toLocaleTimeString('es-MX', { hour:'2-digit', minute:'2-digit' })}
        </p>
      </div>
    </div>
  )
}

function MsgUsuario({ msg, isNew }: { msg: Msg; isNew: boolean }) {
  return (
    <div className={isNew ? 'msg-in' : ''} style={{ display:'flex', justifyContent:'flex-end' }}>
      <div style={{ maxWidth:'72%' }}>
        <div style={{
          background:'#fbd464', borderRadius:20, borderTopRightRadius:6,
          padding:'12px 18px',
        }}>
          <p style={{ margin:0, fontFamily:'Poppins,sans-serif', fontSize:13, fontWeight:500, color:'#14110d' }}>
            {msg.texto}
          </p>
        </div>
        <p style={{ margin:'4px 4px 0 0', fontFamily:'Poppins,sans-serif', fontSize:10, color:'#b8ac9c', textAlign:'right' }}>
          {msg.ts.toLocaleTimeString('es-MX', { hour:'2-digit', minute:'2-digit' })}
        </p>
      </div>
    </div>
  )
}

export function Reportes() {
  const [insight, setInsight]   = useState<InsightBubble | null>(null)
  const [mensajes, setMensajes] = useState<Msg[]>([])
  const [cargando, setCargando] = useState(true)
  const [typing, setTyping]     = useState(false)
  const [usadas, setUsadas]     = useState<Set<string>>(new Set())
  const [newIds, setNewIds]     = useState<Set<number>>(new Set())
  const chatRef = useRef<HTMLDivElement>(null)
  const idRef   = useRef(0)

  const nextId = () => ++idRef.current

  const scroll = useCallback(() => {
    setTimeout(() => chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior:'smooth' }), 60)
  }, [])

  const push = useCallback((msg: Omit<Msg, 'id' | 'ts'>) => {
    const id = nextId()
    setMensajes(p => [...p, { ...msg, id, ts: new Date() }])
    setNewIds(p => new Set([...p, id]))
    setTimeout(() => setNewIds(p => { const n = new Set(p); n.delete(id); return n }), 600)
    scroll()
  }, [scroll])

  useEffect(() => {
    getBubbleInsight(RESTAURANT_ID)
      .then(data => {
        setInsight(data)
        const pct = Math.round(data.occupancy_prediction * 100)
        const fac = FACTOR[data.dominant_factor] ?? data.dominant_factor
        push({ rol:'a', texto:`Buenos días. La ocupación prevista para las próximas horas es del **${pct}%** — ${descOcupacion(pct).split(' — ')[0].toLowerCase()}. El factor principal hoy es **${fac}**. ¿Qué desea revisar?` })
      })
      .catch(() => push({ rol:'a', texto:'No se pudo obtener el análisis. Verifique la conexión con el servidor.' }))
      .finally(() => setCargando(false))
  }, [])

  const handlePregunta = useCallback((p: typeof PREGUNTAS[0]) => {
    if (!insight || typing) return
    push({ rol:'u', texto: p.texto })
    setUsadas(prev => new Set([...prev, p.id]))
    setTyping(true)
    scroll()
    setTimeout(() => {
      setTyping(false)
      const r = generarRespuesta(p.id, insight)
      push({ rol:'a', texto: r.texto, widget: r.widget })
    }, 900)
  }, [insight, typing, push, scroll])

  const reset = useCallback(() => {
    setUsadas(new Set())
    setMensajes([])
    setCargando(true)
    setTyping(false)
    getBubbleInsight(RESTAURANT_ID)
      .then(data => {
        setInsight(data)
        const pct = Math.round(data.occupancy_prediction * 100)
        push({ rol:'a', texto:`Análisis actualizado. Ocupación prevista: **${pct}%**. ¿Qué desea revisar?` })
      })
      .finally(() => setCargando(false))
  }, [push])

  const ahora = new Date()
  const fecha = ahora.toLocaleDateString('es-MX', { weekday:'long', day:'numeric', month:'long' })
  const disponibles = PREGUNTAS.filter(p => !usadas.has(p.id))

  return (
    <>
      <style>{css}</style>
      <div style={{ display:'flex', minHeight:'100vh', background:'#f7f3eb' }}>
        <NavLateral tabActiva="reportes" />

        <main style={{ flex:1, display:'flex', flexDirection:'column', height:'100vh', overflow:'hidden' }}>

          <div style={{
            padding:'20px 28px 16px', borderBottom:'1px solid rgba(20,17,13,.06)',
            background:'#f7f3eb', flexShrink:0,
          }}>
            <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
              <div>
                <p style={{ margin:0, fontFamily:'Poppins,sans-serif', fontSize:11, fontWeight:500, color:'#8a7e70', textTransform:'capitalize' }}>
                  {fecha}
                </p>
                <h1 style={{ margin:'2px 0 2px', fontFamily:"'DM Serif Display', Georgia, serif", fontSize:26, color:'#14110d', fontWeight:400 }}>
                  Centro Operativo
                </h1>
                <p style={{ margin:0, fontFamily:'Poppins,sans-serif', fontSize:12, color:'#8a7e70' }}>
                  Estado inteligente del negocio en tiempo real
                </p>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                {insight && (
                  <div style={{
                    display:'flex', alignItems:'center', gap:6,
                    background:'white', border:'1px solid rgba(20,17,13,.08)',
                    borderRadius:99, padding:'6px 12px',
                  }}>
                    <div style={{ width:6, height:6, borderRadius:'50%', background:'#6e8c5e',
                      boxShadow:'0 0 0 3px rgba(110,140,94,.2)', animation:'blink 2s infinite' }} />
                    <span style={{ fontFamily:'Poppins,sans-serif', fontSize:11, color:'#14110d' }}>En vivo</span>
                  </div>
                )}
                <button
                  onClick={reset}
                  style={{
                    background:'white', border:'1px solid rgba(20,17,13,.10)',
                    borderRadius:99, padding:'7px 16px', cursor:'pointer',
                    fontFamily:'Poppins,sans-serif', fontSize:12, fontWeight:600, color:'#14110d',
                    transition:'all .15s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background='#f2ede2')}
                  onMouseLeave={e => (e.currentTarget.style.background='white')}
                >
                  ↻ Actualizar
                </button>
              </div>
            </div>
          </div>

          <div ref={chatRef} style={{
            flex:1, overflowY:'auto', padding:'24px 28px',
            display:'flex', flexDirection:'column', gap:16,
            scrollbarWidth:'thin', scrollbarColor:'#e8dcc8 transparent',
          }}>
            {cargando && mensajes.length === 0 && (
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:28, height:28, borderRadius:'50%', background:'#e8dcc8', animation:'blink 1.5s infinite' }} />
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <div style={{ width:220, height:12, background:'#e8dcc8', borderRadius:99, animation:'blink 1.5s 0.1s infinite' }} />
                  <div style={{ width:160, height:12, background:'#e8dcc8', borderRadius:99, animation:'blink 1.5s 0.2s infinite' }} />
                </div>
              </div>
            )}

            {mensajes.map(msg =>
              msg.rol === 'a' && insight
                ? <MsgAsistente key={msg.id} msg={msg} d={insight} isNew={newIds.has(msg.id)} />
                : msg.rol === 'u'
                ? <MsgUsuario key={msg.id} msg={msg} isNew={newIds.has(msg.id)} />
                : null
            )}

            {typing && (
              <div style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                <div style={{ width:28, height:28, borderRadius:'50%', background:'#14110d',
                  display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span style={{ fontSize:12, color:'#fbd464' }}>✦</span>
                </div>
                <Typing />
              </div>
            )}
          </div>

          {!cargando && insight && (
            <div style={{
              padding:'16px 28px 20px', borderTop:'1px solid rgba(20,17,13,.06)',
              background:'#f7f3eb', flexShrink:0,
            }}>
              {disponibles.length > 0 ? (
                <>
                  <p style={{ margin:'0 0 10px', fontFamily:'Poppins,sans-serif', fontSize:11, color:'#b8ac9c', letterSpacing:.3 }}>
                    PREGUNTAS FRECUENTES
                  </p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                    {disponibles.map(p => (
                      <button
                        key={p.id}
                        onClick={() => handlePregunta(p)}
                        disabled={typing}
                        style={{
                          background:'white', border:'1px solid rgba(20,17,13,.10)',
                          borderRadius:99, padding:'8px 16px', cursor:typing ? 'not-allowed' : 'pointer',
                          fontFamily:'Poppins,sans-serif', fontSize:12, color:'#14110d',
                          opacity: typing ? 0.45 : 1,
                          transition:'all .15s ease',
                          boxShadow:'0 1px 3px rgba(20,17,13,.04)',
                        }}
                        onMouseEnter={e => { if (!typing) { e.currentTarget.style.background='#fbd464'; e.currentTarget.style.borderColor='#fbd464' } }}
                        onMouseLeave={e => { e.currentTarget.style.background='white'; e.currentTarget.style.borderColor='rgba(20,17,13,.10)' }}
                      >
                        {p.texto}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <p style={{ margin:0, fontFamily:'Poppins,sans-serif', fontSize:12, color:'#8a7e70' }}>
                    Ha revisado todas las áreas del negocio.
                  </p>
                  <button
                    onClick={reset}
                    style={{
                      background:'#fbd464', border:'none', borderRadius:99,
                      padding:'8px 20px', cursor:'pointer',
                      fontFamily:'Poppins,sans-serif', fontSize:12, fontWeight:600, color:'#14110d',
                      transition:'opacity .15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity='.85')}
                    onMouseLeave={e => (e.currentTarget.style.opacity='1')}
                  >
                    Nueva consulta
                  </button>
                </div>
              )}
              <div style={{ display:'flex', justifyContent:'center', marginTop:14 }}>
                <span style={{ fontFamily:'Poppins,sans-serif', fontSize:10, color:'rgba(138,126,112,.45)', letterSpacing:.4 }}>
                  Bubble Intelligence · 5 modelos · MetaCollapser
                </span>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  )
}