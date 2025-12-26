import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TechFlow Solutions',
  description: 'Digital Technological Processes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
