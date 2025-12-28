import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'مصنع أراب جولد | مصنع مباخر عربية',
  description: 'مباخر عربية وأطقم تقديم ذهبية من المصنع مباشرة. الحد الأدنى 50 قطعة، خدمة OEM متاحة.',
}

export default function ArLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Noto+Sans+Arabic:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body style={{fontFamily: "'Noto Sans Arabic', sans-serif"}}>{children}</body>
    </html>
  )
}
