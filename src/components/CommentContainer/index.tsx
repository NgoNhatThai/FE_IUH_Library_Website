import { useMemo, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import CommentIcon from '@/assets/svg/comment.svg';
import Image from 'next/image';
import { UserModal } from '@/models/userInfo';
import { userService } from '@/services/userService';
import { toast } from 'react-toastify';
import { CommentModel } from '@/models/commentModel';
interface CommentContainerProps {
  currentId?: string;
  comments?: CommentModel[];
  isChapterComment?: boolean;
}
const CommentContainer = ({
  currentId,
  comments,
  isChapterComment,
}: CommentContainerProps) => {
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState(comments || []);

  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const user: UserModal = useMemo(() => {
    return userInfo ? userInfo.userRaw : null;
  }, [userInfo]);

  const handleCommentChange = (e: any) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      setCommentsList([
        ...commentsList,
        {
          _id: '',
          reviewId: '',
          user: user,
          content: comment,
          postDate: '',
          createdAt: '',
          updatedAt: '',
          __v: 0,
        },
      ]);
      setComment('');
    }

    try {
      if (!isChapterComment) {
        const response = await userService.comment(
          user._id,
          String(currentId),
          comment,
        );
        if (response) {
          toast.success('Đã gửi bình luận', { position: 'bottom-right' });
        }
      } else {
        const response = await userService.commentChapter(
          user._id,
          String(currentId),
          comment,
        );
        if (response) {
          toast.success('Đã gửi bình luận', { position: 'bottom-right' });
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Gửi bình luận thất bại', { position: 'bottom-right' });
    }
  };

  return (
    <div className="rounded-md border-t border-gray-300 bg-gray-100 p-4 md:mt-5">
      <div className="mb-4 flex items-center space-x-4">
        <p className="justify-center text-lg font-semibold">Bình luận</p>

        <Image src={CommentIcon} alt="Comment Icon" width={30} height={30} />
      </div>

      {/* Ô nhập bình luận */}
      {user ? (
        <div className="mb-4 flex">
          <textarea
            value={comment}
            onChange={handleCommentChange}
            rows={3}
            className="flex-1 resize-none rounded-md border border-gray-300 p-2 text-sm"
            placeholder="Nhập bình luận của bạn..."
          />
          <button
            onClick={handleCommentSubmit}
            className="ml-2 flex items-center rounded-md bg-blue-500 px-4 py-2 text-white"
          >
            <FaPaperPlane className="mr-2 text-sm" /> Gửi
          </button>
        </div>
      ) : (
        <p className="mb-4 text-sm font-semibold text-red-500">
          Đăng nhập để bình luận
        </p>
      )}

      {/* Danh sách bình luận */}
      <div className="space-y-4">
        {commentsList.map((item, index) => (
          <div
            key={index}
            className="rounded-md border border-gray-300 bg-white p-2"
          >
            <p className="text-sm font-semibold">
              {typeof item?.user === 'object' && item?.user.userName}
            </p>
            <p className="text-sm">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentContainer;
