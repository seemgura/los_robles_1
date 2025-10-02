export function Card({ children, className='' }){ return <div className={`card ${className}`}>{children}</div>; }
export function CardHeader({ children }){ return <div className="card-h">{children}</div>; }
export function CardContent({ children }){ return <div className="card-c">{children}</div>; }
export function CardTitle({ children }){ return <div className="text-sm font-semibold">{children}</div>; }
export function CardDescription({ children }){ return <div className="text-xs text-slate-500">{children}</div>; }
