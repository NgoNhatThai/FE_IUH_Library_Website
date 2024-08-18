'use client';
import { CMS_CATEGORY_SLUG } from '@/constants';
import { ImageModel, OrganizationModel } from '@/models';
import { RootState } from '@/redux';
import { cmsCategoryService } from '@/services/cmsCategoryService';
import { QueryKey } from '@/types/api';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Modal from 'react-modal';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import Image from 'next/image';

interface CustomStyles {
  content: {
    top: string;
    left: string;
    right: string;
    bottom: string;
    marginRight: string;
    transform: string;
    padding: string;
    border: string;
    borderRadius: string;
    maxWidth?: string;
    width: string;
    maxHeight?: string;
    backgroundColor: string;
    aspectRatio?: string;
  };
  overlay: {
    backgroundColor: string;
  };
}

const getUrlFromAvatarMeta = (avatarMeta: ImageModel[]) => {
  if (!avatarMeta || avatarMeta.length === 0) {
    return '';
  }
  const avatar = avatarMeta[0];
  return avatar.large?.url || avatar.medium?.url || avatar.small?.url || '';
};

const ProModal: React.FC = () => {
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const storeInfo = useSelector<RootState, OrganizationModel>(
    (state) => state?.storeStore?.storeInfo,
  );
  const { data: homeBannerConfig, isLoading: isLoadingHomeBannerConfig } =
    useQuery({
      queryKey: [QueryKey.CMS, storeInfo?.id],
      queryFn: async () =>
        await cmsCategoryService.getCategoryBySlug(
          CMS_CATEGORY_SLUG.BANNER_ADVERTISEMENT,
          storeInfo?.id,
        ),
      refetchOnWindowFocus: false,
      enabled: Boolean(storeInfo?.id),
    });

  useEffect(() => {
    // if (homeBannerConfig) {
    //   const bannerSessionId = sessionStorage.getItem('bannerSessionId');
    //   if (Number(bannerSessionId) === Number(homeBannerConfig?.id)) {
    //     return;
    //   } else {
    //     setIsOpen(true);
    //     sessionStorage.setItem('bannerSessionId', homeBannerConfig?.id + '');
    //   }
    // }
  }, [homeBannerConfig]);

  const afterOpenModal = () => {
    if (subtitleRef.current) {
      subtitleRef.current.style.color = '#f00';
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    return () => {
      if (subtitleRef.current) {
        subtitleRef.current.style.color = '';
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const customStyles: CustomStyles = useMemo(
    () => ({
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '15px',
        border: 'none',
        borderRadius: '8px',
        maxWidth:
          windowWidth > 1000 ? '36%' : windowWidth > 768 ? '50%' : '90%',
        width: '100%',
        backgroundColor: 'transparent',
        zIndex: 9999,
        aspectRatio: '13/10',
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    }),
    [windowWidth],
  );

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="flex flex-col gap-2">
        <Image
          src={getUrlFromAvatarMeta(homeBannerConfig?.avatarMetadata!)}
          width={1000}
          height={10000}
          alt="banner"
        />
        <div className="flex w-full items-center justify-center">
          <span
            className="cursor-pointer text-center text-sm text-white"
            onClick={() => setIsOpen(false)}
          >
            Đóng
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default ProModal;
