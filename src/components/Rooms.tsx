import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import RoomDetailModal from './RoomDetailModal';
import useEmblaCarousel from 'embla-carousel-react';

// Добавляю интерфейс Room
interface Room {
  id: string;
  name: string;
  price: string;
  capacity: string;
  features: string[];
  images: string[];
  description?: string;
}

const Rooms = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 1 },
      '(min-width: 1024px)': { slidesToScroll: 1 }
    }
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [rooms, setRooms] = useState<Room[]>([]);

  // Touch/swipe state with improved sensitivity
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    fetch('/rooms.json')
      .then(res => res.json())
      .then((data: any[]) => {
        setRooms(data.map(room => ({
          id: room.id,
          name: room.name,
          price: room.price,
          capacity: room.capacity,
          features: Array.isArray(room.features)
            ? room.features
            : (room.features ? room.features.split(',').map((f: string) => f.trim()) : []),
          images: room.image_url ? room.image_url.split(';').map((url: string) => url.trim()).filter(Boolean) : [],
          description: room.description
        })));
      });
  }, []);

  // Calculate slides per view based on screen size
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  // Calculate total pages based on slides per view
  const totalPages = Math.ceil(rooms.length / slidesPerView);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 120; // Increased sensitivity threshold
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      scrollNext();
    }
    if (isRightSwipe) {
      scrollPrev();
    }
  };

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const openRoomDetails = (room: Room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const scrollToContacts = () => {
    const element = document.getElementById('contacts');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const handleBookRoom = () => {
    setIsModalOpen(false);
    scrollToContacts();
  };

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="rooms" className="section-padding bg-white pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-nature-green-800 mb-6">
            Номера
          </h2>
          <div className="w-24 h-1 bg-nature-gold-500 mx-auto mb-8"></div>
          <p className="text-lg sm:text-xl text-nature-green-600 max-w-3xl mx-auto">
            Выберите подходящий номер для комфортного проживания на природе
          </p>
        </div>

        {/* Слайдер номеров с поддержкой свайпов */}
        <div className="relative">
          <div 
            className="embla overflow-hidden pb-8" 
            ref={emblaRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="embla__container flex">
              {rooms.map(room => (
                <div key={room.id} className="embla__slide flex-none w-full md:w-1/2 lg:w-1/3 px-3">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 group h-full">
                    {/* Изображение */}
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={room.images[0]} 
                        alt={room.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-nature-green-900/60 to-transparent"></div>
                      {/* Количество человек на картинке */}
                      <div className="absolute top-4 left-4 bg-nature-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                        <Users size={14} />
                        <span>{room.capacity}</span>
                      </div>
                      {/* Цена на картинке */}
                      <div className="absolute bottom-4 right-4 bg-nature-gold-500 text-nature-green-800 px-3 py-2 rounded-xl font-bold">
                        {room.price}
                      </div>
                    </div>

                    {/* Контент */}
                    <div className="p-6 flex flex-col h-[calc(100%-16rem)]">
                      <h3 className="text-2xl font-bold text-nature-green-800 mb-4">{room.name}</h3>

                      {/* Удобства */}
                      <ul className="space-y-2 mb-6 flex-grow">
                        {room.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center text-nature-green-600">
                            <div className="w-2 h-2 bg-nature-gold-500 rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                        {room.features.length > 3 && (
                          <li className="text-nature-green-500 text-sm">
                            и еще {room.features.length - 3} удобств...
                          </li>
                        )}
                      </ul>

                      {/* Кнопка подробнее */}
                      <Button 
                        onClick={() => openRoomDetails(room)}
                        className="bg-nature-gold-500 hover:bg-nature-gold-600 text-nature-green-800 font-semibold px-6 py-2 mt-auto"
                      >
                        Подробнее
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Кнопки навигации */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-0 h-full w-16 flex items-center justify-center bg-transparent hover:bg-transparent transition-colors duration-200 z-10 group"
          >
            <svg className="h-8 w-8 text-white drop-shadow-2xl filter drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] group-hover:text-nature-green-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-0 h-full w-16 flex items-center justify-center bg-transparent hover:bg-transparent transition-colors duration-200 z-10 group"
          >
            <svg className="h-8 w-8 text-white drop-shadow-2xl filter drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] group-hover:text-nature-green-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Индикаторы точек */}
          <div className="flex justify-center mt-8 space-x-2">
            {rooms.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-nature-green-600' : 'bg-nature-green-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Модальное окно с подробностями номера */}
      {selectedRoom && (
        <RoomDetailModal
          room={selectedRoom}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          images={selectedRoom.images}
        />
      )}
    </section>
  );
};

export default Rooms;
