import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Inicio } from '@/pages/Inicio'
import { DetalleRestaurante } from '@/pages/DetalleRestaurante'
import { Reservar } from '@/pages/Reservar'
import { ReservaExitosa } from '@/pages/ReservaExitosa'
import { MisReservas } from '@/pages/MisReservas'
import { DashboardRestaurante } from '@/pages/DashboardRestaurante'

function ContenedorMovil({ children }: { children: React.ReactNode }) {
  return (
        <div>
          {children}
        </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContenedorMovil><Inicio /></ContenedorMovil>} />
        <Route path="/restaurante/:id" element={<ContenedorMovil><DetalleRestaurante /></ContenedorMovil>} />
        <Route path="/restaurante/:id/reservar" element={<ContenedorMovil><Reservar /></ContenedorMovil>} />
        <Route path="/reserva/exito" element={<ContenedorMovil><ReservaExitosa /></ContenedorMovil>} />
        <Route path="/mis-reservas" element={<ContenedorMovil><MisReservas /></ContenedorMovil>} />
        <Route path="/dashboard/*" element={<DashboardRestaurante />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
