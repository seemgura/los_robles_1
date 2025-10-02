export const ls = {
  get(key, fallback){
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
    catch { return fallback; }
  },
  set(key, val){ localStorage.setItem(key, JSON.stringify(val)); },
  seed(){
    if(!this.get('rlr_users', null)) this.set('rlr_users', [
      { id:'u1', role:'admin', name:'Administrador', email:'admin@losrobles.mx' },
      { id:'u2', role:'guard', name:'Caseta 1', email:'caseta1@losrobles.mx' },
      { id:'u3', role:'resident', name:'María López', email:'maria@example.com', house:'Robles 12' },
    ]);
    if(!this.get('rlr_visitors', null)) this.set('rlr_visitors', [
      { id:'v1', name:'Carlos Pérez', doc:'INE', plate:'JKT-22-11', host:'María López', at:new Date().toISOString(), status:'IN' },
      { id:'v2', name:'DHL', doc:'Guía 9912', plate:'FLE-88-10', host:'Admin', at:new Date(Date.now()-86400000).toISOString(), status:'OUT' },
    ]);
    if(!this.get('rlr_incidents', null)) this.set('rlr_incidents', [
      { id:'i1', type:'Iluminación', title:'Foco fundido en parque', desc:'Cerca del kiosko.', status:'Abierta', createdAt:new Date().toISOString(), assignee:'Mantenimiento' }
    ]);
    if(!this.get('rlr_notices', null)) this.set('rlr_notices', [
      { id:'n1', channel:'email', title:'Mantenimiento alberca', when:new Date(Date.now()+36e5).toISOString(), enabled:true }
    ]);
    if(!this.get('rlr_payments', null)) this.set('rlr_payments', [
      { id:'p1', resident:'María López', concept:'Cuota mensual', amount:1200, status:'Pagado', date:new Date().toISOString() },
      { id:'p2', resident:'María López', concept:'Extra poda', amount:300, status:'Pendiente', date:new Date(Date.now()-3*864e5).toISOString() }
    ]);
  }
};
