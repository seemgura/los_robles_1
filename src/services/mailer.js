export async function sendMail({ to, subject, body }){
  // Reemplazar con proveedor real (SendGrid/SES)
  console.log('sendMail()', { to, subject, body });
  return { ok:true };
}
