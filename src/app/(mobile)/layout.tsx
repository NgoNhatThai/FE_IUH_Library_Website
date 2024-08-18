// RootLayout.js
// import Menu
import type { Metadata } from 'next';
import '@/css/global.css';

export const metadata: Metadata = {
  title: 'Shop - Book Store',
  description:
    'Shop - Book Store is a fictional e-commerce website that sells books.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
