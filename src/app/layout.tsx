// RootLayout.js
import Fire from '@/components/Fire';
import NextProgressBarWrapper from '@/config/next/nextProgressBarWrapper';
import QueryClientProviderWrapper from '@/config/next/queryClientProviderWrapper';
import ReduxProviderWrapper from '@/config/next/reduxProviderWrapper';
import '@/css/tailwind.css';
import type { Metadata } from 'next';
import 'react-loading-skeleton/dist/skeleton.css';
import '../css/global.css';
import { ConfigProvider } from '@/components/ConfigProvider';
export const metadata: Metadata = {
  title: 'IUH - Online Book Library',
  description:
    'IUH - Online Book Library is a online website created for IUH Library.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextProgressBarWrapper>
          <QueryClientProviderWrapper>
            <ReduxProviderWrapper>
              <Fire>
                <ConfigProvider>{children}</ConfigProvider>
              </Fire>
            </ReduxProviderWrapper>
          </QueryClientProviderWrapper>
        </NextProgressBarWrapper>
      </body>
    </html>
  );
}
