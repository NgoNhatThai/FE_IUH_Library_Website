'use client';
import { HomeConfigTypeModel } from '@/models';
import { usePathname } from 'next/navigation';
import Logo from '@/assets/images/round-logo.png';
import studentLogo from '@/assets/images/logo-sinh-vien.png';

interface FooterInfoProps {
  storeInfo?: HomeConfigTypeModel;
}

const FooterInfo = ({ storeInfo }: FooterInfoProps) => {
  const pathname = usePathname();

  return (
    pathname === '/' && (
      <>
        <div className="mx-auto flex flex-col space-y-8 border-2 shadow-md md:flex-row md:justify-between md:space-y-0">
          {/* Thông tin */}
          <div className="flex-1 p-4">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              {storeInfo?.name}
            </h2>
            <p className="mb-3 text-sm text-gray-600">
              Địa chỉ:{' '}
              <span className="text-gray-700">{storeInfo?.address}</span>
            </p>
            <p className="mb-3 text-sm text-gray-600">
              Điện thoại:{' '}
              <a
                href={`tel:${storeInfo?.phone}`}
                className="text-blue-500 hover:underline"
              >
                {storeInfo?.phone}
              </a>
            </p>
            <p className="text-sm text-gray-600">
              Email: <span className="text-gray-700">{storeInfo?.email}</span>
            </p>
          </div>

          {/* Mô tả */}
          <div className="flex-1 p-4">
            <p className="text-md text-left text-gray-600">{storeInfo?.desc}</p>
          </div>

          {/* Liên hệ */}
          <div className="flex-1 p-4">
            <div className="mb-4">
              <div className="flex items-center space-x-2">
                <img src={Logo.src} alt="logo" className="h-10 w-10" />
                <a
                  href="https://iuh.edu.vn/"
                  className="text-blue-500 hover:underline"
                >
                  Trang chủ trường đại học công nghiệp TP Hồ Chí Minh
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src={studentLogo.src}
                alt="logo sinh viên"
                className="h-10 w-10"
              />
              <a
                href="https://sv.iuh.edu.vn/sinh-vien-dang-nhap.html"
                className="text-blue-500 hover:underline"
              >
                Trang sinh viên đại học công nghiệp TP Hồ Chí Minh
              </a>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default FooterInfo;
