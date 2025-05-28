'use client';

import React from 'react';

const Map = () => {
  const yandexMapUrl =
    'https://yandex.ru/maps/?ll=60.855114%2C55.041500&mode=routes&rtext=55.159902%2C61.402554~55.004665%2C60.316781&rtt=auto&ruri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1MzE1OTUyNxIg0KDQvtGB0YHQuNGPLCDQp9C10LvRj9Cx0LjQvdGB0LoiCg04nHVCFb2jXEI%2C~ymapsbm1%3A%2F%2Forg%3Foid%3D203268538693&z=10.3';

  const googleMapsEmbedUrl =
    'https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d177327.384051753!2d60.54801557413216!3d55.07546969945217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x43c592cb104a3a8d%3A0xef224a2a6d1711bf!2z0KfQtdC70Y_QsdC40L3RgdC6LCDQp9C10LvRj9Cx0LjQvdGB0LosINCg0L7RgdGB0LjRjw!3m2!1d55.1644419!2d61.4368432!4m5!1s0x43c56bef9e487133%3A0x18901042074edcb8!2z0JrQsNC80LXQvdGB0LjQstC90LAg0JHQtNC10YDQvtC7LCDQp9C10LvRj9Cx0LjQvdGB0LrQsNGPINC-0LHQu9Cw0YHRgtGMLCA0NTY0NDE!3m2!1d55.0053557!2d60.3180498!5e0!3m2!1sru!2sru!4v1718897822216!5m2!1sru!2sru';

  const twoGisUrl =
    'https://2gis.ru/chelyabinsk/directions/points/61.402709%2C55.157389%3B2111685095587875%7C60.315461%2C55.005338%3B70030076176875106?m=60.859669%2C55.040166%2F10.45&immersive=on';

  return (
    <section id="map" className="py-12 bg-nature-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-nature-green-800 mb-4">
            Как нас найти
          </h2>
          <div className="w-20 h-1 bg-nature-gold-500 mx-auto mb-4"></div>
          <p className="text-lg text-nature-green-600 max-w-2xl mx-auto">
            База отдыха "Каменный берег" находится в живописном месте на берегу озера
          </p>
        </div>

        {/* Карта */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Кнопки */}
          <div className="flex flex-wrap justify-center items-center gap-4 px-6 pt-6">
            <a
              href={yandexMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-nature-gold-600 text-white text-sm font-medium hover:bg-nature-gold-700"
            >
              Открыть в Яндекс.Картах
            </a>
            <a
              href="https://www.google.com/maps/dir//55.0053557,60.3180498"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
            >
              Открыть в Google Maps
            </a>
            <a
              href={twoGisUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-nature-green-600 text-white text-sm font-medium hover:bg-nature-green-700"
            >
              Открыть в 2ГИС
            </a>
          </div>

          {/* Встраиваемая карта */}
          <div className="h-96 mt-4">
            <iframe
              src={googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
