import { useState } from 'react'
import { ls } from '../services/storage.js'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/Card.jsx'
import { Input } from '../components/ui/Input.jsx'
import { Textarea } from '../components/ui/Textarea.jsx'
import { Label } from '../components/ui/Label.jsx'
import { Button } from '../components/ui/Button.jsx'
import { Badge } from '../components/ui/Badge.jsx'

ls.seed()
const fmt = (iso)=> new Date(iso).toLocaleString()

export default function Incidents(){
  const [list, setList] = useState(ls.get('rlr_incidents', []))
  const [f, setF] = useState({ type:'Iluminación', title:'', desc:'' })

  const add = ()=>{
    if(!f.title) return
    const rec = { id: crypto.randomUUID(), ...f, status:'Abierta', createdAt:new Date().toISOString(), assignee:'Mantenimiento' }
    const next = [rec, ...list]; setList(next); ls.set('rlr_incidents', next); setF({ type:'Iluminación', title:'', desc:'' })
  }
  const close = id => { const next = list.map(i=> i.id===id? { ...i, status:'Cerrada' }: i); setList(next); ls.set('rlr_incidents', next) }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader><CardTitle>Reportar incidencia</CardTitle><CardDescription>Genera folio y asigna</CardDescription></CardHeader>
        <CardContent className="space-y-3">
          <div><Label>Tipo</Label>
            <select className="input" value={f.type} onChange={e=>setF({...f, type:e.target.value})}>
              <option>Iluminación</option><option>Hidráulico</option><option>Jardinería</option><option>Seguridad</option>
            </select>
          </div>
          <div><Label>Título</Label><Input value={f.title} onChange={e=>setF({...f, title:e.target.value})} /></div>
          <div><Label>Descripción</Label><Textarea value={f.desc} onChange={e=>setF({...f, desc:e.target.value})} /></div>
          <Button onClick={add}>Crear incidencia</Button>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader><CardTitle>Incidencias</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left"><th className="py-2">Folio</th><th>Título</th><th>Tipo</th><th>Estatus</th><th>Asignado</th><th>Creado</th><th></th></tr>
              </thead>
              <tbody>
                {list.map(i=> (
                  <tr key={i.id} className="border-b">
                    <td className="py-2 font-mono text-xs">{i.id.slice(0,8)}</td>
                    <td>{i.title}</td>
                    <td>{i.type}</td>
                    <td>{i.status==='Abierta'? <Badge kind="danger">Abierta</Badge> : <Badge>Cerrada</Badge>}</td>
                    <td>{i.assignee}</td>
                    <td>{fmt(i.createdAt)}</td>
                    <td className="text-right">{i.status==='Abierta' && <Button variant="secondary" onClick={()=>close(i.id)}>Cerrar</Button>}</td>
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
