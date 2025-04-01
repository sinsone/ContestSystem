import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import Navigation from './components/Navigation'
import { NextAuthProvider } from './providers'

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Система конкурсов',
  description: 'Платформа для проведения дистанционных конкурсов',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" data-bs-theme="light">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" 
          rel="stylesheet"
          precedence="default"
        />
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" 
          rel="stylesheet"
          precedence="default"
        />
      </head>
      <body className={`${inter.className} bg-body`}>
        <NextAuthProvider>
          <div className="min-vh-100 d-flex flex-column">
            <Navigation />
            <main className="flex-grow-1">
              {children}
            </main>
            <footer className="py-4 bg-body-tertiary mt-auto">
              <div className="container">
                <div className="row">
                  <div className="col-12 text-center">
                    <p className="text-body-secondary mb-0">
                      © 2024 Система проведения конкурсов. Все права защищены.
                    </p>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </NextAuthProvider>
        <Script 
          src="https://code.jquery.com/jquery-3.7.1.min.js"
          strategy="beforeInteractive"
        />
        <Script 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
        <Script id="theme-init" strategy="afterInteractive">
          {`
            if (typeof window !== 'undefined') {
              const savedTheme = localStorage.getItem('theme') || 'light';
              document.documentElement.setAttribute('data-bs-theme', savedTheme);
              document.body.classList.toggle('dark-mode', savedTheme === 'dark');
            }
          `}
        </Script>
      </body>
    </html>
  )
} 