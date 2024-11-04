'use client';
import React, { useEffect, useState, useRef } from 'react';
import { ChapterModel } from '@/models/chapterModel';
import ContinueReadingPopup from '@/components/ContinuePopup';
import PrevNextChapterButton from '@/components/PrevNextChapterButton';
import { HomeIcon } from 'lucide-react';
import CommentContainer from '@/components/CommentContainer';
import { CommentModel } from '@/models/commentModel';
import Image from 'next/image';
import Voice from '@/assets/images/voice.png';
import setting from '@/assets/images/setting.png';
import clear from '@/assets/images/clear.png';
import Modal from 'react-modal';
import {
  StepBackwardOutlined,
  StepForwardOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  StopOutlined,
  SettingOutlined,
} from '@ant-design/icons';

// Modal styles
const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

const useIntersectionObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  isInitialized: boolean,
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!isInitialized) return;

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
  // state liên quan đến voice
  const [isVoice, setIsVoice] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const synth = window.speechSynthesis;

  const [speechRate, setSpeechRate] = useState(1.0);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null,
  );
  const [isVoiceSettingsOpen, setIsVoiceSettingsOpen] = useState(false);
  const [pitch, setPitch] = useState(1.0);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const [paragraphs, setParagraphs] = useState<string[][]>([]);
  const paragraphRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const availableVoices = synth.getVoices();
    const filteredVoices = availableVoices.filter(
      (voice) => voice.lang.includes('vi') || voice.lang.includes('en'),
    );
    const defaultVoice =
      filteredVoices.find((voice) => voice.lang.includes('vi')) ||
      filteredVoices.find((voice) => voice.lang.includes('en'));

    setVoices(filteredVoices);
    setSelectedVoice(defaultVoice || null);
  }, []);

  // Tách nội dung thành các câu dựa vào dấu câu và giữ từng đoạn riêng biệt
  useEffect(() => {
    if (chapter?.text && chapter.text.length > 0) {
      const paragraphArray = chapter.text.slice(1).map((paragraph: string) => {
        return paragraph.replace(/\n \n/g, '##BREAK##').replace(/\n/g, ' ');
      });
      const voiceParagraphs = paragraphArray.map((p) => p.split('##BREAK##'));
      setParagraphs(voiceParagraphs);
    }
  }, [chapter]);

  const speakSentence = (paragraphIndex: number, sentenceIndex: number) => {
    if (
      paragraphIndex < paragraphs.length &&
      sentenceIndex < paragraphs[paragraphIndex].length
    ) {
      const sentence = paragraphs[paragraphIndex][sentenceIndex];
      const utter = new SpeechSynthesisUtterance(sentence);
      utter.rate = speechRate;
      utter.pitch = pitch;
      if (selectedVoice) utter.voice = selectedVoice;

      // Cuộn thẻ P hiện tại vào giữa màn hình
      if (sentenceRefs.current[paragraphIndex]) {
        setTimeout(() => {
          // Thêm thời gian chờ để cuộn sau khi đoạn được gắn
          sentenceRefs.current[paragraphIndex]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }, 200); // Thời gian chờ 200ms
      }

      utter.onend = () => {
        if (
          !isPaused &&
          sentenceIndex < paragraphs[paragraphIndex].length - 1
        ) {
          setCurrentSentenceIndex(sentenceIndex + 1);
          speakSentence(paragraphIndex, sentenceIndex + 1);
        } else if (
          sentenceIndex === paragraphs[paragraphIndex].length - 1 &&
          paragraphIndex < paragraphs.length - 1
        ) {
          setCurrentParagraphIndex(paragraphIndex + 1);
          setCurrentSentenceIndex(0);

          // Thêm thời gian chờ khi chuyển trang
          setTimeout(() => {
            // Cuộn đoạn văn đầu tiên của trang mới ngay lập tức khi chuyển trang
            if (sentenceRefs.current[paragraphIndex + 1]) {
              sentenceRefs.current[paragraphIndex + 1]?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              });
            }
            speakSentence(paragraphIndex + 1, 0);
          }, 200); // Thời gian chờ 200ms để đảm bảo cuộn mượt mà
        }
      };

      synth.speak(utter);
    }
  };

  const handlePlay = () => {
    if (!synth.speaking || synth.paused) {
      setIsPaused(false);
      if (synth.paused) {
        synth.resume();
      } else {
        speakSentence(currentParagraphIndex, currentSentenceIndex);
      }
    }
  };

  const handlePause = () => {
    if (synth.speaking && !synth.paused) {
      synth.pause();
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    synth.cancel();
    setIsPaused(true);
    setCurrentSentenceIndex(0);
    setCurrentParagraphIndex(0);
    setIsVoice(false);
  };

  const handleStepBackward = () => {
    synth.cancel();
    const newSentenceIndex =
      currentSentenceIndex > 0 ? currentSentenceIndex - 1 : 0;
    const newParagraphIndex =
      currentSentenceIndex === 0 && currentParagraphIndex > 0
        ? currentParagraphIndex - 1
        : currentParagraphIndex;

    setCurrentParagraphIndex(newParagraphIndex);
    setCurrentSentenceIndex(newSentenceIndex);

    if (!isPaused) {
      speakSentence(newParagraphIndex, newSentenceIndex);
    }
  };

  const handleStepForward = () => {
    synth.cancel();

    const newSentenceIndex =
      currentSentenceIndex < paragraphs[currentParagraphIndex].length - 1
        ? currentSentenceIndex + 1
        : 0;
    const newParagraphIndex =
      currentSentenceIndex === paragraphs[currentParagraphIndex].length - 1 &&
      currentParagraphIndex < paragraphs.length - 1
        ? currentParagraphIndex + 1
        : currentParagraphIndex;

    setCurrentParagraphIndex(newParagraphIndex);
    setCurrentSentenceIndex(newSentenceIndex);

    if (!isPaused) {
      speakSentence(newParagraphIndex, newSentenceIndex);
    }
  };
  useEffect(() => {
    if (synth.speaking) {
      synth.cancel();
      setTimeout(() => {
        speakSentence(currentParagraphIndex, currentSentenceIndex);
      }, 0);
    }
  }, [speechRate]);

  useEffect(() => {
    if (synth.speaking) {
      synth.cancel();
      setTimeout(() => {
        speakSentence(currentParagraphIndex, currentSentenceIndex);
      }, 0);
    }
  }, [pitch]);

  useEffect(() => {
    if (synth.speaking) {
      synth.cancel();
      setTimeout(() => {
        speakSentence(currentParagraphIndex, currentSentenceIndex);
      }, 0);
    }
  }, [selectedVoice]);

  const sentenceRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const renderText = () => {
    return paragraphs.map(
      (paragraphGroup: string[], paragraphIndex: number) => {
        return (
          <div
            key={paragraphIndex}
            className="paragraph-container relative mb-6 rounded-lg bg-white shadow-lg md:p-24 md:pb-32 md:pt-32"
            style={{ marginBottom: '1.5em' }}
          >
            {paragraphGroup.map((part, partIndex) => {
              const isCurrentParagraph =
                paragraphIndex === currentParagraphIndex;
              const isCurrentSentence =
                isCurrentParagraph && partIndex === currentSentenceIndex;

              return (
                <p
                  key={partIndex}
                  style={{
                    whiteSpace: 'pre-wrap',
                    fontSize: fontSize,
                    letterSpacing: '0.1em',
                    lineHeight: '1.8',
                    color: textColor,
                    fontFamily: fontFamily,
                    backgroundColor: bgColor,
                  }}
                  ref={(el) => {
                    if (isCurrentSentence) {
                      sentenceRefs.current[paragraphIndex] = el; // Gắn ref cho câu hiện tại
                    }
                  }}
                >
                  <span
                    style={{
                      backgroundColor:
                        isVoice && isCurrentSentence ? 'yellow' : '',
                    }}
                  >
                    {part + ' '}
                  </span>

                  {partIndex < paragraphGroup.length - 1 && (
                    <>
                      <br />{' '}
                    </>
                  )}
                </p>
              );
            })}
          </div>
        );
      },
    );
  };

  //============================================
  // state liên quan đến setting
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('fontSize') || '18px';
  });
  const [textColor, setTextColor] = useState(() => {
    return localStorage.getItem('textColor') || '#000000';
  });
  const [bgColor, setBgColor] = useState(() => {
    return localStorage.getItem('bgColor') || '#f3f4f6';
  });
  const [fontFamily, setFontFamily] = useState(() => {
    return localStorage.getItem('fontFamily') || 'Arial';
  });

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('textColor', textColor);
  }, [textColor]);

  useEffect(() => {
    localStorage.setItem('bgColor', bgColor);
  }, [bgColor]);

  useEffect(() => {
    localStorage.setItem('fontFamily', fontFamily);
  }, [fontFamily]);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
      bookmarks.push({
        bookId: chapter.bookId,
        chapterId: chapter._id,
        pageIndex: 0,
      });
    } else {
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

  const combinedItems = chapter.text
    ? chapter.text.slice(1).map((text, index) => ({
        text,
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

  const isCommentModelArray = (array: any[]): array is CommentModel[] => {
    return array.every(
      (item) =>
        item && typeof item === 'object' && '_id' in item && 'content' in item,
    );
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

      <div className="mx-auto mb-8 flex flex-col items-center justify-center gap-4 md:w-2/3">
        {renderText()}
      </div>

      <PrevNextChapterButton chapter={chapter} currentIndex={currentIndex} />

      <div>
        <CommentContainer
          currentId={chapter._id}
          isChapterComment={true}
          comments={
            typeof chapter?.comments === 'object' &&
            Array.isArray(chapter?.comments) &&
            isCommentModelArray(chapter.comments)
              ? chapter.comments
              : []
          }
        />
      </div>
      {/* button setting */}
      <div
        className="fixed right-6 top-1/4 z-10 block h-[40px] w-[40px]"
        style={{
          top: '20%',
        }}
      >
        <button
          className="z-50 mb-24 flex h-full w-full items-center justify-center rounded-full bg-opacity-75 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={openModal}
        >
          <Image src={setting} alt="Settings" width={25} height={25} />
        </button>
      </div>
      {/* button show voice */}
      <div
        className="fixed top-1/4 z-10 block h-[40px] w-[40px]"
        style={{
          top: '20%',
          right: '5%',
        }}
      >
        <button
          className="z-50 mb-24 flex h-full w-full items-center justify-center rounded-full bg-opacity-75 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={() => {
            handlePlay();
            setIsVoice(true);
          }}
        >
          <Image src={Voice} alt="Voice" width={25} height={25} />
        </button>
      </div>
      {/* modal setting */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Settings Modal"
      >
        <button
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            border: 'none',
            background: 'transparent',
            fontSize: '20px',
            cursor: 'pointer',
          }}
          onClick={closeModal}
        >
          &times;
        </button>

        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Cài đặt</h2>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <label style={{ marginRight: '10px', flex: 1 }}>Cỡ chữ:</label>
          <input
            type="range"
            min="12"
            max="36"
            value={parseInt(fontSize)}
            onChange={(e) => setFontSize(e.target.value + 'px')}
            style={{ flex: 2 }}
          />
          <button
            onClick={() => {
              setFontSize('18px');
              localStorage.removeItem('fontSize');
            }}
            style={{
              marginLeft: '10px',
              border: 'none',
              cursor: 'pointer',
              padding: '5px',
              borderRadius: '5px',
            }}
          >
            <Image src={clear} alt="Settings" width={25} height={25} />
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <label style={{ marginRight: '10px', flex: 1 }}>Màu chữ:</label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            style={{ flex: 2 }}
          />
          <button
            onClick={() => {
              setTextColor('#000000');
              localStorage.removeItem('textColor');
            }}
            style={{
              marginLeft: '10px',
              border: 'none',
              cursor: 'pointer',
              padding: '5px',
              borderRadius: '5px',
            }}
          >
            <Image src={clear} alt="Settings" width={25} height={25} />
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <label style={{ marginRight: '10px', flex: 1 }}>Màu nền:</label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            style={{ flex: 2 }}
          />
          <button
            onClick={() => {
              setBgColor('#f3f4f6');
              localStorage.removeItem('bgColor');
            }}
            style={{
              marginLeft: '10px',
              border: 'none',
              cursor: 'pointer',
              padding: '5px',
              borderRadius: '5px',
            }}
          >
            <Image src={clear} alt="Settings" width={25} height={25} />
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <label style={{ marginRight: '10px', flex: 1 }}>Phông chữ:</label>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            style={{ flex: 2, padding: '8px' }}
          >
            <option value="Arial">Arial</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Verdana">Verdana</option>
            <option value="cursive">Cursive</option>
          </select>
          <button
            onClick={() => {
              setFontFamily('Arial');
              localStorage.removeItem('fontFamily');
            }}
            style={{
              marginLeft: '10px',
              border: 'none',
              cursor: 'pointer',
              padding: '5px',
              borderRadius: '5px',
            }}
          >
            <Image src={clear} alt="Settings" width={25} height={25} />
          </button>
        </div>

        <button
          onClick={() => {
            setFontSize('18px');
            setTextColor('#000000');
            setBgColor('#f3f4f6');
            setFontFamily('Arial');

            localStorage.removeItem('fontSize');
            localStorage.removeItem('textColor');
            localStorage.removeItem('bgColor');
            localStorage.removeItem('fontFamily');
          }}
          style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            backgroundColor: '#ff4d4f',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
      </Modal>
      {isVoice && (
        <div className="fixed bottom-5 left-1/2 z-10 flex h-[60px] w-auto -translate-x-1/2 transform items-center justify-center space-x-4 rounded-md px-4 shadow-lg">
          <button
            onClick={handleStepBackward}
            className="flex h-12 w-12 items-center justify-center focus:outline-none"
          >
            <StepBackwardOutlined style={{ fontSize: '24px' }} />
          </button>
          <button
            onClick={() => {
              if (isPaused) {
                setIsPaused(false);
                handlePlay();
              } else {
                setIsPaused(true);
                handlePause();
              }
            }}
            className="flex h-12 w-12 items-center justify-center focus:outline-none"
          >
            {isPaused ? (
              <PlayCircleOutlined style={{ fontSize: '30px' }} />
            ) : (
              <PauseCircleOutlined style={{ fontSize: '30px' }} />
            )}
          </button>
          <button
            onClick={handleStepForward}
            className="flex h-12 w-12 items-center justify-center focus:outline-none"
          >
            <StepForwardOutlined style={{ fontSize: '24px' }} />
          </button>
          <button
            onClick={handleStop}
            className="flex h-12 w-12 items-center justify-center focus:outline-none"
          >
            <StopOutlined style={{ fontSize: '24px' }} />
          </button>
          <button
            onClick={() => setIsVoiceSettingsOpen(true)}
            className="flex h-12 w-12 items-center justify-center focus:outline-none"
          >
            <SettingOutlined style={{ fontSize: '24px' }} />
          </button>
        </div>
      )}
      {/* Modal cài đặt voice */}
      <Modal
        isOpen={isVoiceSettingsOpen}
        onRequestClose={() => setIsVoiceSettingsOpen(false)}
        style={customModalStyles}
        contentLabel="Voice Settings Modal"
      >
        <button
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            border: 'none',
            background: 'transparent',
            fontSize: '20px',
            cursor: 'pointer',
          }}
          onClick={() => setIsVoiceSettingsOpen(false)}
        >
          &times;
        </button>

        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          Voice Settings
        </h2>

        <div style={{ marginBottom: '20px' }}>
          <label>Speech Rate: {speechRate}</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={speechRate}
            onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Pitch: {pitch}</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => setPitch(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Voice:</label>
          <select
            value={selectedVoice ? selectedVoice.name : ''}
            onChange={(e) => {
              const selected = voices.find(
                (voice) => voice.name === e.target.value,
              );
              setSelectedVoice(selected || null);
            }}
            style={{ width: '100%', padding: '8px' }}
          >
            {voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>
      </Modal>
    </div>
  );
};

export default Chapter;
