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
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center justify-center w-full">
          <img src="/logo.svg" alt="Каменный берег" className="w-[160px] h-[160px] mb-8" />
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-3xl">
            {hero.title}
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 mb-8 max-w-3xl leading-relaxed">
            {hero.subtitle}
          </p>
          <div className="mb-12">
            <Button 
              onClick={() => scrollToSection('contacts')} 
              size="lg" 
              className="bg-nature-gold-500 hover:bg-nature-gold-600 text-nature-green-800 font-semibold px-8 py-4 text-lg rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out"
            >
              ЗАБРОНИРОВАТЬ
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
