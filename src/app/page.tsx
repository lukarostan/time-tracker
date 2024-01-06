"use client";

import {ReactElement} from 'react';
import Logs from '@/components/Logs';
import Header from '@/components/Header';
import {PrimeReactProvider} from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css';
import LoginForm from '@/components/LoginForm';
import {login} from '@/services/AuthorizationService';

export default function Home(): ReactElement {
    return (
        <PrimeReactProvider>
            <main>
                <Header/>
                <LoginForm onLoginClick={() => login()}/>
            </main>
        </PrimeReactProvider>
    );
}
