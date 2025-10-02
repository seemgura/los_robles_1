import { useState } from 'react'
import { ls } from '../services/storage.js'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/Card.jsx'
import { Input } from '../components/ui/Input.jsx'
import { Label } from '../components/ui/Label.jsx'
import { Button } from '../components/ui/Button.jsx'
import { Badge } from '../components/ui/Badge.jsx'
import { Switch } from '../components/ui/Switch.jsx'

ls.seed()
const fmt = (iso)=> new Date(iso).toLocaleString()

export default function Notices(){
  const [list, setList] = useState(ls.get('rlr_notices', []))
  const [f, setF] = useState({ title:'', when:new Date().toISOString(), channel:'email', enabled:true })
  const add = ()=>{ if(!f.title) return; const rec={ id:crypto.randomUUID(), ...f }; const next=[rec, ...list]; setList(next); ls.set('rlr_notices', next); setF({ title:'', when:new Date().toISOString(), channel:'email', enabled:true }); }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader><CardTitle>Nueva notificación</CardTitle><CardDescription>Correo o banner</CardDescription></CardHeader>
        <CardContent className="space-y-3">
          <div><Label>Título</Label><Input value={f.title} onChange={e=>setF({...f, title:e.target.value})} /></div>
          <div><Label>Fecha y hora</Label><Input type="datetime-local" value={new Date(f.when).toISOString().slice(0,16)} onChange={e=>setF({...f, when:new Date(e.target.value).toISOString()})} /></div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label>Canal</Label>
              <select className="input" value={f.channel} onChange={e=>setF({...f, channel:e.target.value})}>
                <option value="email">Email</option><option value="app">In‑App</option>
              </select>
            </div>
            <Switch checked={f.enabled} onChange={(v)=>setF({...f, enabled:v})} />
          </div>
          <Button onClick={add}>Programar</Button>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader><CardTitle>Notificaciones programadas</CardTitle></CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {list.map(n=> (
              <li key={n.id} className="p-3 rounded-lg border flex items-center gap-3 justify-between">
                <div>
                  <div className="font-medium">{n.title}</div>
                  <div className="text-xs text-slate-500">{fmt(n.when)} • Canal: {n.channel}</div>
                </div>
                <Badge>{n.enabled? 'Activa':'Pausada'}</Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
