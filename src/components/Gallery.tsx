import React, { useState, useRef, useEffect } from 'react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Реальные фотографии для галереи
  const galleryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Озеро на рассвете',
      category: 'Природа'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Лесная тропа',
      category: 'Природа'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Интерьер номера',
      category: 'Номера'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Семейный номер',
      category: 'Номера'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Зона барбекю',
      category: 'Территория'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Пляжная зона',
      category: 'Территория'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Вечерний пейзаж',
      category: 'Природа'
    }
  ];

  const categories = ['Все', 'Природа', 'Номера', 'Территория'];
  const [activeCategory, setActiveCategory] = useState('Все');

  const filteredImages = activeCategory === 'Все' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Обновляем currentIndex при изменении категории
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // Touch handlers для свайпов с улучшенной чувствительностью
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 80; // Increased sensitivity threshold
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && filteredImages.length > 0) {
      goToNext();
    }
    if (isRightSwipe && filteredImages.length > 0) {
      goToPrevious();
    }
  };

  // Функция для перехода к предыдущему изображению с бесконечной прокруткой
  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1);
  };

  // Функция для перехода к следующему изображению с бесконечной прокруткой
  const goToNext = () => {
    setCurrentIndex(currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1);
  };

  const getPrevIndex = () => {
    return currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
  };

  const getNextIndex = () => {
    return currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
  };

  // Если нет отфильтрованных изображений, показываем заглушку
  if (filteredImages.length === 0) {
    return (
      <section id="gallery" className="section-padding bg-nature-green-50 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-nature-green-800 mb-6">
              Галерея
            </h2>
            <div className="w-24 h-1 bg-nature-gold-500 mx-auto mb-8"></div>
            <p className="text-lg sm:text-xl text-nature-green-600 max-w-3xl mx-auto">
              Посмотрите, как прекрасно у нас на базе отдыха
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-nature-green-600 text-white shadow-lg'
                    : 'bg-white text-nature-green-600 hover:bg-nature-green-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="text-center py-20">
            <p className="text-nature-green-600">Изображения в этой категории временно недоступны</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="section-padding bg-nature-green-50 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-nature-green-800 mb-6">
            Галерея
          </h2>
          <div className="w-24 h-1 bg-nature-gold-500 mx-auto mb-8"></div>
          <p className="text-lg sm:text-xl text-nature-green-600 max-w-3xl mx-auto">
            Посмотрите, как прекрасно у нас на базе отдыха
          </p>
        </div>

        {/* Фильтры категорий */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-nature-green-600 text-white shadow-lg'
                  : 'bg-white text-nature-green-600 hover:bg-nature-green-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Карусель изображений с центральным фокусом */}
        <div className="relative">
          <div 
            className="flex items-center justify-center space-x-0 md:space-x-4 lg:space-x-8 mb-8 px-4 md:px-8 lg:px-0"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            ref={containerRef}
          >
            {/* Левое изображение - показывается на планшетах и десктопах */}
            {filteredImages.length > 1 && (
              <div className="hidden md:block w-32 lg:w-48 h-24 lg:h-32 overflow-hidden rounded-lg shadow-lg opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                <img
                  src={filteredImages[getPrevIndex()]?.src}
                  alt={filteredImages[getPrevIndex()]?.alt}
                  className="w-full h-full object-cover"
                  onClick={goToPrevious}
                />
              </div>
            )}

            {/* Центральное изображение - адаптивные размеры */}
            <div 
              className="w-full md:w-[600px] lg:w-[768px] h-[300px] md:h-[400px] lg:h-[512px] overflow-hidden rounded-xl shadow-2xl cursor-pointer transform scale-105 relative"
              onClick={() => setSelectedImage(filteredImages[currentIndex]?.src)}
            >
              <img
                src={filteredImages[currentIndex]?.src}
                alt={filteredImages[currentIndex]?.alt}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nature-green-900/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-medium">{filteredImages[currentIndex]?.alt}</p>
                  <p className="text-sm opacity-90">{filteredImages[currentIndex]?.category}</p>
                </div>
              </div>
            </div>

            {/* Правое изображение - показывается на планшетах и десктопах */}
            {filteredImages.length > 1 && (
              <div className="hidden md:block w-32 lg:w-48 h-24 lg:h-32 overflow-hidden rounded-lg shadow-lg opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                <img
                  src={filteredImages[getNextIndex()]?.src}
                  alt={filteredImages[getNextIndex()]?.alt}
                  className="w-full h-full object-cover"
                  onClick={goToNext}
                />
              </div>
            )}
          </div>

          {/* Навигационные стрелки с тенью */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-full w-16 flex items-center justify-center bg-transparent hover:bg-transparent transition-colors duration-200 group"
          >
            <svg className="h-8 w-8 text-white drop-shadow-2xl filter drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] group-hover:text-nature-green-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-full w-16 flex items-center justify-center bg-transparent hover:bg-transparent transition-colors duration-200 group"
          >
            <svg className="h-8 w-8 text-white drop-shadow-2xl filter drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] group-hover:text-nature-green-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Индикаторы точек */}
          <div className="flex justify-center mt-8 space-x-2">
            {filteredImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-nature-green-600' : 'bg-nature-green-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Модальное окно для просмотра изображений */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh]">
              <img
                src={selectedImage}
                alt="Увеличенное изображение"
                className="w-full h-full object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors duration-200"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
