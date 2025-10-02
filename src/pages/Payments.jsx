import { useState } from 'react'
import { ls } from '../services/storage.js'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/Card.jsx'
import { Input } from '../components/ui/Input.jsx'
import { Label } from '../components/ui/Label.jsx'
import { Button } from '../components/ui/Button.jsx'
import { Badge } from '../components/ui/Badge.jsx'

ls.seed()
const fmt = (iso)=> new Date(iso).toLocaleString()
const currency = (n)=> new Intl.NumberFormat('es-MX',{ style:'currency', currency:'MXN'}).format(n)

export default function Payments(){
  const [list, setList] = useState(ls.get('rlr_payments', []))
  const [f, setF] = useState({ resident:'', concept:'Cuota mensual', amount:1200 })
  const add = ()=>{ if(!f.resident) return; const rec={ id:crypto.randomUUID(), ...f, status:'Pendiente', date:new Date().toISOString() }; const next=[rec, ...list]; setList(next); ls.set('rlr_payments', next); setF({ resident:'', concept:'Cuota mensual', amount:1200 }); }
  const markPaid = id=>{ const next=list.map(p=> p.id===id? { ...p, status:'Pagado' }: p); setList(next); ls.set('rlr_payments', next); }
  const totalDue = list.filter(p=>p.status!=='Pagado').reduce((a,b)=> a+Number(b.amount||0), 0)

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader><CardTitle>Nuevo cargo</CardTitle><CardDescription>Simulación</CardDescription></CardHeader>
        <CardContent className="space-y-3">
          <div><Label>Residente</Label><Input value={f.resident} onChange={e=>setF({...f, resident:e.target.value})} /></div>
          <div><Label>Concepto</Label><Input value={f.concept} onChange={e=>setF({...f, concept:e.target.value})} /></div>
          <div><Label>Monto (MXN)</Label><Input type="number" value={f.amount} onChange={e=>setF({...f, amount:Number(e.target.value)})} /></div>
          <Button onClick={add}>Agregar cargo</Button>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader className="flex items-center justify-between">
          <div><CardTitle>Pagos</CardTitle><CardDescription>Conciliación simple</CardDescription></div>
          <Badge>{'Pendiente: ' + currency(totalDue)}</Badge>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left"><th className="py-2">Residente</th><th>Concepto</th><th>Monto</th><th>Fecha</th><th>Estatus</th><th></th></tr>
              </thead>
              <tbody>
                {list.map(p=> (
                  <tr key={p.id} className="border-b">
                    <td className="py-2">{p.resident}</td><td>{p.concept}</td><td>{currency(p.amount)}</td><td>{fmt(p.date)}</td>
                    <td>{p.status==='Pagado'? <Badge>Pagado</Badge> : <Badge kind="danger">Pendiente</Badge>}</td>
                    <td className="text-right">{p.status!=='Pagado' && <Button variant="secondary" onClick={()=>markPaid(p.id)}>Marcar pagado</Button>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
