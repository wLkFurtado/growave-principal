import { useEffect } from 'react';

function Crm() {
  useEffect(() => {
    window.location.replace('/crm.html');
  }, []);

  return null;
}

export default Crm;
