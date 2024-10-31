import type { Metadata } from 'next';
import RootLayout from './layout';

export const metadata: Metadata = {
  title: 'IUH - Online Book Library',
  description: 'IUH - Online Book Library.',
};

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayout>{children}</RootLayout>;
}
