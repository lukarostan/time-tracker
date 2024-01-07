"use client";

import React, {ReactElement} from 'react';
import Header from '@/components/Header';
import {PrimeReactProvider} from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css';
import {ActiveTrackers} from '@/components/ActiveTrackers';

export default function Home(): ReactElement {
    return (
        <PrimeReactProvider>
            <main style={{width:'100%', display: 'flex', flexDirection: 'column'}}>
                <Header/>
                <ActiveTrackers/>
            </main>
        </PrimeReactProvider>
    );
}
