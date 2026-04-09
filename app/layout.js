import './globals.css';

export const metadata = {
  title: {
    default: 'Tetric | Ivoclar Dental Composites & Restorative Materials',
    template: '%s'
  },
  description: "Tetric by Ivoclar — premium dental composite resins and restorative materials for durable, aesthetic restorations. Trusted by dental professionals worldwide.",
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
