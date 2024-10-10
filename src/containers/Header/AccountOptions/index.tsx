import { userInfo } from '@/models/userInfo';
import Link from 'next/link';
import Account from '../Account';
import Image from 'next/image';
import UserIcon from '@/assets/svg/user-icon.svg';
import CloseIcon from '@/assets/svg/close.svg';

interface AccountOptionsProps {
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: userInfo | null;
  popupRef: React.RefObject<HTMLDivElement>;
}
const AccountOptions = ({
  showPopup,
  setShowPopup,
  userInfo,
  popupRef,
}: AccountOptionsProps) => {
  return (
    <>
      {showPopup && userInfo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="relative mt-2 w-40 rounded-lg border border-gray-200 bg-white shadow-lg md:w-96"
            ref={popupRef}
          >
            <div
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPopup(false)}
            >
              <Image
                src={CloseIcon}
                alt="Close Icon"
                width={1000}
                height={1000}
                className="h-6 w-6"
              />
            </div>
            <div className="flex flex-col items-center justify-between space-y-2 rounded-lg border-b border-gray-200 bg-orange-100 p-2">
              <div className="h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-zinc-50 md:h-16 md:w-16">
                <Link href={userInfo ? '/' : '/login'}>
                  <Account>
                    <Image
                      src={userInfo ? userInfo.userRaw.avatar : UserIcon}
                      alt="User Account Icon"
                      width={1000}
                      height={1000}
                      className="h-6 w-6 rounded-full md:h-16 md:w-16"
                    />
                  </Account>
                </Link>
              </div>
              <p className="text-center text-sm font-medium">
                {userInfo?.userRaw?.userName ?? ''}
              </p>
              <p className="text-center text-sm font-medium">
                {userInfo?.userRaw?.studentCode ?? ''}
              </p>
            </div>
            <ul className="py-1">
              <li className="border-b">
                <button
                  onClick={() => {
                    window.location.href = '/user-info';
                  }}
                  className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                >
                  Trang cá nhân
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem('userInfo');
                    localStorage.removeItem('@access_token');
                    window.location.href = '/';
                  }}
                  className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                >
                  <p className="font-medium text-red-500">Đăng xuất</p>
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
export default AccountOptions;
