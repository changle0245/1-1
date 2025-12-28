import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ArabGold Factory | Arabic Incense Burner Manufacturer',
  description: 'Factory direct Arabic incense burners, gold serving sets, Islamic home decor. MOQ 50 pcs, OEM customization available.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Noto+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
