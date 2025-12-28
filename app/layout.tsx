import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Q&A Agent',
  description: 'Intelligent question answering agent',
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
