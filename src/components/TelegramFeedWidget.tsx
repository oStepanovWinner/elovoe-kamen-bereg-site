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
}

const API_URL = 'https://telegram-widget-backend.onrender.com/api/telegram';

const TelegramFeedWidget: React.FC = () => {
  const [posts, setPosts] = useState<TelegramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const feedRef = useRef<HTMLDivElement>(null);

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
      {posts.map(post => (
        <div
          key={post.id}
          className="bg-white rounded-xl shadow flex flex-col gap-2 px-4 py-3 border border-nature-green-100 relative"
        >
          {/* Фото поста */}
          {post.photo && (
            <div className="mb-2 rounded-lg overflow-hidden flex items-center justify-center bg-nature-green-50">
              <img
                src={post.photo}
                alt="media"
                className="object-contain w-full max-w-full max-h-96"
                style={{ borderRadius: '0.75rem' }}
              />
            </div>
          )}
          {/* Текст поста */}
          <div className="text-nature-green-800 text-base whitespace-pre-line leading-relaxed">
            {post.text}
          </div>
          {/* Превью ссылки */}
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
          {/* Дата */}
          <div className="text-xs text-nature-green-400 mt-2 text-right select-none">
            {new Date(post.date).toLocaleString('ru-RU', {
              day: '2-digit', month: '2-digit', year: '2-digit',
              hour: '2-digit', minute: '2-digit'
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TelegramFeedWidget; 