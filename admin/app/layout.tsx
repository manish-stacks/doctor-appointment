import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Admin | Doctor Management System ',
  description: 'Multi-role HR Management System for Recruitment',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
