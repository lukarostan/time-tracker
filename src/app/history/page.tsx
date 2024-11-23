'use client';

import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css';
import React, { ReactElement } from 'react';

import { Header } from '@/components/Header';
import { History } from '@/components/History';

export default function Home(): ReactElement {
  return (
    <PrimeReactProvider>
      <main style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <History />
      </main>
    </PrimeReactProvider>
  );
}
