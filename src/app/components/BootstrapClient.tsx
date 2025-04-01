"use client"

import Script from 'next/script';
import { useEffect } from 'react';

function BootstrapClient() {
  useEffect(() => {
    <Script src="bootstrap/dist/js/bootstrap.bundle.min.js" />
  }, []);

  return null;
}

export default BootstrapClient;