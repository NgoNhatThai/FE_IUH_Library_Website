import React from 'react';
import FooterInfo from './FooterInfo';
import { homeConfigService } from '@/services/homeConfigService';

const fetchHomeConfig = async () => {
  try {
    const homeConfigData = await homeConfigService.getConfig();
    if (!homeConfigData) return null;
    return homeConfigData;
  } catch (error) {
    console.log(error);
  }
};
const Footer = async () => {
  const info = await fetchHomeConfig();
  const data = info ? info.data : {};
  return (
    <footer className="hidden bg-white text-white md:block">
      <FooterInfo storeInfo={data} />
    </footer>
  );
};

export default Footer;
