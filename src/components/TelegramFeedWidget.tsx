import React, { useEffect, useState, useRef } from 'react';
import useSWR, { mutate } from 'swr';

interface TelegramPost {
  id: number;
  text: string;
  date: string;
  photo?: string;
  link?: string;
  preview?: {
    title: string;
    description: string;
    image: string;
    url: string;
  };
  vk_preview?: {
    title: string;
    description: string;
    image: string;
    url: string;
  };
}

const API_URL = 'https://telegram-widget-backend.onrender.com/api/telegram';
const GROUP_NAME = "Каменный берег - База отдыха";

// Добавляем функцию linkify
function linkify(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, i) =>
    urlRegex.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 underline break-all"
      >
        {part}
      </a>
    ) : (
      part
    )
  );
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const TelegramFeedWidget: React.FC = () => {
  const feedRef = useRef<HTMLDivElement>(null);
  const { data: posts, isLoading } = useSWR(API_URL, fetcher, {
    dedupingInterval: 60 * 60 * 1000, // 1 час
    revalidateOnFocus: false,
  });
  const [modalPhoto, setModalPhoto] = useState<string | null>(null);
  const [showRefresh, setShowRefresh] = useState(false);

  useEffect(() => {
    if (!isLoading && feedRef.current) {
      setTimeout(() => {
        feedRef.current!.scrollTop = feedRef.current!.scrollHeight;
      }, 100);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setShowRefresh(true), 3000);
      return () => clearTimeout(timer);
    } else {
      setShowRefresh(false);
    }
  }, [isLoading]);

  if (isLoading || !posts) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full gap-4">
        <span className="text-nature-green-600">Загрузка...</span>
        {showRefresh && (
          <button
            onClick={() => mutate(API_URL)}
            className="px-4 py-2 rounded-lg bg-nature-green-600 text-white font-semibold hover:bg-nature-green-700 transition shadow"
          >
            Обновить
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      ref={feedRef}
      className="w-full h-[600px] lg:h-[800px] overflow-y-auto bg-[#f0f9f4] p-4 space-y-4 rounded-2xl shadow-2xl scrollbar-thin scrollbar-thumb-nature-green-200 scrollbar-track-white"
      style={{ boxShadow: '0 4px 32px 0 rgba(45,154,91,0.08)' }}
    >
      {posts.map(post => {
        // Определяем, есть ли валидный vk_preview
        const hasVk = post.vk_preview && (post.vk_preview.image || post.vk_preview.description);
        const image = hasVk && post.vk_preview.image ? post.vk_preview.image : post.photo;
        const description = hasVk ? post.vk_preview.description : null;
        const vkUrl = hasVk ? post.vk_preview.url : null;
        // Удаляем ссылку на ВК из текста, если она есть
        let text = post.text;
        if (vkUrl) {
          text = text.replace(vkUrl, '').replace(/^\s+|\s+$/g, '');
        }
        // Не рендерим пустые посты
        if (!text && !image && !description) return null;
        return (
          <div
            key={post.id}
            className="bg-white rounded-2xl shadow-lg flex flex-col gap-2 px-4 py-3 border border-nature-green-100 relative"
            style={{ boxShadow: '0 4px 24px 0 rgba(45,154,91,0.10)' }}
          >
            {/* Название группы */}
            <div className="font-bold text-lg text-orange-400 bg-nature-gold-50 rounded-t-xl px-3 py-2 -mx-4 -mt-3 mb-1 tracking-tight">
              {GROUP_NAME}
            </div>
            {/* Текст поста (без ссылки на ВК) */}
            {text && (
              <div className="text-nature-green-700 text-base whitespace-pre-line leading-relaxed">
                {linkify(text)}
              </div>
            )}
            {/* Фото (из ВК превью или из ТГ) */}
            {image && (
              <div className="mb-2 rounded-lg overflow-hidden flex items-center justify-center bg-nature-green-50 cursor-zoom-in"
                   onClick={() => setModalPhoto(image)}>
                <img
                  src={image}
                  alt="media"
                  loading="lazy"
                  className="object-contain w-full max-w-full max-h-96 transition-transform duration-200 hover:scale-105"
                  style={{ borderRadius: '0.75rem' }}
                />
              </div>
            )}
            {/* Описание из ВК (если есть) */}
            {description && (
              <div className="text-nature-green-700 text-base whitespace-pre-line leading-relaxed mb-2">
                {description}
              </div>
            )}
            {/* Ссылка на ВК (если есть) */}
            {vkUrl && (
              <div className="mb-1">
                <a
                  href={vkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-3 py-2 rounded-lg bg-nature-green-50 text-blue-700 font-semibold underline hover:bg-blue-800 transition break-all shadow-sm"
                >
                  {vkUrl}
                </a>
              </div>
            )}
            {/* Дата */}
            <div className="text-xs text-nature-green-400 mt-2 text-right select-none">
              {new Date(post.date).toLocaleString('ru-RU', {
                day: '2-digit', month: '2-digit', year: '2-digit',
                hour: '2-digit', minute: '2-digit'
              })}
            </div>
          </div>
        );
      })}
      {/* Модальное окно для увеличенного фото */}
      {modalPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
          onClick={() => setModalPhoto(null)}
        >
          <div className="relative max-w-3xl w-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <img
              src={modalPhoto}
              alt="Увеличенное фото"
              loading="lazy"
              className="max-h-[90vh] max-w-full rounded-2xl shadow-2xl border-4 border-white"
            />
            <button
              className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100 transition"
              onClick={() => setModalPhoto(null)}
              aria-label="Закрыть"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TelegramFeedWidget; 