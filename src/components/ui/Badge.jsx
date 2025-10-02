export function Badge({ children, kind='muted' }){
  const k = kind==='danger' ? 'badge-danger' : kind==='ok' ? 'badge-ok' : 'badge-muted';
  return <span className={`badge ${k}`}>{children}</span>;
}
