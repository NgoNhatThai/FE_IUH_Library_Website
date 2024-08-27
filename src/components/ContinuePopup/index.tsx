import React from 'react';

const ContinueReadingPopup = ({
  visible,
  onClick,
}: {
  visible: boolean;
  onClick: () => void;
}) => {
  if (!visible) return null;

  return (
    <div className="z-999 fixed right-5 top-20">
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white shadow-lg"
        onClick={onClick}
      >
        Đọc tiếp
      </button>
    </div>
  );
};

export default ContinueReadingPopup;
