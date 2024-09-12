import Header from '@/containers/Header';
import ProModal from '@/components/BannerModal';
import ScrollToTop from '@/components/ScrollToTop';
import type { Metadata } from 'next';
import ScrollSticky from '@/components/ScrollSticky';
import Footer from '@/containers/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'IUH - Online Book Library',
  description: 'IUH - Online Book Library.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="root" className="flex min-h-screen flex-col">
      <div id="header" className="inset-x-0 top-0 z-50">
        <Header />
        <ScrollSticky childId="header" height={100} />
      </div>
      {/* <div className="hidden md:block">
        <Menu />
      </div> */}
      <main className="flex-grow bg-slate-100 md:py-2">{children}</main>
      <ProModal />
      <div id="footer" className="inset-x-0 bottom-0 z-0">
        <Footer />
      </div>
      <ScrollToTop />
      <ToastContainer />
    </div>
  );
}
