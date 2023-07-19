import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import { Providers } from '../../store/provider'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-950">
        <Providers>
          <Header />
          <main className='w-full max-w-7xl m-auto min-h-screen px-4 lg:px-0'>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
