import { useMemo } from 'react'
import { ls } from '../services/storage.js'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/Card.jsx'
import { Badge } from '../components/ui/Badge.jsx'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

ls.seed()

export default function Dashboard(){
  const visitors = ls.get('rlr_visitors', [])
  const incidents = ls.get('rlr_incidents', [])
  const payments = ls.get('rlr_payments', [])

  const kpis = [
    { label:'Visitantes hoy', value: visitors.filter(v=> new Date(v.at).toDateString() === new Date().toDateString()).length },
    { label:'Incidencias abiertas', value: incidents.filter(i=> i.status !== 'Cerrada').length },
    { label:'Pagos pendientes', value: payments.filter(p=> p.status === 'Pendiente').length }
  ]

  const data = useMemo(()=>{
    const days = [...Array(7)].map((_,i)=> new Date(Date.now()-(6-i)*864e5))
    return days.map(d=> ({
      d: d.toLocaleDateString(),
      vis: visitors.filter(v=> new Date(v.at).toDateString() === d.toDateString()).length,
      inc: incidents.filter(i=> new Date(i.createdAt).toDateString() === d.toDateString()).length,
    }))
  }, [])

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {kpis.map(k=> (
        <Card key={k.label}>
          <CardHeader><CardTitle>{k.label}</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">{k.value}</div></CardContent>
        </Card>
      ))}

      <Card className="md:col-span-3">
        <CardHeader><CardTitle>Actividad de la semana</CardTitle><CardDescription>Visitantes e incidencias</CardDescription></CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line type="monotone" dataKey="vis" />
                <Line type="monotone" dataKey="inc" />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="d" />
                <YAxis allowDecimals={false} />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
