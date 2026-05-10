import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import VehicleEntryPage from './pages/VehicleEntryPage.jsx'
import ParkingSlotsPage from './pages/ParkingSlotsPage.jsx'
import ActiveTicketsPage from './pages/ActiveTicketsPage.jsx'
import VehicleExitPage from './pages/VehicleExitPage.jsx'
import AdminPanelPage from './pages/AdminPanelPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/vehicle-entry" element={<VehicleEntryPage />} />
          <Route path="/parking-slots" element={<ParkingSlotsPage />} />
          <Route path="/active-tickets" element={<ActiveTicketsPage />} />
          <Route path="/vehicle-exit" element={<VehicleExitPage />} />
          <Route path="/admin" element={<AdminPanelPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
