export type EstadoMesa = 'libre' | 'ocupada' | 'reservada'

export type EstadoReserva = 'confirmada' | 'pendiente' | 'sentada'

export type TabNavegacion = 'buscar' | 'reservas' | 'cuenta'

export type TabNavLateral = 'hoy' | 'mesas' | 'reservas' | 'menu' | 'equipo' | 'reportes'

export type CategoriaRestaurante = 'Mexicana' | 'Mariscos & Carnes' | 'Internacional' | 'Vegetal & Café'

export interface Restaurante {
  id: string
  nombre: string
  tipo: string
  categoria: CategoriaRestaurante
  ubicacion: string
  precio: string
  calificacion: number
  porcentajeOcupacion: number
  etiquetaOcupacion: string
}

export interface ItemMenu {
  id: string
  nombre: string
  descripcion: string
  precio: number
}

export interface RestauranteDetalle extends Restaurante {
  etiquetas: string[]
  horario: string
  direccion: string
  totalReseñas: number
  reservasHoy: number
  itemsMenu: ItemMenu[]
}

export interface Mesa {
  id: number
  estado: EstadoMesa
  personas?: number
}

export interface Reservacion {
  id: string
  restaurante: string
  tipo: string
  fecha: string
  hora: string
  personas: number
  mesa: string
  estado: EstadoReserva
}

export interface ReservaEnFila {
  id: string
  hora: string
  nombre: string
  estado: EstadoReserva
  personas: number
  mesa?: string
}
