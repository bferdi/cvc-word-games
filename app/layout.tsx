import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CVC Words Fun',
  description: 'Learn CVC words through fun and interactive games!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-black`}>
        <nav className="bg-yellow-400 p-4">
          <ul className="flex justify-center space-x-4">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/drag-and-drop" className="hover:underline">Drag and Drop</Link></li>
            <li><Link href="/match-sounds" className="hover:underline">Match Sounds</Link></li>
            <li><Link href="/blend-sounds" className="hover:underline">Blend Sounds</Link></li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}