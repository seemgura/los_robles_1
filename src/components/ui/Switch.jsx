export function Switch({ checked, onChange }){
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <input type="checkbox" className="sr-only" checked={checked} onChange={e=>onChange?.(e.target.checked)} />
      <span className={`w-9 h-5 rounded-full transition ${checked? 'bg-emerald-500':'bg-slate-300'}`}></span>
      <span className="text-sm">{checked? 'On':'Off'}</span>
    </label>
  );
}
