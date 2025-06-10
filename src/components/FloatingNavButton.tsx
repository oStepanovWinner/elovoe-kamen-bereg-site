import React, { useState, useEffect } from 'react';

const FloatingNavButton = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isGreen, setIsGreen] = useState(true);
  const [buttonStyle, setButtonStyle] = useState<{ position: 'fixed' | 'absolute', bottom: number }>({ position: 'fixed', bottom: 32 });

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

      // Проверка пересечения с футером
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const buttonHeight = 64;
        const margin = 24; // px отступ от футера
        if (footerRect.top < windowHeight - buttonHeight - margin) {
          // Футер виден — кнопка absolute над футером
          const footerTop = window.scrollY + footerRect.top;
          setButtonStyle({
            position: 'absolute',
            bottom: windowHeight + window.scrollY - footerTop + margin
          });
        } else {
          // Кнопка фиксирована внизу
          setButtonStyle({ position: 'fixed', bottom: 32 });
        }
      } else {
        setButtonStyle({ position: 'fixed', bottom: 32 });
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
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
      style={{
        position: buttonStyle.position,
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: buttonStyle.bottom,
        zIndex: 50
      }}
      className={`font-medium transition-all duration-300 hover:scale-110`}
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
