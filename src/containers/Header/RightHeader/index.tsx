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
        dataSource={notificationData?.data}
        renderItem={(item: Notify) => (
          <List.Item>
            <List.Item.Meta
              className={`${item.status === 'UNREAD' ? '' : 'bg-gray-100'} p-2`}
              title={
                <div>
                  {item?.requestId ? (
                    <>
                      <DollarOutlined
                        style={{
                          fontSize: '16px',
                          color: '#52c41a',
                          marginRight: '8px',
                        }}
                      />
                      {'Thông báo nạp tiền'}
                    </>
                  ) : (
                    <>
                      <NotificationOutlined
                        style={{
                          fontSize: '16px',
                          color: '#1890ff',
                          marginRight: '8px',
                        }}
                      />
                      {'Thông báo thêm chương'}
                    </>
                  )}
                </div>
              }
              description={
                <a
                  className="cursor-pointer"
                  href={`${item?.bookId && item?.chapterId ? `/chapter/${item.chapterId}` : `/user-info`}`}
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
                  {item?.message || 0}
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
