"use client";

import React, {ReactElement} from 'react';
import {PrimeReactProvider} from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css';
import {login} from '@/services/AuthorizationService';
import {Header} from '@/components/Header';
import {LoginForm} from '@/components/LoginForm';

export default function Home(): ReactElement {
    return (
        <PrimeReactProvider>
            <main style={{width:'100%', display: 'flex', flexDirection: 'column'}}>
                <Header/>
                <LoginForm onLoginClick={login}/>
            </main>
        </PrimeReactProvider>
    );
}
