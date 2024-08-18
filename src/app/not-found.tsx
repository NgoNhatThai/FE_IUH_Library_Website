// pages/404.js
import Image from 'next/image';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-3/4 max-w-md px-4 text-center">
        <div className="mx-auto mb-4 flex w-full items-center justify-center">
          <Image
            src="/404-error.png"
            alt="404"
            width={1000}
            height={1000}
            className="h-3/5 w-3/5"
          />
        </div>
        <h1 className="mb-4 text-lg font-bold text-gray-900">
          Oops! Không tìm thấy trang
        </h1>
        <p className="text-md mb-4 text-gray-600">
          Trang bạn đang tìm kiếm có thể đã bị xóa, đã thay đổi tên hoặc tạm
          thời không khả dụng.
        </p>
        <Link href="/">
          <span className="inline-block cursor-pointer rounded-lg bg-blue-500 px-6 py-3 font-bold text-white shadow-lg transition duration-300 hover:bg-blue-600 md:px-8 md:py-4">
            Quay lại trang chủ
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
