import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

interface Review {
  id: string;
  name: string;
  platform: string;
  rating: number;
  date: string;
  text: string;
  photo_url: string;
}

const Reviews = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 1 },
      '(min-width: 1024px)': { slidesToScroll: 1 }
    },
    dragFree: true,
    inViewThreshold: 0.7,
    skipSnaps: false
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Touch/swipe state with improved sensitivity
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Improved swipe detection
  const minSwipeDistance = 50; // Increased for better control

  useEffect(() => {
    fetch('/reviews.json')
      .then(res => res.json())
      .then((data: any[]) => {
        setReviews(data.map(review => ({
          id: review.id,
          name: review.name,
          platform: review.platform,
          rating: Number(review.rating),
          date: review.date,
          text: review.review,
          photo_url: review.photo_url
        })));
      });
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`text-lg ${index < rating ? 'text-nature-gold-500' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

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
  const totalPages = Math.ceil(reviews.length / slidesPerView);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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
    <section id="reviews" className="section-padding bg-nature-green-50 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-nature-green-800 mb-6">
            Отзывы
          </h2>
          <div className="w-24 h-1 bg-nature-gold-500 mx-auto mb-8"></div>
          <p className="text-lg sm:text-xl text-nature-green-600 max-w-3xl mx-auto">
            Что говорят наши гости о базе отдыха "Каменный берег"
          </p>
        </div>

        {/* Слайдер отзывов с поддержкой свайпов */}
        <div className="relative">
          <div 
            className="embla overflow-hidden pb-12 -mx-4 px-4 touch-pan-y" 
            ref={emblaRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="embla__container flex -ml-3">
              {reviews.map(review => (
                <div key={review.id} className="embla__slide flex-none w-full md:w-1/2 lg:w-1/3 px-3">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    {/* Заголовок отзыва */}
                    <div className="flex items-center space-x-4 mb-4">
                      <img src={review.photo_url} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-nature-green-800">{review.name}</h4>
                        <p className="text-sm text-nature-green-600">{review.platform}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <p className="text-xs text-nature-green-500 mt-1">{review.date}</p>
                      </div>
                    </div>

                    {/* Текст отзыва */}
                    <p className="text-nature-green-700 leading-relaxed">{review.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Навигационные стрелки */}
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
            {reviews.map((_, index) => (
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

export default Reviews;
