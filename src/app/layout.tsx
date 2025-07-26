import type { Metadata } from 'next';
import { Pacifico, Inter } from 'next/font/google';
import ClientLayout from '../components/ClientLayout';
import './globals.css';

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pacifico',
});

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Vamo - Your AI Activity Guide',
  description:
    'Discover amazing activities in your area with AI-powered recommendations',
};

export default function RootLayout({
  children,
}: {
<<<<<<< HEAD
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${pacifico.variable} ${inter.variable}`}
        style={{ margin: 0, padding: 0 }}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
=======
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
>>>>>>> main
    </html>
  )
}
