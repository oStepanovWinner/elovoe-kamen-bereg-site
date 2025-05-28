import React from 'react';
import TelegramFeedWidget from './TelegramFeedWidget';

const CHANNEL_USERNAME = 'kamenniy_bereg';

const TelegramWidget = () => {
  return (
    <section id="telegram" className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start">
          {/* Левая колонка — текст сверху, кнопка по центру блока */}
          <div className="pt-8 flex flex-col justify-between lg:h-[800px] h-[600px]">
            {/* Текст — прижат к верху */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-nature-green-800 mb-6 lg:mb-8 text-left">
                Наши новости в Telegram
              </h2>
              <div className="w-24 h-1 bg-nature-gold-500 mb-6 lg:mb-8"></div>
              <p className="text-base lg:text-lg text-nature-green-600 mb-8 leading-relaxed text-left">
                Подписывайтесь на наш Telegram-канал, чтобы первыми узнавать о новостях, акциях и событиях
              </p>
            </div>
            {/* Кнопка — по центру блока */}
            <div className="flex-1 flex items-center justify-center">
              <a
                href={`https://t.me/${CHANNEL_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-nature-green-600 text-white px-6 py-3 rounded-xl hover:bg-nature-green-700 transition-colors duration-200 font-medium shadow-md w-max mt-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                <span>Подписаться на канал</span>
              </a>
            </div>
          </div>
          {/* Правая колонка — TelegramFeedWidget прижат к низу */}
          <div className="relative h-[600px] lg:h-[800px] flex items-end">
            <div className="w-full h-full rounded-2xl shadow-2xl overflow-hidden flex items-stretch">
              <TelegramFeedWidget />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TelegramWidget;
