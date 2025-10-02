import { Link, useLocation } from 'react-router-dom'
import AppRoutes from './router.jsx'
import { Badge } from './components/ui/Badge.jsx'
import { ShieldCheck } from 'lucide-react'

export default function App(){
  const { pathname } = useLocation();
  const tabs = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/access', label: 'Accesos' },
    { to: '/incidents', label: 'Incidencias' },
    { to: '/notices', label: 'Notificaciones' },
    { to: '/payments', label: 'Pagos' },
    { to: '/rules', label: 'Reglamento' },
    { to: '/reports', label: 'Reportes' },
  ];
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
        <div className="container py-3 flex items-center gap-3">
          <ShieldCheck className="w-6 h-6" />
          <h1 className="font-semibold">Residencial Los Robles — Panel</h1>
          <div className="ml-auto"><Badge>Demo local</Badge></div>
        </div>
      </header>
      <nav className="container pt-5 flex flex-wrap gap-2">
        {tabs.map(t => (
          <Link key={t.to} to={t.to} className={`btn ${pathname===t.to? 'btn-primary':'btn-secondary'}`}>
            {t.label}
          </Link>
        ))}
      </nav>
      <main className="container py-6"><AppRoutes/></main>
      <footer className="container pb-10 pt-6 text-xs text-slate-500">
        React + Tailwind • Persistencia localStorage • Sustituye servicios por API reales
      </footer>
    </div>
  )
}
