export function Button({ children, variant='primary', className='', ...props }){
  const v = variant==='secondary' ? 'btn-secondary' : 'btn-primary';
  return <button className={`${v} ${className}`} {...props}>{children}</button>;
}
