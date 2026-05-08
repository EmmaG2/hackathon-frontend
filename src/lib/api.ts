import type { Restaurante, RestauranteDetalle } from '@/types'
import { obtenerAccessToken } from '@/services/autenticacion'

const BACKEND_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api/v1'

const RESTAURANTES: Restaurante[] = [
  {
    id: 'casa-paloma',
    nombre: 'Casa Paloma',
    tipo: 'MEXICANA CONTEMPORÁNEA',
    categoria: 'Mexicana',
    ubicacion: 'Roma Norte',
    precio: '$$$',
    calificacion: 4.8,
    porcentajeOcupacion: 70,
    etiquetaOcupacion: '70% · Ocupado',
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'noma-blanca',
    nombre: 'Noma Blanca',
    tipo: 'NÓRDICA FUSIÓN',
    categoria: 'Internacional',
    ubicacion: 'Condesa',
    precio: '$$',
    calificacion: 4.6,
    porcentajeOcupacion: 40,
    etiquetaOcupacion: '40% · Disponible',
    img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'el-tianguis',
    nombre: 'El Tianguis',
    tipo: 'MEXICANA TRADICIONAL',
    categoria: 'Mexicana',
    ubicacion: 'Coyoacán',
    precio: '$',
    calificacion: 4.4,
    porcentajeOcupacion: 95,
    etiquetaOcupacion: '95% · Lleno',
    img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'la-lena',
    nombre: 'La Leña',
    tipo: 'CARNES A LA BRASA',
    categoria: 'Mariscos & Carnes',
    ubicacion: 'Polanco',
    precio: '$$$',
    calificacion: 4.7,
    porcentajeOcupacion: 60,
    etiquetaOcupacion: '60% · Ocupado',
    img: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'humo-y-brasa',
    nombre: 'Humo & Brasa',
    tipo: 'BBQ CONTEMPORÁNEO',
    categoria: 'Mariscos & Carnes',
    ubicacion: 'Santa Fe',
    precio: '$$',
    calificacion: 4.3,
    porcentajeOcupacion: 30,
    etiquetaOcupacion: '30% · Disponible',
    img: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'mariscos-don-pedro',
    nombre: 'Mariscos Don Pedro',
    tipo: 'MARISCOS',
    categoria: 'Mariscos & Carnes',
    ubicacion: 'Tepito',
    precio: '$$',
    calificacion: 4.5,
    porcentajeOcupacion: 80,
    etiquetaOcupacion: '80% · Ocupado',
    img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'el-jardin-verde',
    nombre: 'El Jardín Verde',
    tipo: 'VEGETARIANA',
    categoria: 'Vegetal & Café',
    ubicacion: 'Xochimilco',
    precio: '$',
    calificacion: 4.2,
    porcentajeOcupacion: 20,
    etiquetaOcupacion: '20% · Disponible',
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'la-vina',
    nombre: 'La Viña',
    tipo: 'ITALIANA · VINOS',
    categoria: 'Internacional',
    ubicacion: 'Lomas de Chapultepec',
    precio: '$$$',
    calificacion: 4.9,
    porcentajeOcupacion: 55,
    etiquetaOcupacion: '55% · Ocupado',
    img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'tacos-el-rey',
    nombre: 'Tacos El Rey',
    tipo: 'MEXICANA CALLEJERA',
    categoria: 'Mexicana',
    ubicacion: 'Doctores',
    precio: '$',
    calificacion: 4.1,
    porcentajeOcupacion: 90,
    etiquetaOcupacion: '90% · Lleno',
    img: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'sazon-de-abuela',
    nombre: 'Sazón de Abuela',
    tipo: 'MEXICANA TRADICIONAL',
    categoria: 'Mexicana',
    ubicacion: 'Tlalpan',
    precio: '$',
    calificacion: 4.6,
    porcentajeOcupacion: 50,
    etiquetaOcupacion: '50% · Ocupado',
    img: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'el-rincon-japones',
    nombre: 'El Rincón Japonés',
    tipo: 'JAPONESA FUSIÓN',
    categoria: 'Internacional',
    ubicacion: 'Napoles',
    precio: '$$',
    calificacion: 4.7,
    porcentajeOcupacion: 65,
    etiquetaOcupacion: '65% · Ocupado',
    img: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'xocolatl',
    nombre: 'Xocolatl Café',
    tipo: 'CAFÉ · POSTRES',
    categoria: 'Vegetal & Café',
    ubicacion: 'Coyoacán',
    precio: '$',
    calificacion: 4.4,
    porcentajeOcupacion: 10,
    etiquetaOcupacion: '10% · Disponible',
    img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop',
  },
  // Mexicana
  {
    id: 'fonda-la-esperanza',
    nombre: 'Fonda La Esperanza',
    tipo: 'MEXICANA TRADICIONAL',
    categoria: 'Mexicana',
    ubicacion: 'Pedregal',
    precio: '$',
    calificacion: 4.5,
    porcentajeOcupacion: 60,
    etiquetaOcupacion: '60% · Ocupado',
    img: 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'birria-los-compadres',
    nombre: 'Birria Los Compadres',
    tipo: 'MEXICANA CALLEJERA',
    categoria: 'Mexicana',
    ubicacion: 'Tepito',
    precio: '$',
    calificacion: 4.3,
    porcentajeOcupacion: 85,
    etiquetaOcupacion: '85% · Ocupado',
    img: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'el-molcajete',
    nombre: 'El Molcajete',
    tipo: 'MEXICANA CONTEMPORÁNEA',
    categoria: 'Mexicana',
    ubicacion: 'Polanco',
    precio: '$$$',
    calificacion: 4.6,
    porcentajeOcupacion: 45,
    etiquetaOcupacion: '45% · Disponible',
    img: 'https://images.unsplash.com/photo-1625938140705-0013eda3c92e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'tortilleria-sofia',
    nombre: 'Tortillería Sofía',
    tipo: 'MEXICANA CONTEMPORÁNEA',
    categoria: 'Mexicana',
    ubicacion: 'Juárez',
    precio: '$$',
    calificacion: 4.7,
    porcentajeOcupacion: 75,
    etiquetaOcupacion: '75% · Ocupado',
    img: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=800&auto=format&fit=crop',
  },
  // Mariscos & Carnes
  {
    id: 'la-ostioneria',
    nombre: 'La Ostionería',
    tipo: 'MARISCOS',
    categoria: 'Mariscos & Carnes',
    ubicacion: 'Coyoacán',
    precio: '$$',
    calificacion: 4.4,
    porcentajeOcupacion: 55,
    etiquetaOcupacion: '55% · Ocupado',
    img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'parrilla-don-roque',
    nombre: 'Parrilla Don Roque',
    tipo: 'CARNES A LA BRASA',
    categoria: 'Mariscos & Carnes',
    ubicacion: 'Xochimilco',
    precio: '$$',
    calificacion: 4.2,
    porcentajeOcupacion: 35,
    etiquetaOcupacion: '35% · Disponible',
    img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'el-pulpo-feliz',
    nombre: 'El Pulpo Feliz',
    tipo: 'MARISCOS',
    categoria: 'Mariscos & Carnes',
    ubicacion: 'Iztapalapa',
    precio: '$',
    calificacion: 4.0,
    porcentajeOcupacion: 70,
    etiquetaOcupacion: '70% · Ocupado',
    img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'asador-del-norte',
    nombre: 'Asador del Norte',
    tipo: 'BBQ CONTEMPORÁNEO',
    categoria: 'Mariscos & Carnes',
    ubicacion: 'Lindavista',
    precio: '$$',
    calificacion: 4.5,
    porcentajeOcupacion: 50,
    etiquetaOcupacion: '50% · Ocupado',
    img: 'https://images.unsplash.com/photo-1432139555190-58521daec20b?q=80&w=800&auto=format&fit=crop',
  },
  // Internacional
  {
    id: 'bao-bangkok',
    nombre: 'Bao Bangkok',
    tipo: 'THAI FUSIÓN',
    categoria: 'Internacional',
    ubicacion: 'Roma Sur',
    precio: '$$',
    calificacion: 4.5,
    porcentajeOcupacion: 60,
    etiquetaOcupacion: '60% · Ocupado',
    img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'cafe-de-paris',
    nombre: 'Café de París',
    tipo: 'FRANCESA',
    categoria: 'Internacional',
    ubicacion: 'Polanco',
    precio: '$$$',
    calificacion: 4.8,
    porcentajeOcupacion: 40,
    etiquetaOcupacion: '40% · Disponible',
    img: 'https://images.unsplash.com/photo-1550966841-3ee7adac1ad4?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'la-trattoria',
    nombre: 'La Trattoria',
    tipo: 'ITALIANA',
    categoria: 'Internacional',
    ubicacion: 'Condesa',
    precio: '$$',
    calificacion: 4.6,
    porcentajeOcupacion: 80,
    etiquetaOcupacion: '80% · Ocupado',
    img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'seoul-kitchen',
    nombre: 'Seoul Kitchen',
    tipo: 'COREANA',
    categoria: 'Internacional',
    ubicacion: 'Narvarte',
    precio: '$$',
    calificacion: 4.4,
    porcentajeOcupacion: 65,
    etiquetaOcupacion: '65% · Ocupado',
    img: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=800&auto=format&fit=crop',
  },
  // Vegetal & Café
  {
    id: 'roots-cafe',
    nombre: 'Roots Café',
    tipo: 'VEGANA',
    categoria: 'Vegetal & Café',
    ubicacion: 'Condesa',
    precio: '$$',
    calificacion: 4.3,
    porcentajeOcupacion: 30,
    etiquetaOcupacion: '30% · Disponible',
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'terra-verde',
    nombre: 'Terra Verde',
    tipo: 'VEGETARIANA',
    categoria: 'Vegetal & Café',
    ubicacion: 'Del Valle',
    precio: '$',
    calificacion: 4.1,
    porcentajeOcupacion: 25,
    etiquetaOcupacion: '25% · Disponible',
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'cafe-bohemio',
    nombre: 'El Café Bohemio',
    tipo: 'CAFÉ · REPOSTERÍA',
    categoria: 'Vegetal & Café',
    ubicacion: 'Roma Norte',
    precio: '$',
    calificacion: 4.5,
    porcentajeOcupacion: 15,
    etiquetaOcupacion: '15% · Disponible',
    img: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=800&auto=format&fit=crop',
  },
]

