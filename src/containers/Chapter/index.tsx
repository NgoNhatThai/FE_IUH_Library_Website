import React from 'react';
import { ChapterModel } from '@/models/chapterModel';

const Chapter = ({ chapter }: { chapter: ChapterModel }) => {
  return (
    <div className="container mx-auto items-center justify-center p-4">
      {/* header */}
      <div className="items-center">
        <h1 className="mb-4 text-center text-2xl font-bold">{chapter.title}</h1>

        {/* Nút chuyển chapter và thẻ select chọn chap */}
        <div className="mb-4 flex items-center justify-center">
          <button className="rounded bg-blue-500 px-4 py-2 text-white shadow-lg">
            Chương trước
          </button>
          {/* <select className="px-4 py-2 bg-gray-200 rounded shadow-lg">
          {chapter.book?.chapters &&
          chapter.book.chapters.map((chap, index) => (
              <option key={index} value={chap._id}>
              {chap.title}
              </option>
          ))}
      </select> */}
          <button className="rounded bg-blue-500 px-4 py-2 text-white shadow-lg">
            Chương sau
          </button>
        </div>
      </div>

      {/* Thư viện hình ảnh */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {chapter.images &&
          chapter.images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img}
                alt={`Hình ảnh ${index + 1}`}
                className="h-auto w-full rounded shadow-lg"
              />
            </div>
          ))}
      </div>

      {/* Trình phát âm thanh */}
      <div className="mb-8">
        {chapter.mp3s &&
          chapter.mp3s.map((mp3, index) => (
            <div key={index} className="mb-4">
              <audio controls className="w-full">
                <source src={mp3} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))}
      </div>

      {/* Footer*/}
      <div>
        <div className="mb-4 flex items-center justify-center">
          <button className="rounded bg-blue-500 px-4 py-2 text-white shadow-lg">
            Chương trước
          </button>
          {/* <select className="px-4 py-2 bg-gray-200 rounded shadow-lg">
          {chapter.book?.chapters &&
          chapter.book.chapters.map((chap, index) => (
              <option key={index} value={chap._id}>
              {chap.title}
              </option>
          ))}
      </select> */}
          <button className="rounded bg-blue-500 px-4 py-2 text-white shadow-lg">
            Chương sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chapter;
