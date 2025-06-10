import React, { useState } from 'react';
import { X, Users, Bed, Bath, Wifi, Car, Utensils, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';

interface Room {
  id: string;
  name?: string;
  title?: string;
  price: string;
  capacity: string;
  features: string[];
  image?: string;
  image_url?: string;
  description?: string;
  amenities?: string[];
}

interface RoomDetailModalProps {
  room: Room;
  isOpen: boolean;
  onClose: () => void;
  onBook: () => void;
  images: string[];
}

const RoomDetailModal: React.FC<RoomDetailModalProps> = ({ room, isOpen, onClose, onBook, images }) => {
  const [fullImage, setFullImage] = useState<string|null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { if (emblaApi) emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  if (!isOpen) return null;

  const getFeatureIcon = (feature: string) => {
    if (feature.includes('спальн')) return <Bed size={16} />;
    if (feature.includes('ванна') || feature.includes('душ')) return <Bath size={16} />;
    if (feature.includes('Wi-Fi')) return <Wifi size={16} />;
    if (feature.includes('парковка')) return <Car size={16} />;
    if (feature.includes('кухн')) return <Utensils size={16} />;
    return <Home size={16} />;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Шапка модального окна */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-nature-green-800">{room.name || room.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Контент модального окна */}
        <div className="p-6">
          {/* Слайдер изображений номера */}
          <div className="relative h-80 mb-6 rounded-xl overflow-hidden bg-nature-green-50">
            {/* Стрелка влево */}
            {images.length > 1 && (
              <button
                onClick={e => { e.stopPropagation(); emblaApi && emblaApi.scrollPrev(); }}
                className="absolute left-0 top-0 h-full w-10 flex items-center justify-center bg-transparent hover:bg-transparent transition-colors duration-200 z-10 group"
                style={{ outline: 'none' }}
                tabIndex={-1}
                aria-label="Предыдущее фото"
              >
                <svg className="h-7 w-7 text-white drop-shadow-2xl filter drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] group-hover:text-nature-green-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            {/* Стрелка вправо */}
            {images.length > 1 && (
              <button
                onClick={e => { e.stopPropagation(); emblaApi && emblaApi.scrollNext(); }}
                className="absolute right-0 top-0 h-full w-10 flex items-center justify-center bg-transparent hover:bg-transparent transition-colors duration-200 z-10 group"
                style={{ outline: 'none' }}
                tabIndex={-1}
                aria-label="Следующее фото"
              >
                <svg className="h-7 w-7 text-white drop-shadow-2xl filter drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] group-hover:text-nature-green-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
            <div className="embla h-full" ref={emblaRef}>
              <div className="embla__container flex h-full">
                {images.map((img, idx) => (
                  <div key={idx} className="embla__slide flex-none w-full h-80 flex items-center justify-center cursor-zoom-in" onClick={() => setFullImage(img)}>
                    <img
                      src={img}
                      alt={room.name || room.title}
                      className="w-full h-full object-contain rounded-xl transition-transform duration-200 hover:scale-105"
                      style={{ maxHeight: '20rem' }}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Точки-индикаторы */}
            {images.length > 1 && (
              <div className="flex justify-center mt-3 space-x-2 absolute left-1/2 -translate-x-1/2 bottom-2 z-10">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={e => { e.stopPropagation(); emblaApi && emblaApi.scrollTo(idx); }}
                    className={`w-3 h-3 rounded-full transition-colors border-2 ${currentIndex === idx ? 'bg-nature-gold-500 border-nature-gold-500' : 'bg-white border-nature-green-300'}`}
                    aria-label={`Перейти к фото ${idx + 1}`}
                  />
                ))}
              </div>
            )}
            {/* Цена и вместимость поверх слайдера */}
            <div className="absolute top-4 left-4 bg-nature-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
              <Users size={14} />
              <span>{room.capacity}</span>
            </div>
            <div className="absolute top-4 right-4 bg-nature-gold-500 text-nature-green-800 px-4 py-2 rounded-full text-lg font-bold">
              {room.price}
            </div>
          </div>

          {/* Описание */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-nature-green-800 mb-3">Описание</h3>
            <p className="text-nature-green-600 leading-relaxed">
              {room.description || `Комфортабельный номер "${room.name || room.title}" идеально подходит для проживания ${room.capacity?.toLowerCase()}. Номер оборудован всем необходимым для комфортного отдыха на природе.`}
            </p>
          </div>

          {/* Удобства */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-nature-green-800 mb-4">Удобства</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {room.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-nature-green-50 rounded-lg">
                  <div className="text-nature-green-600">
                    {getFeatureIcon(feature)}
                  </div>
                  <span className="text-nature-green-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="flex flex-col sm:flex-row gap-4 sticky bottom-0 bg-white p-4 border-t border-gray-100">
            <Button
              onClick={onBook}
              className="flex-1 bg-nature-gold-500 hover:bg-nature-gold-600 text-nature-green-800 font-medium py-3 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] transform hover:scale-102 active:scale-98 transition-all duration-200 ease-in-out sm:order-1"
            >
              Забронировать номер
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-nature-green-300 text-nature-green-700 \
              hover:bg-nature-green-50 font-medium py-3 rounded-xl
              transform hover:scale-102 active:scale-98
              transition-all duration-200 ease-in-out
              sm:order-2"
            >
              Закрыть
            </Button>
          </div>
        </div>
      </div>
      {/* Модальное окно для полного изображения */}
      {fullImage && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/90" onClick={() => setFullImage(null)}>
          <img
            src={fullImage}
            alt={room.name || room.title}
            className="max-h-[90vh] max-w-full object-contain rounded-2xl shadow-2xl border-4 border-white"
          />
          <button
            className="absolute top-4 right-4 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors duration-200"
            onClick={e => { e.stopPropagation(); setFullImage(null); }}
            aria-label="Закрыть"
          >
            <X size={28} />
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomDetailModal;
