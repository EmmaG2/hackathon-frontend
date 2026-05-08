import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Landing } from '@/pages/Landing'
import { LoginRestaurante } from '@/pages/LoginRestaurante'
import { Inicio } from '@/pages/Inicio'
import { DetalleRestaurante } from '@/pages/DetalleRestaurante'
import { Reservar } from '@/pages/Reservar'
import { ReservaExitosa } from '@/pages/ReservaExitosa'
import { MisReservas } from '@/pages/MisReservas'
import Cuenta from '@/pages/Cuenta'
import { DashboardRestaurante } from '@/pages/DashboardRestaurante'
import { Mesas } from '@/pages/dashboard/Mesas'
import { Reservas } from '@/pages/dashboard/Reservas'
import { Menu } from '@/pages/dashboard/Menu'
import { Equipo } from '@/pages/dashboard/Equipo'
import { Reportes } from '@/pages/dashboard/Reportes'

function ContenedorMovil({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login-restaurante" element={<LoginRestaurante />} />
        <Route path="/explorar" element={<ContenedorMovil><Inicio /></ContenedorMovil>} />
        <Route path="/restaurante/:id" element={<ContenedorMovil><DetalleRestaurante /></ContenedorMovil>} />
        <Route path="/restaurante/:id/reservar" element={<ContenedorMovil><Reservar /></ContenedorMovil>} />
        <Route path="/reserva/exito" element={<ContenedorMovil><ReservaExitosa /></ContenedorMovil>} />
        <Route path="/mis-reservas" element={<ContenedorMovil><MisReservas /></ContenedorMovil>} />
        <Route path="/cuenta" element={<ContenedorMovil><Cuenta /></ContenedorMovil>} />
        <Route path="/dashboard" element={<DashboardRestaurante />} />
        <Route path="/dashboard/mesas"    element={<Mesas />}    />
        <Route path="/dashboard/reservas" element={<Reservas />} />
        <Route path="/dashboard/menu"     element={<Menu />}     />
        <Route path="/dashboard/equipo"   element={<Equipo />}   />
        <Route path="/dashboard/reportes" element={<Reportes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
