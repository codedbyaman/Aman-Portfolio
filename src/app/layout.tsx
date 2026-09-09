import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import profile from '@/data/profile.json';

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title}`,
  description: profile.bio,
  keywords: [
    'iOS Automation Engineer',
    'XCTest',
    'XCUITest',
    'Mobile QA',
    'Swift',
    'Test Automation',
    'CI/CD',
    'QA Engineer',
    profile.name,
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.bio,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — ${profile.title}`,
    description: profile.bio,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-dark-300 text-slate-200 font-grotesk antialiased">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0F172A',
              color: '#E2E8F0',
              border: '1px solid rgba(0, 229, 255, 0.3)',
              boxShadow: '0 0 20px rgba(0, 229, 255, 0.1)',
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
