import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

interface ServiceRaw {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: string;
  features: string[] | string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  features: string[];
}

const Services = () => {
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
  const [services, setServices] = useState<Service[]>([]);

  // Touch/swipe state with improved sensitivity
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    fetch('/services.json')
      .then(res => res.json())
      .then((data: ServiceRaw[]) => {
        setServices(data.map(service => ({
          id: service.id,
          title: service.name,
          description: service.description,
          image: service.image_url,
          price: service.price,
          features: Array.isArray(service.features)
            ? service.features
            : (typeof service.features === 'string' && service.features ? service.features.split(',').map((f: string) => f.trim()) : [])
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
  const totalPages = Math.ceil(services.length / slidesPerView);

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
    const minSwipeDistance = 50;
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
    <section id="services" className="section-padding bg-white pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-nature-green-800 mb-6">
            Услуги
          </h2>
          <div className="w-24 h-1 bg-nature-gold-500 mx-auto mb-8"></div>
          <p className="text-lg sm:text-xl text-nature-green-600 max-w-3xl mx-auto">
            Комфортные условия и разнообразные услуги для вашего отдыха
          </p>
        </div>

        {/* Слайдер услуг с поддержкой свайпов */}
        <div className="relative">
          <div 
            className="embla overflow-hidden pb-12" 
            ref={emblaRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="embla__container flex">
              {services.map(service => (
                <div key={service.id} className="embla__slide flex-none w-full md:w-1/2 lg:w-1/3 px-3 pb-4">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col h-[36rem]">
                    {/* Изображение */}
                    <div className="w-full h-60 flex items-center justify-center overflow-hidden rounded-t-2xl bg-gray-100 relative">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute top-4 right-4 bg-nature-gold-500 text-nature-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {service.price}
                      </div>
                    </div>

                    {/* Контент */}
                    <div className="p-6 flex flex-col h-[calc(100%-15rem)]">
                      <div className="h-10 flex items-start text-xl font-bold text-nature-green-800 mb-3">{service.title}</div>
                      <div className="h-24 flex items-start text-nature-green-600 leading-relaxed mb-6">{service.description}</div>
                      <div className="h-6 flex items-center text-sm font-semibold text-nature-green-700 uppercase tracking-wider mb-2">Включено:</div>
                      <ul className="pl-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-nature-green-600 mt-2">
                          {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center h-8">
                              <div className="w-1.5 h-1.5 bg-nature-gold-500 rounded-full mr-2"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
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
            {services.map((_, index) => (
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
    </section>
  );
};

export default Services;
