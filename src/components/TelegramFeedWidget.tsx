import React, { useEffect, useState, useRef } from 'react';

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

const TelegramFeedWidget: React.FC = () => {
  const [posts, setPosts] = useState<TelegramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const feedRef = useRef<HTMLDivElement>(null);
  const [modalPhoto, setModalPhoto] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
        setTimeout(() => {
          if (feedRef.current) {
            feedRef.current.scrollTop = feedRef.current.scrollHeight;
          }
        }, 100);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <span className="text-nature-green-600">Загрузка...</span>
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
        // Определяем, есть ли ссылка в тексте
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const firstUrlMatch = post.text.match(urlRegex);
        const firstUrl = firstUrlMatch ? firstUrlMatch[0] : null;
        // Удаляем первую ссылку из текста для отображения без дублирования
        let textWithoutFirstUrl = post.text;
        if (firstUrl) {
          textWithoutFirstUrl = post.text.replace(firstUrl, '').replace(/^\s+|\s+$/g, '');
        }
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
            {/* Ссылка (если есть) */}
            {firstUrl && (
              <div className="mb-1">
                <a
                  href={firstUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-3 py-2 rounded-lg bg-nature-green-50 text-nature-green-700 font-semibold underline hover:bg-nature-green-100 hover:text-nature-green-800 transition break-all shadow-sm"
                >
                  {firstUrl}
                </a>
              </div>
            )}
            {/* Фото поста */}
            {post.photo && (
              <div className="mb-2 rounded-lg overflow-hidden flex items-center justify-center bg-nature-green-50 cursor-zoom-in"
                   onClick={() => setModalPhoto(post.photo)}>
                <img
                  src={post.photo}
                  alt="media"
                  className="object-contain w-full max-w-full max-h-96 transition-transform duration-200 hover:scale-105"
                  style={{ borderRadius: '0.75rem' }}
                />
              </div>
            )}
            {/* Текст поста */}
            <div className="text-nature-green-700 text-base whitespace-pre-line leading-relaxed">
              {linkify(textWithoutFirstUrl)}
            </div>
            {/* Превью ссылки Telegram (preview) */}
            {post.preview && (
              <a
                href={post.preview.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-nature-green-200 rounded-lg overflow-hidden mt-2 hover:shadow-lg transition-shadow bg-nature-green-50"
              >
                <div className="flex">
                  <img
                    src={post.preview.image}
                    alt={post.preview.title}
                    className="w-20 h-20 object-cover flex-shrink-0"
                  />
                  <div className="p-2 flex-1">
                    <div className="font-semibold text-nature-green-800 mb-1 line-clamp-1">
                      {post.preview.title}
                    </div>
                    <div className="text-sm text-nature-green-600 line-clamp-2">
                      {post.preview.description}
                    </div>
                    <div className="text-xs text-nature-gold-600 mt-1 line-clamp-1">
                      {post.preview.url}
                    </div>
                  </div>
                </div>
              </a>
            )}
            {/* Превью ссылки ВК (vk_preview) */}
            {post.vk_preview && post.vk_preview.url && (
              <a
                href={post.vk_preview.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-nature-green-300 rounded-lg overflow-hidden mt-2 hover:shadow-lg transition-shadow bg-nature-green-50"
              >
                <div className="flex">
                  {post.vk_preview.image && (
                    <img
                      src={post.vk_preview.image}
                      alt={post.vk_preview.title}
                      className="w-20 h-20 object-cover flex-shrink-0 bg-gray-100"
                    />
                  )}
                  <div className="p-2 flex-1">
                    <div className="font-semibold text-nature-green-800 mb-1 line-clamp-1 flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#4C75A3] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1.01-1.49-.9-1.49.114v1.496c0 .4-.129.643-1.188.643-1.922 0-4.054-1.16-5.565-3.334-2.305-3.35-2.936-5.835-2.936-6.371 0-.24.097-.463.324-.463h1.744c.24 0 .33.1.423.33.972 2.652 2.608 4.966 3.28 4.966.255 0 .372-.117.372-.76v-2.914c-.07-1.186-.695-1.287-.695-1.71 0-.2.16-.4.42-.4h2.742c.203 0 .28.106.28.424v3.917c0 .204.093.285.15.285.255 0 .47-.117 1.147-.781 1.112-1.085 1.908-2.742 1.908-2.742.106-.22.27-.43.556-.43h1.744c.66 0 .8.34.66.8-.445 1.118-2.936 4.125-2.936 4.125-.18.22-.125.32 0 .525.093.14 1.017 1.003 1.5 1.608.24.304.378.604.123.804z"/></svg>
                      {post.vk_preview.title || 'Ссылка ВКонтакте'}
                    </div>
                    <div className="text-sm text-nature-green-600 line-clamp-2">
                      {post.vk_preview.description}
                    </div>
                    <div className="text-xs text-blue-700 mt-1 line-clamp-1 underline">
                      {post.vk_preview.url}
                    </div>
                  </div>
                </div>
              </a>
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