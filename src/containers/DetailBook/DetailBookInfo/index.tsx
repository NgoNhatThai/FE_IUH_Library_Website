'use client';
import React, { useMemo } from 'react';
import { formatCurrencyVND } from '@/ultils/number';
import { Star, StarHalf } from 'lucide-react';
import img from '@/assets/images/no-image.png';
import CustomImage from '@/components/Image';
import { BookModel } from '@/models/bookModel';
import { useRouter } from 'next/navigation';
import { CHAPTER } from '@/constants';
import { userService } from '@/services/userService';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import { UserModal } from '@/models/userInfo';
import { LockOutlined } from '@ant-design/icons';
import { QueryKey } from '@/types/api';
import ConfirmModal from '@/components/ConfirmModal';

const DetailBookInfo = ({ data }: { data: BookModel }) => {
  const rating = 5;
  const router = useRouter();
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  const [openModal, setOpenModal] = React.useState(false);

  const handleOnClick = (id: string) => {
    router.push(`${CHAPTER}/${id}`);
  };

  const bookmark = JSON.parse(localStorage.getItem('@bookmark') || '[]');

  const user: UserModal = useMemo(() => {
    return userInfo ? userInfo.userRaw : null;
  }, [userInfo]);

  const { data: isFollow } = useQuery({
    queryKey: [QueryKey.BOOK],
    queryFn: async () =>
      await userService.checkFollowBook(String(user?._id), String(data._id)),
    refetchOnWindowFocus: false,
    enabled: Boolean(data._id),
  });

  const { data: userBookMark } = useQuery({
    queryKey: [QueryKey.USER_BOOKMARK],
    queryFn: async () =>
      await userService.getUserBookMark(String(user?._id), String(data._id)),
    refetchOnWindowFocus: false,
    enabled: Boolean(data._id),
  });

  const isBuy = useMemo(() => {
    if (userBookMark && userBookMark.isBuy) {
      return true;
    }
    return false;
  }, [userBookMark]);

  const handleUpdateFollowStatus = async () => {
    if (!isFollow) {
      if (user && user._id && data._id) {
        const followResult = await userService.follow(user._id, data._id);
        if (followResult) {
          toast.success('Theo dõi thành công');
        } else {
          toast.error('Theo dõi thất bại');
        }
      }
    } else {
      const unfollowResult = await userService.unfollow(
        user._id,
        String(data._id),
      );
      if (unfollowResult) toast.success('Bỏ theo dõi thành công');
    }
  };

  const handleBuyBook = async (bookId: string) => {
    try {
      if (!user) {
        toast.error('Bạn cần đăng nhập để mua sách');
        return;
      }
      if (bookId) {
        const response: { status?: number } = await userService.buyBook({
          userId: user._id,
          bookId,
        });
        if (response.status === 200) {
          toast.success('Mua sách thành công');
          window.location.reload();
        } else if (response.status === 404) {
          toast.error('Số dư không đủ !');
        } else {
          toast.error('Mua sách thất bại');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Có lỗi xảy ra');
    }
  };

  return (
    <div className="container p-2">
      <div className="flex flex-col gap-4 md:flex-row">
        <CustomImage
          avatarMetadata={data.image}
          alt="book"
          className="h-full w-full rounded-md object-contain md:h-1/3 md:w-1/3"
          errorSrc={img.src}
        />
        <div className="mt-2 h-full w-full">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold md:text-2xl">{data?.title}</p>
          </div>

          <div className="flex items-center gap-2">
            {data.price ? (
              <span className="text-grey-900 text-2xl font-semibold">
                {formatCurrencyVND(Number(data?.price))}
              </span>
            ) : (
              <span className="text-grey-900 text-2xl font-semibold">
                Miễn phí
              </span>
            )}
          </div>

          <div className="mt-2 flex w-full items-center gap-2">
            <div className="flex flex-grow items-center gap-1">
              <span className="mr-1 rounded-sm bg-orange-400 px-1">
                {rating}
              </span>
              {Array.from({ length: rating }, (_, index) => {
                let num = index + 0.5;
                return (
                  <span key={index}>
                    {rating >= index + 1 ? (
                      <Star strokeWidth={3} size={18} color="#FF8922" />
                    ) : rating >= num ? (
                      <StarHalf strokeWidth={3} size={18} color="#FF8922" />
                    ) : (
                      ''
                    )}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="mt-4">
            <p className="md:text-md text-sm text-gray-600">
              Danh mục:
              <span className="ml-2 text-gray-700">
                {typeof data?.categoryId === 'object' &&
                data?.categoryId !== null
                  ? data.categoryId.name
                  : 'Đang cập nhật'}
              </span>
            </p>

            <p className="md:text-md text-sm text-gray-600">
              Tác giả:{' '}
              <span className="text-gray-700">
                {typeof data?.authorId === 'object' && data?.authorId !== null
                  ? data.authorId.name
                  : 'Đang cập nhật'}
              </span>
            </p>
            <p className="md:text-md text-sm text-gray-600">
              Lượt xem:{' '}
              <span className="text-gray-700">
                {(typeof data.review === 'object' && data.review.totalView) ||
                  ''}
              </span>
            </p>
            <p className="md:text-md text-sm text-gray-600">
              Tình trạng:{' '}
              <span className="text-gray-700">
                {data.status === 'PUBLISH' ? 'Đang phát hành' : 'Tạm ngưng'}
              </span>
            </p>
          </div>

          {(data?.price && data.price <= 0) || isBuy ? (
            <div className="mt-6 flex gap-2">
              <button
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={() => {
                  const chapter: { _id?: string } =
                    typeof data?.content === 'object' &&
                    data.content &&
                    data.content.chapters
                      ? data.content.chapters[0]
                      : {};
                  handleOnClick(chapter._id + '');
                }}
              >
                Đọc từ đầu
              </button>
              {bookmark && bookmark.length > 0 ? (
                <button
                  className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                  onClick={() => {
                    bookmark.length > 0 &&
                      bookmark.map((item: any) => {
                        if (item.bookId === data._id) {
                          handleOnClick(item.chapterId);
                        }
                      });
                  }}
                >
                  Đọc tiếp
                </button>
              ) : (
                <></>
              )}
              <button
                className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                onClick={() => {
                  handleUpdateFollowStatus();
                }}
              >
                {isFollow ? 'Bỏ theo dõi' : 'Theo dõi'}
              </button>
            </div>
          ) : (
            <div className="mt-6 flex gap-2">
              <button
                className="flex items-center rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                <LockOutlined className="mr-2" /> Mua sách
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 w-full p-4 text-sm shadow-md md:mt-4 md:shadow-none">
        <h3 className="text-lg font-semibold">Nội dung sách</h3>
        <span>{data.desc}</span>
      </div>
      <ConfirmModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        onConfirm={() => {
          handleBuyBook(String(data._id));
        }}
        title={`Xác nhận mua ${data.title} với giá ${formatCurrencyVND(Number(data?.price))} ?`}
      />
    </div>
  );
};

export default DetailBookInfo;
