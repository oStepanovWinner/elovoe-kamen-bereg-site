import React, { useEffect, useState } from 'react';
import * as LucideIcons from 'lucide-react';

interface AboutKV {
  key: string;
  value: string;
}

const About = () => {
  const [about, setAbout] = useState<Record<string, string>>({});
  const [features, setFeatures] = useState<
    { icon: React.ComponentType<any>; title: string; desc: string }[]
  >([]);

  useEffect(() => {
    fetch('/about.json')
      .then(res => res.json())
      .then((arr: AboutKV[]) => {
        const obj = Object.fromEntries(arr.map(i => [i.key, i.value]));
        setAbout(obj);
        // Собираем особенности
        const feats = [];
        function toPascalCase(str: string) {
          return str
            .split('-')
            .map(s => s.charAt(0).toUpperCase() + s.slice(1))
            .join('');
        }
        for (let i = 1; obj[`icon${i}`]; i++) {
          const IconComponent = LucideIcons[toPascalCase(obj[`icon${i}`])] || LucideIcons['Home'];
          feats.push({
            icon: IconComponent,
            title: obj[`feature${i}_title`] || '',
            desc: obj[`feature${i}_desc`] || '',
          });
        }
        setFeatures(feats);
      });
  }, []);

  if (!about.photo_url) return null;

  return (
    <section id="about" className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start">
          {/* Изображение - увеличенное и выровненное */}
          <div className="relative h-[600px] lg:h-[800px]">
            <img 
              src={about.photo_url} 
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
                {about.description}
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
                      <p className="text-nature-green-600 text-xs lg:text-sm">{feature.desc}</p>
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
