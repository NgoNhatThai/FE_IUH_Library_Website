import Link from 'next/link';

const Breadcrumb = ({ title }: { title: string }) => {
  return (
    <div className="mt-1 flex w-full items-start justify-start">
      <Link href="/">
        <span className="text-sm text-sky-500">Trang chủ</span>
      </Link>
      <span className="ml-2 text-sm text-sky-500">/</span>
      <Link href="/">
        <span className="ml-2 text-sm text-sky-500">{title}</span>
      </Link>
    </div>
  );
};
export default Breadcrumb;
