import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface HeroData {
  photo_url: string;
  title: string;
  subtitle: string;
}

const Hero = () => {
  const [hero, setHero] = useState<HeroData | null>(null);
  useEffect(() => {
    fetch('/hero.json')
      .then(res => res.json())
      .then(arr => setHero(arr[0]));
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  if (!hero) return null;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Фоновое изображение */}
      <div className="absolute inset-0 z-0">
        <img 
          src={hero.photo_url} 
          alt={hero.title} 
          className="w-full h-full object-cover filter sepia-[0.4] saturate-150 contrast-110 brightness-105" 
        />
        <div className="absolute inset-0 bg-nature-green-900/20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-nature-green-900/40"></div>
      </div>
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-1">
              <div className="flex items-end justify-center">
                <div className="relative">
                  <div className="w-0 h-0 border-l-[24px] border-r-[24px] border-b-[16px] border-transparent border-b-nature-green-500"></div>
                  <div className="w-10 h-8 bg-nature-green-600 mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          {hero.title}
        </h1>
        <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          {hero.subtitle}
        </p>
        <div className="mb-12">
          <Button 
            onClick={() => scrollToSection('contacts')} 
            size="lg" 
            className="bg-nature-gold-500 hover:bg-nature-gold-600 text-nature-green-800 font-semibold px-8 py-4 text-lg rounded-xl \
            shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]\n            transition-all duration-200 ease-in-out"
          >
            ЗАБРОНИРОВАТЬ
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
