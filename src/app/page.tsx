'use client';

import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css';
import React, { ReactElement } from 'react';

import { Header } from '@/components/Header';
import { LoginForm } from '@/components/LoginForm';
import { login } from '@/services/AuthorizationService';

export default function Home(): ReactElement {
  return (
    <PrimeReactProvider>
      <main style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <LoginForm onLoginClick={login} />
      </main>
    </PrimeReactProvider>
  );
}
