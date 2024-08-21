'use client';
import { StoreConfig } from '@/models';
import { usePathname } from 'next/navigation';

const FooterInfo = (storeInfo: StoreConfig) => {
  const pathname = usePathname();
  return (
    pathname === '/' && (
      <>
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            {storeInfo?.name}
          </h2>
          <p className="mb-3 text-sm text-gray-600">
            Địa chỉ: <span className="text-gray-700">{storeInfo?.address}</span>
          </p>
          <p className="mb-3 text-sm text-gray-600">
            Điện thoại:{' '}
            <a
              href={`tel:${storeInfo?.phoneNumber}`}
              className="text-blue-500 hover:underline"
            >
              {storeInfo?.phoneNumber}
            </a>
          </p>
          <p className="text-sm text-gray-600">
            Mã số thuế: <span className="text-gray-700">{storeInfo?.vat}</span>
          </p>
        </div>
      </>
    )
  );
};

export default FooterInfo;