type ExtraDetalle = Omit<RestauranteDetalle, keyof Restaurante>

const G_MX = [
  'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1585238342024-78d387f4a707?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=600&auto=format&fit=crop',
]
const G_CARNES = [
  'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600&auto=format&fit=crop',
]
const G_MARISCOS = [
  'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=600&auto=format&fit=crop',
]
const G_INTL = [
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?q=80&w=600&auto=format&fit=crop',
]
const G_VEGETAL = [
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=600&auto=format&fit=crop',
]

const DETALLES: Record<string, ExtraDetalle> = {
  'casa-paloma': {
    etiquetas: ['Mezcal', 'Terraza', 'Sin gluten'],
    horario: 'Mar–Dom · 13:00–23:30',
    direccion: 'Colima 142, Roma Nte.',
    totalReseñas: 412,
    reservasHoy: 8,
    galeria: G_MX,
    itemsMenu: [
      { id: '1', nombre: 'Mole de Xico (pato)', descripcion: 'Pato confitado, mole de Xico, plátano macho', precio: 425 },
      { id: '2', nombre: 'Pesca del día', descripcion: 'Robalo a las brasas, hoja santa, salsa de morita', precio: 390 },
      { id: '3', nombre: 'Costilla 18hs', descripcion: 'Costilla braseada, puré de elote, escabeche', precio: 410 },
    ],
  },
  'noma-blanca': {
    etiquetas: ['Vinos naturales', 'Sin lactosa', 'Reserva recomendada'],
    horario: 'Mié–Dom · 14:00–22:00',
    direccion: 'Tamaulipas 88, Condesa',
    totalReseñas: 238,
    reservasHoy: 5,
    galeria: G_INTL,
    itemsMenu: [
      { id: '1', nombre: 'Tartar de res nórdico', descripcion: 'Res wagyu, alcaparras, mostaza antigua, pan de centeno', precio: 380 },
      { id: '2', nombre: 'Salmón ahumado en casa', descripcion: 'Salmón atlántico, crema de eneldo, pepinos encurtidos', precio: 350 },
      { id: '3', nombre: 'Remolacha asada', descripcion: 'Betabel a las brasas, queso de cabra, nuez, miel de abeja', precio: 220 },
    ],
  },
  'el-tianguis': {
    etiquetas: ['Mercado', 'Tradicional', 'Familiar'],
    horario: 'Lun–Dom · 08:00–18:00',
    direccion: 'Mercado de Coyoacán, Local 14',
    totalReseñas: 891,
    reservasHoy: 12,
    galeria: G_MX,
    itemsMenu: [
      { id: '1', nombre: 'Enchiladas verdes', descripcion: 'Pollo deshebrado, salsa verde, crema, queso Oaxaca', precio: 120 },
      { id: '2', nombre: 'Pozole rojo', descripcion: 'Caldo de maíz cacahuazintle, puerco, tostadas, orégano', precio: 110 },
      { id: '3', nombre: 'Tamales oaxaqueños', descripcion: 'Masa de maíz, mole negro, pollo, hoja de plátano', precio: 85 },
    ],
  },
  'la-lena': {
    etiquetas: ['Parrilla', 'Carnes premium', 'Vinos'],
    horario: 'Mar–Dom · 13:00–23:00',
    direccion: 'Presidente Masaryk 187, Polanco',
    totalReseñas: 315,
    reservasHoy: 9,
    galeria: G_CARNES,
    itemsMenu: [
      { id: '1', nombre: 'Rib Eye 400g', descripcion: 'Rib eye dry aged, sal de mar, chimichurri de la casa', precio: 890 },
      { id: '2', nombre: 'Entraña argentina', descripcion: 'Entraña a las brasas, papas rústicas, ensalada criolla', precio: 520 },
      { id: '3', nombre: 'Costillar de cerdo', descripcion: 'Baby back ribs 12hs, BBQ casero, coleslaw', precio: 480 },
    ],
  },
  'humo-y-brasa': {
    etiquetas: ['BBQ', 'Cerveza artesanal', 'Terraza'],
    horario: 'Jue–Dom · 13:00–21:00',
    direccion: 'Vasco de Quiroga 3200, Santa Fe',
    totalReseñas: 178,
    reservasHoy: 4,
    galeria: G_CARNES,
    itemsMenu: [
      { id: '1', nombre: 'Brisket ahumado', descripcion: 'Pecho de res 16hs de humo, col agria, pan brioche', precio: 320 },
      { id: '2', nombre: 'Pulled pork', descripcion: 'Pierna de cerdo desmenuzada, salsa carolina, pickles', precio: 280 },
      { id: '3', nombre: 'Alitas BBQ', descripcion: 'Alitas con salsa chipotle-miel, aderezo ranch', precio: 195 },
    ],
  },
  'mariscos-don-pedro': {
    etiquetas: ['Fresco diario', 'Ceviche', 'Ambiente casual'],
    horario: 'Lun–Dom · 10:00–19:00',
    direccion: 'Jesús Carranza 57, Tepito',
    totalReseñas: 654,
    reservasHoy: 14,
    galeria: G_MARISCOS,
    itemsMenu: [
      { id: '1', nombre: 'Ceviche tostada', descripcion: 'Pescado blanco, limón, cebolla morada, chile serrano, aguacate', precio: 95 },
      { id: '2', nombre: 'Camarones al ajillo', descripcion: 'Camarones jumbo, mantequilla, ajo, vino blanco, arroz', precio: 280 },
      { id: '3', nombre: 'Caldo de camarón', descripcion: 'Caldo concentrado, camarones enteros, verduras, limón', precio: 160 },
    ],
  },
  'el-jardin-verde': {
    etiquetas: ['100% vegano', 'Orgánico', 'Sin gluten'],
    horario: 'Mar–Dom · 09:00–20:00',
    direccion: 'Miramontes 204, Xochimilco',
    totalReseñas: 203,
    reservasHoy: 3,
    galeria: G_VEGETAL,
    itemsMenu: [
      { id: '1', nombre: 'Bowl de quinoa', descripcion: 'Quinoa, garbanzos, aguacate, betabel, aderezo tahini', precio: 165 },
      { id: '2', nombre: 'Taco de coliflor', descripcion: 'Coliflor rostizada, salsa de chile ancho, col morada', precio: 85 },
      { id: '3', nombre: 'Hamburguesa de lentejas', descripcion: 'Hamburguesa de lentejas y quinoa, pan integral, papas horneadas', precio: 195 },
    ],
  },
  'la-vina': {
    etiquetas: ['Sommelier', 'Pasta fresca', 'Vista al lago'],
    horario: 'Mar–Dom · 13:30–23:00',
    direccion: 'Prado Norte 324, Lomas de Chapultepec',
    totalReseñas: 521,
    reservasHoy: 11,
    galeria: G_INTL,
    itemsMenu: [
      { id: '1', nombre: 'Tagliatelle al tartufo', descripcion: 'Pasta fresca, trufa negra, parmesano 24 meses, mantequilla', precio: 620 },
      { id: '2', nombre: 'Risotto ai funghi', descripcion: 'Arroz arborio, mix de hongos silvestres, vino blanco, parmesano', precio: 480 },
      { id: '3', nombre: 'Ossobuco milanese', descripcion: 'Chamorro de ternera, gremolata, risotto azafrán', precio: 750 },
    ],
  },
  'tacos-el-rey': {
    etiquetas: ['Carnitas', 'Barbacoa', 'Birria'],
    horario: 'Lun–Dom · 07:00–16:00',
    direccion: 'Fray Servando Teresa 210, Doctores',
    totalReseñas: 1204,
    reservasHoy: 20,
    galeria: G_MX,
    itemsMenu: [
      { id: '1', nombre: 'Taco de barbacoa', descripcion: 'Barbacoa de res, cebolla, cilantro, salsa verde o roja', precio: 35 },
      { id: '2', nombre: 'Taco de carnitas', descripcion: 'Carnitas de cerdo, guacamole, pico de gallo', precio: 30 },
      { id: '3', nombre: 'Consomé de birria', descripcion: 'Caldo de birria, garbanzos, arroz rojo', precio: 80 },
    ],
  },
  'sazon-de-abuela': {
    etiquetas: ['Casero', 'Antojitos', 'Comida corrida'],
    horario: 'Lun–Sáb · 08:00–17:00',
    direccion: 'San Fernando 31, Tlalpan',
    totalReseñas: 438,
    reservasHoy: 7,
    galeria: G_MX,
    itemsMenu: [
      { id: '1', nombre: 'Chiles en nogada', descripcion: 'Chile poblano, picadillo de carne y frutas, nogada, granada', precio: 195 },
      { id: '2', nombre: 'Mole poblano', descripcion: 'Pollo en mole negro, arroz rojo, frijoles de olla', precio: 145 },
      { id: '3', nombre: 'Sopa de lima', descripcion: 'Caldo de pollo, lima, tortilla frita, aguacate', precio: 95 },
    ],
  },
  'el-rincon-japones': {
    etiquetas: ['Ramen', 'Sushi', 'Sake'],
    horario: 'Mar–Dom · 13:00–22:30',
    direccion: 'Insurgentes Sur 543, Napoles',
    totalReseñas: 367,
    reservasHoy: 6,
    galeria: G_INTL,
    itemsMenu: [
      { id: '1', nombre: 'Ramen tonkotsu', descripcion: 'Caldo de cerdo 18hs, chashu, huevo marinado, nori, bambú', precio: 245 },
      { id: '2', nombre: 'Sushi roll dragon', descripcion: 'Salmón, aguacate, pepino, cubierta de salmón flameado', precio: 320 },
      { id: '3', nombre: 'Gyozas de camarón', descripcion: 'Gyozas fritas, camarón y jengibre, salsa ponzu', precio: 165 },
    ],
  },
  'xocolatl': {
    etiquetas: ['Café de especialidad', 'Postres artesanales', 'Desayuno'],
    horario: 'Lun–Dom · 08:00–21:00',
    direccion: 'Francisco Sosa 12, Coyoacán',
    totalReseñas: 289,
    reservasHoy: 2,
    galeria: G_VEGETAL,
    itemsMenu: [
      { id: '1', nombre: 'Pastel de chocolate Oaxaca', descripcion: 'Cacao 72% Oaxaca, ganache, helado de vainilla', precio: 125 },
      { id: '2', nombre: 'Waffle de elote', descripcion: 'Waffle de masa de elote, crema de queso, miel de piloncillo', precio: 135 },
      { id: '3', nombre: 'Café de olla frío', descripcion: 'Café de olla con canela y piloncillo, servido frío', precio: 75 },
    ],
  },
  'fonda-la-esperanza': {
    etiquetas: ['Comida corrida', 'Familiar', 'Sin gluten'],
    horario: 'Lun–Sáb · 08:00–17:00',
    direccion: 'Av. San Jerónimo 203, Pedregal',
    totalReseñas: 312,
    reservasHoy: 6,
    galeria: G_MX,
    itemsMenu: [
      { id: '1', nombre: 'Caldo tlalpeño', descripcion: 'Caldo de pollo, epazote, chile chipotle, garbanzo', precio: 90 },
      { id: '2', nombre: 'Pollo en pipián', descripcion: 'Pollo en salsa de pepita verde, arroz, frijoles', precio: 145 },
      { id: '3', nombre: 'Quesadillas de flor de calabaza', descripcion: 'Quesadillas fritas, flor de calabaza, epazote, queso', precio: 80 },
    ],
  },
  'birria-los-compadres': {
    etiquetas: ['Birria', 'Tacos dorados', 'Madrugada'],
    horario: 'Vie–Dom · 06:00–14:00',
    direccion: 'Ferrocarril de Cintura 88, Tepito',
    totalReseñas: 748,
    reservasHoy: 18,
    galeria: G_MX,
    itemsMenu: [
      { id: '1', nombre: 'Taco de birria', descripcion: 'Taco dorado de res, consomé, cebolla, cilantro, limón', precio: 45 },
      { id: '2', nombre: 'Birria de chivo', descripcion: 'Guisado de chivo en adobo, tortillas de maíz, consomé', precio: 160 },
      { id: '3', nombre: 'Mulita de birria', descripcion: 'Tortilla doble, queso Oaxaca fundido, birria', precio: 60 },
    ],
  },
  'el-molcajete': {
    etiquetas: ['Mezcal', 'Alta cocina', 'Degustación'],
    horario: 'Mar–Dom · 14:00–23:00',
    direccion: 'Campos Elíseos 290, Polanco',
    totalReseñas: 198,
    reservasHoy: 7,
    galeria: G_MX,
    itemsMenu: [
      { id: '1', nombre: 'Sopa de flor de calabaza', descripcion: 'Crema de flor de calabaza, aceite de epazote, chile poblano', precio: 180 },
      { id: '2', nombre: 'Codillo en salsa de chile negro', descripcion: 'Codillo braseado, chile pasilla negro, purée de papa con mantequilla', precio: 420 },
      { id: '3', nombre: 'Ceviche de nopal', descripcion: 'Nopal tierno, jitomate, cebolla morada, limón, aguacate', precio: 210 },
    ],
  },
  'tortilleria-sofia': {
    etiquetas: ['Tortillas artesanales', 'Maíz heirloom', 'Sin reserva'],
    horario: 'Lun–Sáb · 12:00–22:00',
    direccion: 'Marsella 46, Juárez',
    totalReseñas: 431,
    reservasHoy: 10,
    galeria: G_MX,
    itemsMenu: [
      { id: '1', nombre: 'Taco de frijoles con queso', descripcion: 'Frijoles negros, queso Oaxaca, salsa roja tatemada, tortilla azul', precio: 65 },
      { id: '2', nombre: 'Enfrijoladas', descripcion: 'Tortillas bañadas en frijol negro, crema, queso fresco', precio: 130 },
      { id: '3', nombre: 'Tlayuda mixta', descripcion: 'Tortilla grande, asiento, frijoles negros, quesillo, tasajo, chorizo', precio: 220 },
    ],
  },
  'la-ostioneria': {
    etiquetas: ['Ostiones frescos', 'Cerveza fría', 'Ambiente casual'],
    horario: 'Lun–Dom · 11:00–19:00',
    direccion: 'Hidalgo 77, Coyoacán',
    totalReseñas: 276,
    reservasHoy: 8,
    galeria: G_MARISCOS,
    itemsMenu: [
      { id: '1', nombre: 'Media docena de ostiones', descripcion: 'Ostiones frescos, limón, salsa valentina, cebolla', precio: 135 },
      { id: '2', nombre: 'Cóctel de camarón', descripcion: 'Camarones medianos, jitomate, limón, cebolla, aguacate', precio: 145 },
      { id: '3', nombre: 'Tostada de atún', descripcion: 'Atún fresco marinado, mayonesa de chipotle, pepino, soya', precio: 85 },
    ],
  },
  'parrilla-don-roque': {
    etiquetas: ['Parrilla tradicional', 'Familiar', 'Jardín'],
    horario: 'Jue–Dom · 12:00–20:00',
    direccion: 'Guadalupe I. Ramírez 15, Xochimilco',
    totalReseñas: 189,
    reservasHoy: 5,
    galeria: G_CARNES,
    itemsMenu: [
      { id: '1', nombre: 'Arrachera marinada', descripcion: 'Arrachera, guacamole, frijoles charros, tortillas', precio: 285 },
      { id: '2', nombre: 'Costilla de res', descripcion: 'Costilla short rib, ensalada de nopal, salsa borracha', precio: 340 },
      { id: '3', nombre: 'Alambre de res', descripcion: 'Res, tocino, pimientos, cebolla, queso gratinado', precio: 195 },
    ],
  },
  'el-pulpo-feliz': {
    etiquetas: ['Mariscos frescos', 'Caldo sabroso', 'Precio justo'],
    horario: 'Lun–Dom · 09:00–18:00',
    direccion: 'Ermita Iztapalapa 540, Iztapalapa',
    totalReseñas: 522,
    reservasHoy: 11,
    galeria: G_MARISCOS,
    itemsMenu: [
      { id: '1', nombre: 'Pulpo a las brasas', descripcion: 'Pulpo entero, aceite de olivo, páprika ahumada, limón', precio: 320 },
      { id: '2', nombre: 'Caldo de mariscos', descripcion: 'Pulpo, camarón, jaiba, pescado, caldo concentrado', precio: 195 },
      { id: '3', nombre: 'Tostada de pulpo', descripcion: 'Pulpo encebollado, aguacate, chile de árbol, limón', precio: 95 },
    ],
  },
  'asador-del-norte': {
    etiquetas: ['Cortes norteños', 'Parrilla de leña', 'Domingos familiares'],
    horario: 'Mié–Dom · 13:00–21:00',
    direccion: 'Montevideo 238, Lindavista',
    totalReseñas: 264,
    reservasHoy: 9,
    galeria: G_CARNES,
    itemsMenu: [
      { id: '1', nombre: 'T-Bone 500g', descripcion: 'T-bone norteño, sal de Colima, chile serrano asado', precio: 650 },
      { id: '2', nombre: 'Machaca con huevo', descripcion: 'Machaca de res deshebrada, huevo, chile verde, tortillas', precio: 185 },
      { id: '3', nombre: 'Discada norteña', descripcion: 'Res, puerco, chorizo, tocino, vegetales, tortillas de harina', precio: 270 },
    ],
  },
  'bao-bangkok': {
    etiquetas: ['Thai', 'Curry', 'Vegetariano amigable'],
    horario: 'Mar–Dom · 13:00–22:00',
    direccion: 'Orizaba 42, Roma Sur',
    totalReseñas: 203,
    reservasHoy: 5,
    galeria: G_INTL,
    itemsMenu: [
      { id: '1', nombre: 'Pad Thai de camarón', descripcion: 'Fideos de arroz, camarón, cacahuate, brotes, salsa de tamarindo', precio: 230 },
      { id: '2', nombre: 'Green curry', descripcion: 'Curry verde, leche de coco, verduras, pollo, arroz jazmín', precio: 210 },
      { id: '3', nombre: 'Bao de puerco', descripcion: 'Bao al vapor, puerco caramelizado, pepino, cilantro, hoisin', precio: 130 },
    ],
  },
  'cafe-de-paris': {
    etiquetas: ['Vinos franceses', 'Terraza', 'Dress code'],
    horario: 'Mar–Dom · 13:30–23:30',
    direccion: 'Emilio Castelar 149, Polanco',
    totalReseñas: 387,
    reservasHoy: 12,
    galeria: G_INTL,
    itemsMenu: [
      { id: '1', nombre: 'Soupe à l\'oignon', descripcion: 'Sopa de cebolla gratinada, pan brioche, queso gruyère', precio: 195 },
      { id: '2', nombre: 'Confit de canard', descripcion: 'Pato confitado, lentejas verdes, salsa de vino tinto', precio: 580 },
      { id: '3', nombre: 'Crème brûlée', descripcion: 'Crema de vainilla de Madagascar, costra de caramelo', precio: 145 },
    ],
  },
  'la-trattoria': {
    etiquetas: ['Pasta fresca', 'Vinos italianos', 'Romántico'],
    horario: 'Mar–Dom · 13:00–23:00',
    direccion: 'Tamaulipas 202, Condesa',
    totalReseñas: 451,
    reservasHoy: 13,
    galeria: G_INTL,
    itemsMenu: [
      { id: '1', nombre: 'Bruschetta pomodoro', descripcion: 'Pan artesanal, jitomate roma, albahaca, ajo, aceite de olivo extra virgen', precio: 115 },
      { id: '2', nombre: 'Spaghetti alla carbonara', descripcion: 'Spaghetti fresco, guanciale, huevo, pecorino, pimienta negra', precio: 290 },
      { id: '3', nombre: 'Tiramisú della nonna', descripcion: 'Tiramisú artesanal, savoiardi, mascarpone, café espresso', precio: 130 },
    ],
  },
  'seoul-kitchen': {
    etiquetas: ['K-BBQ', 'Soju', 'Mesas con parrilla'],
    horario: 'Mar–Dom · 13:00–22:30',
    direccion: 'Moctezuma 88, Narvarte',
    totalReseñas: 298,
    reservasHoy: 8,
    galeria: G_INTL,
    itemsMenu: [
      { id: '1', nombre: 'Galbi (costillas marinadas)', descripcion: 'Costillas de res marinadas en soya, ajo y pera, asadas a la mesa', precio: 380 },
      { id: '2', nombre: 'Bibimbap', descripcion: 'Arroz con verduras, carne de res, huevo frito, salsa gochujang', precio: 220 },
      { id: '3', nombre: 'Japchae', descripcion: 'Fideos de camote, verduras salteadas, res, salsa de soya', precio: 195 },
    ],
  },
  'roots-cafe': {
    etiquetas: ['100% vegano', 'Superfoods', 'Brunch'],
    horario: 'Lun–Dom · 08:30–20:00',
    direccion: 'Sonora 174, Condesa',
    totalReseñas: 234,
    reservasHoy: 4,
    galeria: G_VEGETAL,
    itemsMenu: [
      { id: '1', nombre: 'Acaí bowl', descripcion: 'Pulpa de acaí, granola artesanal, frutas de temporada, miel de agave', precio: 145 },
      { id: '2', nombre: 'Burger de betabel', descripcion: 'Hamburguesa de betabel y lentejas, mayonesa vegana, papas horneadas', precio: 185 },
      { id: '3', nombre: 'Golden latte', descripcion: 'Leche de avena, cúrcuma, jengibre, pimienta negra, miel', precio: 85 },
    ],
  },
  'terra-verde': {
    etiquetas: ['Orgánico', 'Local', 'Sin procesar'],
    horario: 'Mar–Dom · 09:00–18:00',
    direccion: 'Adolfo Prieto 1023, Del Valle',
    totalReseñas: 167,
    reservasHoy: 3,
    galeria: G_VEGETAL,
    itemsMenu: [
      { id: '1', nombre: 'Ensalada de temporada', descripcion: 'Mezcla de hojas, frutas de temporada, semillas, vinagreta de limón', precio: 120 },
      { id: '2', nombre: 'Lasaña de verduras', descripcion: 'Lasaña de pasta integral, espinaca, zanahoria, salsa de tomate casera', precio: 165 },
      { id: '3', nombre: 'Smoothie verde', descripcion: 'Espinaca, pepino, manzana verde, jengibre, limón', precio: 90 },
    ],
  },
  'cafe-bohemio': {
    etiquetas: ['Café de autor', 'Repostería artesanal', 'Co-working friendly'],
    horario: 'Lun–Dom · 07:30–22:00',
    direccion: 'Álvaro Obregón 86, Roma Norte',
    totalReseñas: 412,
    reservasHoy: 3,
    galeria: G_VEGETAL,
    itemsMenu: [
      { id: '1', nombre: 'Cortado de especialidad', descripcion: 'Espresso doble, leche texturizada, origen Chiapas', precio: 70 },
      { id: '2', nombre: 'Croissant de mantequilla', descripcion: 'Croissant de masa hojaldrada, mantequilla francesa AOP', precio: 80 },
      { id: '3', nombre: 'Tarta de limón', descripcion: 'Tarta de masa sablée, crema de limón, merengue italiano', precio: 95 },
    ],
  },
}

