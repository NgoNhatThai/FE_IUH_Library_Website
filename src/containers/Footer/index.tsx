import React from 'react';
import { storeService } from '@/services/storeService';
import FooterInfo from './FooterInfo';
const fetchStoreConfig = async () => {
  try {
    const storeInfo = await storeService.getAll();
    if (!storeInfo) return null;
    return storeInfo[0];
  } catch (error) {
    console.log(error);
  }
};
const Footer = async () => {
  const storeInfo = await fetchStoreConfig();
  return (
    <footer className="bg-[var(--bg-header)] text-white hidden md:block">
      <FooterInfo {...storeInfo} />
    </footer>
  );
};

export default Footer;
