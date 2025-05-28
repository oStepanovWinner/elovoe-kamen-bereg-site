import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Фоновое изображение (озеро плоское с природой, акварель) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Озеро Еловое, Чебаркуль" 
          className="w-full h-full object-cover filter sepia-[0.4] saturate-150 contrast-110 brightness-105" 
        />
        <div className="absolute inset-0 bg-nature-green-900/20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-nature-green-900/40"></div>
      </div>

      {/* Контент */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Логотип без фона */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-1">
              {/* Логотип - большая крыша и дом в минимализме зеленый */}
              <div className="flex items-end justify-center">
                <div className="relative">
                  {/* Большая крыша */}
                  <div className="w-0 h-0 border-l-[24px] border-r-[24px] border-b-[16px] border-transparent border-b-nature-green-500"></div>
                  {/* Дом */}
                  <div className="w-10 h-8 bg-nature-green-600 mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Каменный берег
        </h1>
        
        <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          База отдыха для всей семьи на берегу озера
        </p>

        <div className="mb-12">
          <Button 
            onClick={() => scrollToSection('contacts')} 
            size="lg" 
            className="bg-nature-gold-500 hover:bg-nature-gold-600 text-nature-green-800 font-semibold px-8 py-4 text-lg rounded-xl 
            shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]
            transition-all duration-200 ease-in-out"
          >
            ЗАБРОНИРОВАТЬ
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
