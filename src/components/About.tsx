import React from 'react';
import { Home, Waves, Trees, ChefHat } from 'lucide-react';

const About = () => {
  const features = [
    {
      title: 'Уютные номера',
      description: 'Комфортабельные номера с современными удобствами',
      icon: Home
    },
    {
      title: 'Чистое озеро',
      description: 'Кристально чистая вода для купания и рыбалки',
      icon: Waves
    },
    {
      title: 'Отдых на природе',
      description: 'Прогулки, рыбалка и единение с природой',
      icon: Trees
    },
    {
      title: 'Кафе-столовая',
      description: 'Домашняя кухня и свежие продукты',
      icon: ChefHat
    }
  ];

  return (
    <section id="about" className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start">
          {/* Изображение - увеличенное и выровненное */}
          <div className="relative h-[600px] lg:h-[800px]">
            <img 
              src="https://res.cloudinary.com/dwhb1qzhw/image/upload/e_gen_remove:prompt_manhole;multiple_true/e_gen_remove:prompt_parked%20cars;remove-shadow_true/e_gen_replace:from_parked%20cars;to_What%20if%20the%20cars%20weren't%20in%20the%20picture;preserve-geometry_true;multiple_true/e_gen_restore/q_auto/e_enhance/e_contrast:-10/e_gamma/e_brightness:-10/q_auto:best/e_gen_replace:from_sky;to_The%20natural%20sky%20is%20clear%20with%20few%20white%20clouds%20and%20no%20sun;multiple_true/f_webp/e_enhance/e_enhance/XXXL_ujedjs" 
              alt="База отдыха Каменный берег" 
              className="w-full h-full object-cover rounded-2xl shadow-2xl filter sepia-[0.3] saturate-150 hue-rotate-[10deg]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-nature-green-900/20 to-transparent rounded-2xl"></div>
          </div>

          {/* Контент */}
          <div className="pt-8 flex flex-col justify-between lg:h-[800px]">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-nature-green-800 mb-6 lg:mb-8">
                О базе отдыха
              </h2>
              <div className="w-24 h-1 bg-nature-green-500 mb-6 lg:mb-8"></div>
              
              <p className="text-base lg:text-lg text-nature-green-600 mb-6 lg:mb-8 leading-relaxed">
                "Каменный берег" — это уютная база отдыха на живописном берегу озера, 
                где можно насладиться тишиной природы и активным отдыхом. 
                Мы предлагаем комфортабельные номера, разнообразные развлечения 
                и незабываемые впечатления для всей семьи.
              </p>
            </div>

            {/* Особенности */}
            <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-3 lg:space-x-4 p-3 lg:p-4 bg-nature-green-50 rounded-xl">
                    <div className="text-nature-green-600 mt-1">
                      <IconComponent size={20} className="lg:w-6 lg:h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-nature-green-800 mb-1 lg:mb-2 text-sm lg:text-base">{feature.title}</h3>
                      <p className="text-nature-green-600 text-xs lg:text-sm">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
