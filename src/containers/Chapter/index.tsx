'use client';
import React, { useEffect, useState } from 'react';
import { ChapterModel } from '@/models/chapterModel';
import ContinueReadingPopup from '@/components/ContinuePopup';
import PrevNextChapterButton from '@/components/PrevNextChapterButton';
import { HomeIcon } from 'lucide-react';
import CommentContainer from '@/components/CommentContainer';

const useIntersectionObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  isInitialized: boolean,
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!isInitialized) return; // Không làm gì nếu chưa hoàn thành render đầu tiên

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback(entry);
          }
        });
      },
      { threshold: 0.5 },
    );

    const elements = document.querySelectorAll('[data-observe]');
    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, [callback, isInitialized]);
};

const Chapter = ({ chapter }: { chapter: ChapterModel }) => {
  const [viewIndex, setViewIndex] = useState<number | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleSaveBookmark = () => {
    const storedBookmark = localStorage.getItem('@bookmark');
    let bookmarks: Array<{
      bookId?: string;
      chapterId?: string;
      pageIndex: number;
    }> = storedBookmark ? JSON.parse(storedBookmark) : [];

    const bookmarkIndex = bookmarks.findIndex(
      (bookmark) => bookmark.bookId === chapter.bookId,
    );

    if (bookmarkIndex === -1) {
      // Add new bookmark if it doesn't exist
      bookmarks.push({
        bookId: chapter.bookId,
        chapterId: chapter._id,
        pageIndex: 0,
      });
    } else {
      // Update existing bookmark
      setViewIndex(bookmarks[bookmarkIndex].pageIndex);
      bookmarks[bookmarkIndex] = {
        bookId: chapter.bookId,
        chapterId: chapter._id,
        pageIndex: bookmarks[bookmarkIndex].pageIndex,
      };
    }

    localStorage.setItem('@bookmark', JSON.stringify(bookmarks));
    setHasInitialized(true);
  };

  useEffect(() => {
    handleSaveBookmark();
  }, [chapter]);

  const currentIndex =
    chapter.allChapters?.findIndex((chap) => chap._id === chapter._id) ?? -1;

  const combinedItems = chapter.images
    ? chapter.images.map((image, index) => ({
        image,
        mp3: chapter.mp3s ? chapter.mp3s[index] : '',
      }))
    : [];

  useIntersectionObserver((entry) => {
    const id = entry.target.getAttribute('data-observe');
    if (id) {
      const storedBookmark = localStorage.getItem('@bookmark');
      let bookmarks: Array<{
        bookId?: string;
        chapterId?: string;
        pageIndex: number;
      }> = storedBookmark ? JSON.parse(storedBookmark) : [];

      const bookmarkIndex = bookmarks.findIndex(
        (bookmark) => bookmark.bookId === chapter.bookId,
      );
      bookmarks[bookmarkIndex] = {
        bookId: chapter.bookId,
        chapterId: chapter._id,
        pageIndex: Number(id),
      };
      localStorage.setItem('@bookmark', JSON.stringify(bookmarks));
    }
  }, hasInitialized);

  const handleOnClick = (id: number) => {
    const element = document.getElementById(String(id));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto mb-10 items-center justify-center p-4">
      <div className="items-center">
        <ContinueReadingPopup
          visible={!clicked}
          onClick={() => {
            if (viewIndex !== null) {
              handleOnClick(viewIndex);
              setClicked(true);
            }
          }}
        />
        <div className="flex items-center justify-start">
          <HomeIcon size={24} />
          <a href="/" className="md:text-md ml-2 text-sm font-medium">
            Trang chủ
          </a>
        </div>
        <h1 className="mb-4 text-center font-bold md:text-lg">
          {chapter.title}
        </h1>

        <PrevNextChapterButton chapter={chapter} currentIndex={currentIndex} />
      </div>

      <div className="mx-auto mb-8 flex flex-col items-center justify-center gap-4 md:w-1/2">
        {combinedItems.map((item, index) => (
          <div
            id={String(index)}
            key={index}
            data-observe={index}
            className="relative p-2"
          >
            {item.mp3 && (
              <audio controls className="mt-2 w-full">
                <source src={item.mp3} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            )}
            <img
              src={item.image}
              alt={`Page ${index + 1}`}
              className="mb-4 h-auto w-full rounded shadow-lg"
            />
          </div>
        ))}
      </div>

      <PrevNextChapterButton chapter={chapter} currentIndex={currentIndex} />

      <div>
        <CommentContainer />
      </div>
    </div>
  );
};

export default Chapter;
