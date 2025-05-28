import React, { useState, useEffect } from 'react';

const FloatingNavButton = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isGreen, setIsGreen] = useState(true);

  const sections = [
    { id: 'hero', name: 'Главная' },
    { id: 'about', name: 'О нас' },
    { id: 'gallery', name: 'Галерея' },
    { id: 'rooms', name: 'Номера' },
    { id: 'services', name: 'Услуги' },
    { id: 'reviews', name: 'Отзывы' },
    { id: 'telegram', name: 'Новости' },
    { id: 'map', name: 'Карта' },
    { id: 'contacts', name: 'Контакты' },
    { id: 'faq', name: 'FAQ' }
  ];

  const scrollToNextSection = () => {
    const nextIndex = (currentSection + 1) % sections.length;
    const nextSection = sections[nextIndex];
    const element = document.getElementById(nextSection.id);
    if (element) {
      const offset = nextSection.id === 'map' ? 100 : 0;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      setCurrentSection(nextIndex);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(index);
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Смена цвета при каждом прыжке
  useEffect(() => {
    let bounceInterval: NodeJS.Timeout;
    let bounce = false;
    const animateBounce = () => {
      setIsGreen((prev) => !prev);
      bounce = !bounce;
      bounceInterval = setTimeout(animateBounce, 1200);
    };
    animateBounce();
    return () => clearTimeout(bounceInterval);
  }, []);

  const isWhite = !isGreen;
  const textColor = isGreen ? 'text-nature-green-800' : 'text-white';
  const mouseBorderColor = isGreen ? 'border-nature-green-800' : 'border-white';
  const mouseBgColor = isGreen ? 'bg-nature-green-800' : 'bg-white';

  return (
    <button
      onClick={scrollToNextSection}
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 font-medium transition-all duration-300 hover:scale-110`}
    >
      <div className={`flex flex-col items-center space-y-1 animate-bounce`}>
        <span className={`text-sm ${textColor}`}>Прокрутить вниз</span>
        <div className={`w-4 h-6 border-2 ${mouseBorderColor} rounded-full flex justify-center relative overflow-hidden`}>
          <div className={`w-1 h-2 ${mouseBgColor} rounded-full mt-1 animate-pulse`}></div>
        </div>
      </div>
    </button>
  );
};

export default FloatingNavButton;
