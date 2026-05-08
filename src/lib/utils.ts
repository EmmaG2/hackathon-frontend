import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...entradas: ClassValue[]) {
  return twMerge(clsx(entradas))
}

export function formatearMoneda(cantidad: number) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(cantidad)
}
