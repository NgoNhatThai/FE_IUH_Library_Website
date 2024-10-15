import { formatterNumber } from '@/ultils/numberUtils';
import { Button, Modal } from 'antd';

interface QRModalProps {
  handleOpenOrCloseQRModal: () => void;
  visibleModal?: boolean;
  onCloseModal?: () => void;
  bankAccountDetail?: any;
  amount?: number;
  userId?: string;
  handleFinish?: () => void;
}

export const QRModal = ({
  handleOpenOrCloseQRModal,
  visibleModal,
  bankAccountDetail,
  amount,
  userId,
  handleFinish,
}: QRModalProps) => {
  return (
    <>
      <Modal
        open={visibleModal}
        title={`QR Thanh toán`}
        okText="Lưu thay đổi"
        cancelText="Hủy bỏ"
        className="sm:!w-[100%] md:!w-[80%] lg:!w-[80%] xl:!w-[50%] 2xl:!w-[40%]"
        onCancel={handleOpenOrCloseQRModal}
        footer={[
          <Button
            className="mr-4 rounded-md border-2 border-sky-500 text-sky-500 hover:scale-105"
            key="1"
            onClick={handleFinish}
          >
            Hoàn tất
          </Button>,
        ]}
      >
        <div className="grid w-full grid-cols-1 gap-4 py-10 lg:grid-cols-2">
          <div className="flex items-center justify-center">
            {/* &addInfo=${`${customerName} - ${customerPhoneNumber} thanh toan `} */}
            <img
              width={300}
              height={300}
              src={`https://img.vietqr.io/image/${bankAccountDetail?.bankId}-${bankAccountDetail?.accountNumber}-compact2.png?amount=${amount}&accountName=${bankAccountDetail?.accountName}&addInfo=${`${userId}`}`}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <span>Tên ngân hàng</span>
              <span className="font-bold">
                {bankAccountDetail?.bankName || ''}
              </span>
            </div>

            <div className="grid gap-2">
              <span>Tên chủ tài khoản</span>

              <span className="font-bold">
                {bankAccountDetail?.accountName || ''}
              </span>
            </div>

            <div className="grid gap-2">
              <span>Số tài khoản</span>

              <span className="font-bold">
                {bankAccountDetail?.accountNumber || ''}
              </span>
            </div>
            <div className="grid gap-2">
              <span>Số tiền</span>

              <span className="font-bold">
                {formatterNumber(amount?.toString()) || ''}
              </span>
            </div>

            <div className="grid gap-2">
              <span>Nội dung chuyển khoản</span>
              <span className="font-bold">{`${userId}`}</span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
