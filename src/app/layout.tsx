import type { Metadata } from 'next'
import './globals.scss'
import './reset.css'
import React from 'react';


export const metadata: Metadata = {
  title: 'Time tracker',
  description: 'Time tracker',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
