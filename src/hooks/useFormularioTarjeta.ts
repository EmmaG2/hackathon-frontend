import { useState } from 'react'

export type MarcaTarjeta = 'visa' | 'mastercard' | 'amex' | null

export type DatosFormularioTarjeta = {
  numeroTarjeta: string
  titular: string
  vencimiento: string
  cvv: string
  codigoPostal: string
}

function detectarMarca(digitos: string): MarcaTarjeta {
  if (/^4/.test(digitos)) return 'visa'
  if (/^5[1-5]/.test(digitos) || /^2[2-7]/.test(digitos)) return 'mastercard'
  if (/^3[47]/.test(digitos)) return 'amex'
  return null
}

function formatearNumeroTarjeta(digitos: string, marca: MarcaTarjeta): string {
  const esAmex = marca === 'amex'
  const max = esAmex ? 15 : 16
  const d = digitos.slice(0, max)
  if (esAmex) {
    return [d.slice(0, 4), d.slice(4, 10), d.slice(10)].filter(Boolean).join(' ')
  }
  return d.match(/.{1,4}/g)?.join(' ') ?? d
}

async function simularConfirmarPago(): Promise<{ success: true }> {
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1500))
}

export function useFormularioTarjeta(alExito: () => void) {
  const [formulario, setFormulario] = useState<DatosFormularioTarjeta>({
    numeroTarjeta: '',
    titular: '',
    vencimiento: '',
    cvv: '',
    codigoPostal: '',
  })
  const [estaVolteada, setEstaVolteada] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const digitosBrutos = formulario.numeroTarjeta.replace(/\D/g, '')
  const marca = detectarMarca(digitosBrutos)
  const longitudCvv = marca === 'amex' ? 4 : 3

  function manejarNumeroTarjeta(e: React.ChangeEvent<HTMLInputElement>) {
    const bruto = e.target.value.replace(/\D/g, '')
    const nuevaMarca = detectarMarca(bruto)
    setFormulario(prev => ({ ...prev, numeroTarjeta: formatearNumeroTarjeta(bruto, nuevaMarca) }))
  }

  function manejarVencimiento(e: React.ChangeEvent<HTMLInputElement>) {
    const digitosPrevios = formulario.vencimiento.replace(/\D/g, '')
    const nuevosDigitos = e.target.value.replace(/\D/g, '').slice(0, 4)

    let formateado: string
    if (nuevosDigitos.length > 2) {
      formateado = `${nuevosDigitos.slice(0, 2)}/${nuevosDigitos.slice(2)}`
    } else if (nuevosDigitos.length === 2 && digitosPrevios.length < 2) {
      formateado = nuevosDigitos + '/'
    } else {
      formateado = nuevosDigitos
    }

    setFormulario(prev => ({ ...prev, vencimiento: formateado }))
  }

  function manejarCvv(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/\D/g, '').slice(0, longitudCvv)
    setFormulario(prev => ({ ...prev, cvv: val }))
  }

  function manejarTitular(e: React.ChangeEvent<HTMLInputElement>) {
    setFormulario(prev => ({ ...prev, titular: e.target.value.toUpperCase() }))
  }

  function manejarCodigoPostal(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/\D/g, '').slice(0, 5)
    setFormulario(prev => ({ ...prev, codigoPostal: val }))
  }

  async function manejarEnvio(e: React.FormEvent) {
    e.preventDefault()
    setCargando(true)
    setError(null)
    try {
      await simularConfirmarPago()
      alExito()
    } catch {
      setError('Error al procesar el pago. Intenta de nuevo.')
    } finally {
      setCargando(false)
    }
  }

  const esValido =
    digitosBrutos.length >= (marca === 'amex' ? 15 : 16) &&
    formulario.titular.trim().length > 2 &&
    formulario.vencimiento.length === 5 &&
    formulario.cvv.length === longitudCvv &&
    formulario.codigoPostal.length === 5

  return {
    formulario,
    marca,
    estaVolteada,
    cargando,
    error,
    esValido,
    longitudCvv,
    setEstaVolteada,
    manejarNumeroTarjeta,
    manejarVencimiento,
    manejarCvv,
    manejarTitular,
    manejarCodigoPostal,
    manejarEnvio,
  }
}
