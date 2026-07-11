import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Toaster } from '@/components/ui/sonner'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Sena Corretor de Imóveis',
  description: 'Imóveis para venda e aluguel com Wagner Sena, CRECI 067.623.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={cn(playfair.variable, inter.variable)}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
