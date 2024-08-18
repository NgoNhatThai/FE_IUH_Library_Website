'use client';
import { CHECK_APP } from '@/constants';
import { AppDispatch } from '@/redux';
import { getListStores } from '@/redux/slices/store-slice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Fire = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  useEffect(() => {
    dispatch(getListStores());
    const userAgent = navigator.userAgent;
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      );
    if (isMobile) {
      const currentUrl = window.location.href;
      const url = new URL(currentUrl);
      const pathAndQuery = url.pathname + url.search;
      router.refresh();
      router.replace(`${CHECK_APP}?query=${pathAndQuery}`);
    }
  }, []);
  return <React.Fragment>{children}</React.Fragment>;
};

export default Fire;
