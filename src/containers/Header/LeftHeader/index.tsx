'use client';
import LogoIUH from '@/assets/svg/iuh-logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import LeftIcon from '@/assets/svg/left-arrow.svg';
import { usePathname } from 'next/navigation';

const LeftHeader = () => {
  const pathname = usePathname();
  if (pathname === '/') {
    return (
      <Link href="/">
        <Image
          src={LogoIUH}
          alt="IUH Logo"
          width={1000}
          height={1000}
          className="h-12 w-14 md:h-1/2 md:w-full md:min-w-48"
          priority
        />
      </Link>
    );
  } else {
    return (
      <Link href="/">
        <Image
          src={LeftIcon}
          alt="Back Icon"
          width={1000}
          height={1000}
          className="h-8 w-8"
          priority
        />
      </Link>
    );
  }
};
export default LeftHeader;
