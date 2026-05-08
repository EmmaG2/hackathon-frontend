import type { MarcaTarjeta } from '@/hooks/useFormularioTarjeta'

type Props = {
  marca: MarcaTarjeta
  tamano?: 'sm' | 'lg'
}

export function InsigniaMarcaTarjeta({ marca, tamano = 'lg' }: Props) {
  if (marca === 'visa') {
    return (
      <span
        style={{
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          fontWeight: 700,
          fontSize: tamano === 'lg' ? '1.4rem' : '0.85rem',
          color: tamano === 'lg' ? '#F5E6D3' : '#1A1F71',
          letterSpacing: '-0.5px',
          textShadow: tamano === 'lg' ? '0 1px 3px rgba(0,0,0,0.5)' : 'none',
          lineHeight: 1,
        }}
      >
        VISA
      </span>
    )
  }

  if (marca === 'mastercard') {
    const tamanoCirculo = tamano === 'lg' ? 28 : 18
    const solapamiento = tamano === 'lg' ? -12 : -7

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            width: tamanoCirculo,
            height: tamanoCirculo,
            borderRadius: '50%',
            background: '#EB001B',
          }}
        />
        <div
          style={{
            width: tamanoCirculo,
            height: tamanoCirculo,
            borderRadius: '50%',
            background: '#F79E1B',
            marginLeft: solapamiento,
            opacity: 0.9,
          }}
        />
      </div>
    )
  }

  if (marca === 'amex') {
    return (
      <span
        style={{
          fontFamily: 'Arial, sans-serif',
          fontWeight: 700,
          fontSize: tamano === 'lg' ? '0.55rem' : '0.5rem',
          color: tamano === 'lg' ? '#F5E6D3' : '#007BC1',
          letterSpacing: '1px',
          border: `1.5px solid ${tamano === 'lg' ? 'rgba(245,230,211,0.7)' : '#007BC1'}`,
          padding: '2px 4px',
          borderRadius: 2,
          lineHeight: 1,
        }}
      >
        AMEX
      </span>
    )
  }

  return null
}
