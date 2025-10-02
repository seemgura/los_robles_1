import { ls } from '../services/storage.js'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/Card.jsx'
import { Button } from '../components/ui/Button.jsx'

ls.seed()

export default function Reports(){
  const visitors = ls.get('rlr_visitors', [])
  const incidents = ls.get('rlr_incidents', [])
  const payments = ls.get('rlr_payments', [])

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify({ visitors, incidents, payments }, null, 2)], { type:'application/json' })
    const url = URL.createObjectURL(blob); const a = document.createElement('a')
    a.href = url; a.download = `los-robles-export-${Date.now()}.json`; a.click(); URL.revokeObjectURL(url)
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader><CardTitle>Resumen</CardTitle><CardDescription>Métricas clave</CardDescription></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between"><span>Visitantes (total):</span><span>{visitors.length}</span></div>
          <div className="flex justify-between"><span>Incidencias abiertas:</span><span>{incidents.filter(i=>i.status!=='Cerrada').length}</span></div>
          <div className="flex justify-between"><span>Pagos pendientes:</span><span>{payments.filter(p=>p.status!=='Pagado').length}</span></div>
          <Button className="mt-3" onClick={exportJSON}>Exportar JSON</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Próximos pasos</CardTitle><CardDescription>Roadmap técnico</CardDescription></CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Autenticación y roles (JWT/Clerk/Auth0).</li>
            <li>API REST (Express/Nest) + DB (Postgres).</li>
            <li>Pasarela de pagos real (Stripe/PayPal) + webhooks.</li>
            <li>Emails/Push (SendGrid/SES/FCM).</li>
            <li>Backups, logs y monitoreo.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
