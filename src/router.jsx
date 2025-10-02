import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Access from './pages/Access.jsx'
import Incidents from './pages/Incidents.jsx'
import Notices from './pages/Notices.jsx'
import Payments from './pages/Payments.jsx'
import Rules from './pages/Rules.jsx'
import Reports from './pages/Reports.jsx'

export default function AppRoutes(){
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/access" element={<Access />} />
      <Route path="/incidents" element={<Incidents />} />
      <Route path="/notices" element={<Notices />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
