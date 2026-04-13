import './globals.css';
import { CREATOR } from '@/lib/creator';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Tetric | Ivoclar Dental Composites & Restorative Materials',
    template: '%s'
  },
  description: "Tetric by Ivoclar — premium dental composite resins and restorative materials for durable, aesthetic restorations. Trusted by dental professionals worldwide.",
  applicationName: 'Tetric by Ivoclar',
  referrer: 'origin-when-cross-origin',
  creator: CREATOR.name,
  publisher: CREATOR.siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Tetric by Ivoclar'
  },
  twitter: {
    card: 'summary_large_image'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
