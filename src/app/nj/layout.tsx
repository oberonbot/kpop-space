import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './style.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'New Jeans',
  description: 'New Jeans',
};

export default function NJLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
