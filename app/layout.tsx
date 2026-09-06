import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bautizo y primer cumpleaños de Miguel Ángel',
  description: 'Acompáñanos a celebrar el bautizo y primer cumpleaños de Miguel Ángel Lucero Cabrera.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
