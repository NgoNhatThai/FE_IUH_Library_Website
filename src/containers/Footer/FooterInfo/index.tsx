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

  const defaultStoreInfo = {
    name: 'Thư viện Trường Đại học Công nghiệp TP. Hồ Chí Minh',
    address: '12 Nguyễn Văn Bảo, Phường 4, Quận Gò Vấp, TP. Hồ Chí Minh',
    phone: '028-38940390',
    email: 'thuvien@iuh.edu.vn',
    desc: 'Thư viện cung cấp tài liệu học tập, nghiên cứu và giải trí cho sinh viên, giảng viên và cán bộ nhà trường. Chúng tôi không ngừng nỗ lực để nâng cao chất lượng dịch vụ.',
  };

  const info = storeInfo || defaultStoreInfo;

  return (
    pathname === '/' && (
      <footer className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col space-y-6 border-t-2 border-gray-200 pt-6 md:flex-row md:justify-between md:space-y-0">
          {/* Thông tin */}
          <div className="flex-1">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              {info.name}
            </h2>
            <p className="mb-2 text-sm text-gray-600">
              <span className="font-semibold">Địa chỉ:</span>{' '}
              <span className="text-gray-700">{info.address}</span>
            </p>
            <p className="mb-2 text-sm text-gray-600">
              <span className="font-semibold">Điện thoại:</span>{' '}
              <a
                href={`tel:${info.phone}`}
                className="text-blue-500 hover:underline"
              >
                {info.phone}
              </a>
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Email:</span>{' '}
              <a
                href={`mailto:${info.email}`}
                className="text-blue-500 hover:underline"
              >
                {info.email}
              </a>
            </p>
          </div>

          {/* Mô tả */}
          <div className="flex-1">
            <p className="text-sm text-gray-600">{info.desc}</p>
          </div>

          {/* Liên hệ */}
          <div className="flex-1">
            <div className="mb-6">
              <div className="flex items-center space-x-3">
                <img
                  src={Logo.src}
                  alt="logo"
                  className="h-12 w-12 rounded-full shadow-md"
                />
                <a
                  href="https://iuh.edu.vn/"
                  className="text-blue-500 hover:underline"
                >
                  Trang chủ trường đại học công nghiệp TP Hồ Chí Minh
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <img
                src={studentLogo.src}
                alt="logo sinh viên"
                className="h-12 w-12 rounded-full shadow-md"
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
        <div className="mt-6 border-t-2 border-gray-200 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} {info.name}. All rights reserved.
        </div>
      </footer>
    )
  );
};

export default FooterInfo;
