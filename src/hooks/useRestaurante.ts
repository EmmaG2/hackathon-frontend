import { useState, useEffect } from 'react'
import { obtenerDetalle } from '@/lib/api'
import type { RestauranteDetalle } from '@/types'

export function useRestaurante(id: string | undefined) {
  const [restaurante, setRestaurante] = useState<RestauranteDetalle | undefined>()
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (!id) return
    setCargando(true)
    obtenerDetalle(id).then((resultado) => {
      setRestaurante(resultado)
      setCargando(false)
    })
  }, [id])

  return { restaurante, cargando }
}