const ID_RESTAURANTE_DESTACADO = 'casa-paloma'

function simularLatencia<T>(datos: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(datos), ms))
}

export function obtenerRestauranteDestacado(): Promise<Restaurante | undefined> {
  const destacado = RESTAURANTES.find((r) => r.id === ID_RESTAURANTE_DESTACADO)
  return simularLatencia(destacado)
}

export function obtenerRestaurantesCercanos(): Promise<Restaurante[]> {
  const cercanos = RESTAURANTES.filter((r) => r.id !== ID_RESTAURANTE_DESTACADO)
  return simularLatencia(cercanos)
}

export function obtenerTodosLosRestaurantes(): Promise<Restaurante[]> {
  return simularLatencia(RESTAURANTES)
}

export function obtenerRestaurantePorId(id: string): Promise<Restaurante | undefined> {
  const restaurante = RESTAURANTES.find((r) => r.id === id)
  return simularLatencia(restaurante)
}

export function obtenerDetalle(id: string): Promise<RestauranteDetalle | undefined> {
  const base = RESTAURANTES.find((r) => r.id === id)
  if (!base) return simularLatencia(undefined)
  const extra = DETALLES[id]
  if (!extra) return simularLatencia(undefined)
  return simularLatencia({ ...base, ...extra })
}

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

