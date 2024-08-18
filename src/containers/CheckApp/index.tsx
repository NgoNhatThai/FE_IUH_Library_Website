'use client';
import { fireAction } from '@/redux';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import storeIcon from '@/assets/svg/app-store.svg';
import ggPlayIcon from '@/assets/svg/gg-play.svg';
import Image from 'next/image';

const androidStoreLink =
  process.env.NEXT_PUBLIC_GOOGLE_STORE ||
  'https://play.google.com/store/apps/details?id=com.idsvn.tuctacteaapp';
const iosStoreLink =
  process.env.NEXT_PUBLIC_APP_STORE ||
  'https://apps.apple.com/us/app/t%C3%BAc-t%E1%BA%AFc-tea/id6476489604';
const deepLinkBase =
  process.env.NEXT_PUBLIC_DEEPLINK_BASE || 'tuctacteaapp://home';

const AppStoreButton = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="block w-full rounded bg-[rgba(156,205,246,0.8)] px-4 py-3 text-center text-black sm:w-48"
  >
    {children}
  </a>
);

interface HomePageProps {
  userAgent: string;
}

const CheckApp = ({ userAgent }: HomePageProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    redirectToApp();
  }, [searchParams, userAgent]);

  const redirectToApp = () => {
    let deepLink = deepLinkBase;
    const params = new URLSearchParams(searchParams.toString());

    if (/iPad|iPhone|iPod/.test(userAgent) && !isMSStreamAvailable()) {
      params.append('platform', 'ios');
      deepLink += `?${params.toString()}`;
      openApp(deepLink);
    } else if (/android/i.test(userAgent)) {
      params.append('platform', 'android');
      deepLink += `?${params.toString()}`;
      openApp(deepLink);
    } else {
      router.push('/');
    }
  };

  const openApp = (deepLink: string) => {
    window.location = deepLink as Location | (string & Location);
  };

  const isMSStreamAvailable = (): boolean => {
    return typeof window !== 'undefined' && 'MSStream' in window;
  };

  const handlOnRedirect = (e: React.MouseEvent) => {
    dispatch(fireAction());
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-[rgba(52,84,190,0.8)] to-[rgba(54,104,190,0.3)] p-6">
      <div className="rounded-lg bg-white p-8 text-center shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-[rgba(0,0,139,0.8)]">
          Tải ứng dụng Túc Tắc Tea
        </h2>
        <div className="mb-8 flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <AppStoreButton href={iosStoreLink}>
            <div className="flex items-center space-x-12 font-semibold">
              <Image
                src={ggPlayIcon}
                alt='CH Play'
                width={34}
                height={34}
              />
              <span className='text-sm'>Tải từ App Store</span>
            </div>
          </AppStoreButton>
          <AppStoreButton href={androidStoreLink}>
            <div className="flex items-center space-x-12 font-semibold">
              <Image
                src={storeIcon}
                alt='AppStore'
                width={34}
                height={34}
              />
              <span className='text-sm'>Tải từ Google Play</span>
            </div>
          </AppStoreButton>
        </div>

        <p className="mb-4 text-black text-sm">
          Hoặc bạn có thể tiếp tục truy cập trang web để biết thêm thông tin.
        </p>
        <Link
          href={`${searchParams.get('query')}`}
          onClick={handlOnRedirect}
          className="inline-block text-[rgba(0,0,139,0.8)] text-md font-semibold"
        >
          Tiếp tục với trang web
        </Link>
      </div>
    </div>
  );
};

export default CheckApp;
