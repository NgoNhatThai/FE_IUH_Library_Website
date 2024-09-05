'use client';
import LogoIUH from '@/assets/images/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import LeftIcon from '@/assets/svg/left-arrow.svg';
import { usePathname, useRouter } from 'next/navigation';

const LeftHeader = () => {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === '/') {
    return (
      <Link href="/">
        <Image
          src={LogoIUH}
          alt="IUH Logo"
          width={1000}
          height={1000}
          className="h-12 w-14 md:flex"
          priority
        />
      </Link>
    );
  } else {
    return (
      <button onClick={() => router.back()} className="flex items-center">
        <Image
          src={LeftIcon}
          alt="Back Icon"
          width={1000}
          height={1000}
          className="h-8 w-8"
          priority
        />
      </button>
    );
  }
};

export default LeftHeader;