export interface BurbujaDetalle {
  bubble_id: string
  bubble_name: string
  score: number
  confidence: number
  feature_importances: Record<string, number>
}

export interface InsightBubble {
  occupancy_prediction: number
  dominant_factor: string
  uncertainty: number
  bubble_scores: Record<string, number>
  bubble_details: BurbujaDetalle[]
  shap_summary: Record<string, number>
  recommendations: string[]
  context_snapshot: Record<string, number>
}

export interface BurbujaSseEvent {
  bubble_id: string
  bubble_name: string
  etiqueta: string
  score: number
  confidence: number
  feature_importances: Record<string, number>
}

// ---------------------------------------------------------------------------
// Helper interno
// ---------------------------------------------------------------------------

function _authHeaders(): HeadersInit {
  const token = obtenerAccessToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

// ---------------------------------------------------------------------------
// Obtener insight completo (sin stream)
// ---------------------------------------------------------------------------

export async function getBubbleInsight(restaurantId: string): Promise<InsightBubble> {
  const res = await fetch(`${BACKEND_URL}/analiticos/bubble-insight`, {
    method: 'POST',
    headers: _authHeaders(),
    body: JSON.stringify({ restaurant_id: restaurantId }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.detail ?? `Error ${res.status}`)
  }

  return res.json()
}

// ---------------------------------------------------------------------------
// Obtener resumen del dashboard
// ---------------------------------------------------------------------------

export async function getDashboardSummary(restaurantId: string): Promise<{
  mesas: { total: number; ocupadas: number; disponibles: number; tasa_ocupacion: number }
  reservaciones_hoy: number
  ordenes_activas: number
  timestamp: string
}> {
  const res = await fetch(`${BACKEND_URL}/analiticos/dashboard/${restaurantId}`, {
    headers: _authHeaders(),
  })
  if (!res.ok) throw new Error(`Error ${res.status}`)
  return res.json()
}

// ---------------------------------------------------------------------------
// Suscribirse al stream SSE (burbuja por burbuja)
// ---------------------------------------------------------------------------

export interface StreamCallbacks {
  onBubble?: (data: BurbujaSseEvent) => void
  onFinalResult?: (data: InsightBubble) => void
  onDone?: () => void
  onError?: (err: Error) => void
}

/**
 * Abre un SSE al endpoint /bubble-insight/stream.
 * Devuelve una función de cierre (cleanup).
 *
 * Uso:
 *   const close = subscribeToBubbleStream('rest-123', {
 *     onBubble: b => console.log(b),
 *     onFinalResult: r => setInsight(r),
 *     onDone: () => setLoading(false),
 *   })
 *   // Para cancelar: close()
 */
export function subscribeToBubbleStream(
  restaurantId: string,
  callbacks: StreamCallbacks,
): () => void {
  const token = obtenerAccessToken()
  let closed = false

  // EventSource no soporta POST con body → usamos fetch + ReadableStream
  const controller = new AbortController()

  ;(async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/analiticos/bubble-insight/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ restaurant_id: restaurantId }),
        signal: controller.signal,
      })

      if (!res.ok || !res.body) {
        callbacks.onError?.(new Error(`Error ${res.status}`))
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (!closed) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })

        // Parsear bloques SSE  (event: xxx\ndata: yyy\n\n)
        const bloques = buffer.split('\n\n')
        buffer = bloques.pop() ?? ''

        for (const bloque of bloques) {
          const lines = bloque.split('\n')
          let eventName = ''
          let dataLine  = ''
          for (const line of lines) {
            if (line.startsWith('event: ')) eventName = line.slice(7).trim()
            if (line.startsWith('data: '))  dataLine  = line.slice(6).trim()
          }
          if (!dataLine) continue
          const parsed = JSON.parse(dataLine)
          if (eventName === 'bubble_result') callbacks.onBubble?.(parsed)
          if (eventName === 'final_result')  callbacks.onFinalResult?.(parsed)
          if (eventName === 'done')           callbacks.onDone?.()
        }
      }
    } catch (err) {
      if (!closed) callbacks.onError?.(err as Error)
    }
  })()

  return () => {
    closed = true
    controller.abort()
  }
}
