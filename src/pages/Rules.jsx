import { useState } from 'react'
import { ls } from '../services/storage.js'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/Card.jsx'
import { Textarea } from '../components/ui/Textarea.jsx'
import { Button } from '../components/ui/Button.jsx'

ls.seed()

export default function Rules(){
  const [text, setText] = useState(ls.get('rlr_rules', '1) Respeta horarios de áreas comunes.\n2) Velocidad máxima 20km/h.\n3) Mascotas con correa en áreas comunes.'))
  const save = ()=> ls.set('rlr_rules', text)

  return (
    <Card>
      <CardHeader><CardTitle>Reglamento interno</CardTitle><CardDescription>Versión editable local</CardDescription></CardHeader>
      <CardContent className="space-y-3">
        <Textarea rows={12} value={text} onChange={e=>setText(e.target.value)} />
        <div className="flex gap-2"><Button onClick={save}>Guardar</Button><Button variant="secondary" onClick={()=>navigator.clipboard.writeText(text)}>Copiar</Button></div>
      </CardContent>
    </Card>
  )
}
