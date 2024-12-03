'use client';
import Image from 'next/image';
import Link from 'next/link';
import CartWrapper from '../CartWrapper';
import Account from '../Account';
import { useMemo, useRef, useState } from 'react';
import { userInfo } from '@/models/userInfo';
import AccountOptions from '../AccountOptions';
import { QueryKey } from '@/types/api';
import { useQuery } from 'react-query';
import { userService } from '@/services/userService';
import { Notify } from '@/models/notifyModel';
import { Badge, Dropdown, List } from 'antd';
import {
  BellOutlined,
  DollarOutlined,
  HeartOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { toast } from 'react-toastify';
const RightHeader = () => {
  const storedUserInfo =
    typeof window !== 'undefined' ? localStorage.getItem('userInfo') : '';
  const userInfo: userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const popupRef = useRef(null);

  const { data: notificationData } = useQuery({
    queryKey: [QueryKey.NOTIFICATION, userInfo?.userRaw?._id],
    queryFn: async () => {
      if (userInfo && userInfo.userRaw && userInfo.userRaw._id)
        return await userService.getNotification(userInfo.userRaw._id);
      return null;
    },
    refetchOnWindowFocus: false,
  });

  const changeStatusNotification = async (userId: string, notifyId: string) => {
    try {
      await userService.changeNotificationStatus({
        userId,
        notifyId,
      });
    } catch (error) {
      console.error(error);
      toast.error('Có lỗi xảy ra khi đánh dấu đã đọc thông báo');
    }
  };

  const unReadNotification = useMemo(() => {
    return notificationData?.data?.filter(
      (item: Notify) => item.status === 'UNREAD',
    );
  }, [notificationData]);

  const notificationList = (
    <div
      style={{
        width: '300px',
        backgroundColor: 'white',
        padding: '4px',
        borderRadius: '4px',
        border: '1px solid #f0f0f0',
      }}
    >
      <List
        itemLayout="horizontal"
        dataSource={notificationData?.data?.slice(0, 5)} // Giới hạn số lượng thông báo là 5
        renderItem={(item: Notify) => (
          <List.Item
            className={`transition-all ${
              item.status === 'UNREAD' ? 'bg-white' : 'bg-gray-100'
            } mb-2 rounded-lg shadow-sm hover:bg-gray-50`}
          >
            <List.Item.Meta
              className="p-4"
              title={
                <div className="flex items-center text-base font-semibold text-gray-800">
                  {item?.requestId ? (
                    <>
                      <DollarOutlined
                        style={{
                          fontSize: '18px',
                          color: '#52c41a',
                          marginRight: '8px',
                        }}
                      />
                      <span>Thông báo nạp tiền</span>
                    </>
                  ) : (
                    <>
                      <NotificationOutlined
                        style={{
                          fontSize: '18px',
                          color: '#1890ff',
                          marginRight: '8px',
                        }}
                      />
                      <span>Thông báo thêm chương</span>
                    </>
                  )}
                </div>
              }
              description={
                <a
                  className="cursor-pointer text-sm text-gray-600 hover:text-blue-500"
                  href={`${
                    item?.bookId && item?.chapterId
                      ? `/chapter/${item.chapterId}`
                      : `/user-info`
                  }`}
                  onClick={() => {
                    if (
                      item.status === 'UNREAD' &&
                      userInfo?.userRaw?._id &&
                      item._id
                    ) {
                      changeStatusNotification(
                        userInfo?.userRaw?._id,
                        item._id,
                      );
                    }
                  }}
                >
                  {item?.message || 'Không có nội dung'}
                </a>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
  return (
    <div className="flex items-center justify-center">
      <div className="relative flex flex-col items-center">
        <div className="ml-1 h-6 w-6 cursor-pointer items-center justify-center rounded-full md:ml-4 md:h-8 md:w-8">
          <Dropdown overlay={notificationList} trigger={['click']}>
            <Badge
              count={
                unReadNotification && unReadNotification.length > 0
                  ? unReadNotification.length
                  : 0
              }
              size="small"
              offset={[5, 0]}
            >
              <BellOutlined style={{ fontSize: '24px', color: '#00BFFF' }} />
            </Badge>
          </Dropdown>
        </div>

        <p className="ml-2 hidden text-sm md:block">Thông báo</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="ml-1 h-6 w-6 cursor-pointer items-center justify-center rounded-full md:ml-4 md:h-8 md:w-8">
          <Link href="/follow-list">
            <CartWrapper>
              <HeartOutlined style={{ fontSize: '24px', color: '#00BFFF' }} />
            </CartWrapper>
          </Link>
        </div>
        <p className="ml-2 hidden text-sm md:block">Yêu thích</p>
      </div>
      <div
        className="relative flex flex-col items-center justify-center"
        onClick={togglePopup}
      >
        <div className="ml-1 h-6 w-6 cursor-pointer items-center justify-center rounded-full md:ml-4 md:h-8 md:w-8">
          <Link href={userInfo ? '#' : '/login'}>
            <Account>
              {userInfo && userInfo.userRaw && userInfo.userRaw.avatar ? (
                <Image
                  src={userInfo.userRaw.avatar}
                  alt="User Account Icon"
                  width={1000}
                  height={1000}
                  className="h-6 w-6 rounded-full text-sky-500 md:h-8 md:w-8"
                />
              ) : (
                <UserOutlined style={{ fontSize: '24px', color: '#00BFFF' }} />
              )}
            </Account>
          </Link>
        </div>
        <p className="ml-2 hidden text-sm md:block">
          {userInfo && userInfo.userRaw && userInfo.userRaw.userName
            ? userInfo.userRaw.userName
            : 'Đăng nhập'}
        </p>
      </div>
      <AccountOptions
        showPopup={showPopup}
        popupRef={popupRef}
        setShowPopup={setShowPopup}
        userInfo={userInfo}
      />
    </div>
  );
};
export default RightHeader;
