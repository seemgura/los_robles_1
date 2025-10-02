export async function createCharge({ resident, concept, amount }){
  // Reemplazar con API real (Stripe/PayPal)
  return { ok:true, id: crypto.randomUUID(), status:'pending' };
}
