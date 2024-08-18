'use client';
import React, { useEffect, useState, useCallback } from 'react';
import TopIcon from '@/assets/svg/top.svg';
import Image from 'next/image';

interface ScrollToTopProps {
  elementId?: string;
  pageYOffset?: number;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({
  elementId,
  pageYOffset = 300,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState<HTMLElement | Window | null>(null);

  // Kiểm tra vị trí cuộn của trang để hiển thị hoặc ẩn nút cuộn
  const toggleVisibility = useCallback(() => {
    if (!element) return;
    const scrollTop =
      element instanceof Window ? window.pageYOffset : element.scrollTop;
    setIsVisible(scrollTop > pageYOffset);
  }, [element, pageYOffset]);

  // Cuộn lên đầu trang
  const scrollToTop = () => {
    if (element) {
      element.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    // Chỉ chạy trên client-side
    const targetElement = elementId
      ? document.getElementById(elementId)
      : window;
    if (targetElement) {
      setElement(targetElement);
    }
  }, [elementId]);

  useEffect(() => {
    if (!element) return;
    element.addEventListener('scroll', toggleVisibility);
    // Cleanup event listener on unmount
    return () => {
      element.removeEventListener('scroll', toggleVisibility);
    };
  }, [element, toggleVisibility]);

  return (
    <div className="fixed bottom-3 left-4 h-[40px] w-[40px] z-10 block">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="flex h-full w-full items-center mb-24 justify-center rounded-full bg-black bg-opacity-75 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 z-50"
        >
          <Image src={TopIcon} alt="Scroll to top" width={25} height={25} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
