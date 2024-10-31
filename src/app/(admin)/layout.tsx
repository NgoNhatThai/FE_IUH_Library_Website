'use client';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './home/Sidebar';
import Header from './home/Header';
import { useState } from 'react';
import { Layout } from 'antd';
import ProModal from '@/components/BannerModal';
import ScrollToTop from '@/components/ScrollToTop';
import ScrollSticky from '@/components/ScrollSticky';
import Footer from '@/containers/Footer';
import { ToastContainer } from 'react-toastify';

const { Sider, Content } = Layout;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div id="root" className="flex min-h-screen flex-col">
      <div id="header" className="inset-x-0 top-0 z-50">
        <Header collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <ScrollSticky childId="header" height={100} />
      </div>

      <Layout>
        <Sider width={200} collapsible collapsed={collapsed} theme="dark">
          <Sidebar />
        </Sider>

        <Content
          style={{
            // margin: '24px',
            // padding: 24,
            background: '#fff',
            transition: 'margin-left 0.2s',
            // marginLeft: 40,
          }}
        >
          {children}
        </Content>
      </Layout>

      {/* <ProModal /> */}
      {/* <div id="footer" className="inset-x-0 bottom-0 z-0">
        <Footer />
      </div> */}
      <ScrollToTop />
      <ToastContainer />
    </div>
  );
}
