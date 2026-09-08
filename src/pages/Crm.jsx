import { useEffect } from 'react';
export default function Crm() {
  useEffect(() => { window.location.replace('/crm.html'); }, []);
  return <p style={{ padding: 40 }}>Abrindo apresentação do CRM… <a href="/crm.html">Continuar</a></p>;
}
