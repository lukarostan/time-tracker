'use client';

import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css';
import React, { ReactElement } from 'react';

import { ActiveTrackers } from '@/components/ActiveTrackers/activeTrackers.component';
import { Header } from '@/components/Header';

export default function Home(): ReactElement {
  return (
    <PrimeReactProvider>
      <main style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <ActiveTrackers />
      </main>
    </PrimeReactProvider>
  );
}
