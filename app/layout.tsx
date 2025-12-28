import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ArabGold Factory | Premium Arabic Home Decor Manufacturer',
  description: 'Factory direct manufacturer of Mabkhara incense burners, gold serving trays, and Islamic gift sets. 10+ years export experience. MOQ 50 pcs. OEM/ODM available.',
  keywords: 'mabkhara wholesale, arabic incense burner, gold serving tray, islamic gifts manufacturer, bakhoor burner supplier',
  openGraph: {
    title: 'ArabGold Factory | Arabic Home Decor Manufacturer',
    description: 'Premium Mabkhara & Gold Tableware - Factory Direct from Guangzhou',
    url: 'https://www.arabgoldfactory.com',
    siteName: 'ArabGold Factory',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
