import { useState } from 'react'
import { ls } from '../services/storage.js'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/Card.jsx'
import { Input } from '../components/ui/Input.jsx'
import { Label } from '../components/ui/Label.jsx'
import { Button } from '../components/ui/Button.jsx'
import { Badge } from '../components/ui/Badge.jsx'

ls.seed()
const fmt = (iso)=> new Date(iso).toLocaleString()

export default function Access(){
  const [form, setForm] = useState({ name:'', doc:'', plate:'', host:'' })
  const [list, setList] = useState(ls.get('rlr_visitors', []))

  const add = ()=>{
    if(!form.name || !form.host) return
    const rec = { id: crypto.randomUUID(), ...form, at: new Date().toISOString(), status:'IN' }
    const next = [rec, ...list]; setList(next); ls.set('rlr_visitors', next); setForm({ name:'', doc:'', plate:'', host:'' })
  }
  const checkout = id => { const next = list.map(v=> v.id===id ? { ...v, status:'OUT' } : v); setList(next); ls.set('rlr_visitors', next) }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader><CardTitle>Registro de Visitantes</CardTitle><CardDescription>Captura rápida</CardDescription></CardHeader>
        <CardContent className="space-y-3">
          <div><Label>Nombre</Label><Input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Documento</Label><Input value={form.doc} onChange={e=>setForm(f=>({...f,doc:e.target.value}))} /></div>
            <div><Label>Placas</Label><Input value={form.plate} onChange={e=>setForm(f=>({...f,plate:e.target.value}))} /></div>
          </div>
          <div><Label>Residente anfitrión</Label><Input value={form.host} onChange={e=>setForm(f=>({...f,host:e.target.value}))} /></div>
          <Button onClick={add}>Registrar entrada</Button>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader><CardTitle>Bitácora</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2">Nombre</th><th>Host</th><th>Documento</th><th>Placas</th><th>Fecha</th><th>Estado</th><th></th>
                </tr>
              </thead>
              <tbody>
                {list.map(v=> (
                  <tr key={v.id} className="border-b">
                    <td className="py-2">{v.name}</td>
                    <td>{v.host}</td>
                    <td>{v.doc||'-'}</td>
                    <td>{v.plate||'-'}</td>
                    <td>{fmt(v.at)}</td>
                    <td>{v.status==='IN'? <Badge kind="ok">IN</Badge> : <Badge>OUT</Badge>}</td>
                    <td className="text-right">{v.status==='IN' && <Button variant="secondary" onClick={()=>checkout(v.id)}>Dar salida</Button>}</td>
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
