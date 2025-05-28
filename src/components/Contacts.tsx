
import React from 'react';
import BookingForm from './BookingForm';
import { Button } from '@/components/ui/button';
const PhoneIcon = () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>;
const EmailIcon = () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>;
const LocationIcon = () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>;
const VkIcon = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1.033-1.49-.726-1.49.264v1.727c0 .428-.132.528-.925.528-2.115 0-4.464-1.287-6.117-3.68C5.57 11.693 4.7 9.314 4.7 8.2c0-.297.099-.528.528-.528h1.744c.396 0 .544.198.693.66.726 2.31 1.925 4.329 2.409 4.329.198 0 .297-.099.297-.66V9.907c-.066-1.122-.66-1.221-.66-1.617 0-.231.198-.462.528-.462h2.772c.33 0 .462.198.462.627v3.383c0 .33.132.462.231.462.198 0 .396-.132.792-.528 1.155-1.155 1.98-2.937 1.98-2.937.099-.231.297-.462.693-.462h1.744s.528.066.428.726c-.198 1.188-2.277 3.383-2.277 3.383-.165.264-.132.396 0 .627.231.396 1.023 1.023 1.551 1.617.726.792 1.287 1.452.924 1.925z" />
  </svg>;
const TelegramIcon = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>;
const Contacts = () => {
  return <section id="contacts" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-nature-green-800 mb-6">
            Контакты
          </h2>
          <div className="w-24 h-1 bg-nature-green-500 mx-auto mb-8"></div>
          <p className="text-lg sm:text-xl text-nature-green-600 max-w-3xl mx-auto">
            Свяжитесь с нами для бронирования или получения дополнительной информации
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-stretch">
          {/* Контактная информация */}
          <div className="space-y-8 h-full">
            <div className="bg-nature-green-50 rounded-2xl p-8 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-nature-green-800 mb-6">
                  Наши контакты
                </h3>
                
                <div className="space-y-6">
                  {/* Телефон */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-nature-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <PhoneIcon />
                    </div>
                    <div>
                      <h4 className="font-semibold text-nature-green-800 mb-1">Телефон</h4>
                      <p className="text-nature-green-700">+7-952-512-97-38</p>
                      <p className="text-sm text-nature-green-600">Ежедневно с 9:00 до 21:00</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-nature-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <EmailIcon />
                    </div>
                    <div>
                      <h4 className="font-semibold text-nature-green-800 mb-1">Email</h4>
                      <p className="text-nature-green-700">chestem@mail.ru</p>
                    </div>
                  </div>

                  {/* Адрес */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-nature-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <LocationIcon />
                    </div>
                    <div>
                      <h4 className="font-semibold text-nature-green-800 mb-1">Адрес</h4>
                      <p className="text-nature-green-700">
                        Челябинская область, Чебаркульский район
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Социальные сети */}
              <div className="mt-8">
                <h4 className="font-semibold text-nature-green-800 mb-3">Мы в соцсетях</h4>
                <div className="flex space-x-3">
                  <a href="https://vk.com/kamenberegelovoe" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-nature-green-600 rounded-lg flex items-center justify-center text-white hover:bg-nature-green-700 hover:scale-110 transition-all duration-200">
                    <VkIcon />
                  </a>
                  <a href="https://t.me/kamenniy_bereg" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-nature-green-600 rounded-lg flex items-center justify-center text-white hover:bg-nature-green-700 hover:scale-110 transition-all duration-200">
                    <TelegramIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Информация о бронировании */}
          <div className="space-y-8 h-full">
            <div className="bg-nature-green-50 rounded-2xl p-8 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-nature-green-800">
                    Бронирование
                  </h3>
                  <BookingForm trigger={<Button className="bg-nature-gold-500 hover:bg-nature-green-600 text-nature-green-800 font-semibold px-6 py-2">
                      Забронировать
                    </Button>} />
                </div>
                <div className="space-y-4 text-nature-green-700">
                  <p className="text-lg leading-relaxed">
                    Для бронирования номеров звоните по телефону или отправляйте сообщение в Telegram.
                  </p>
                  <div className="bg-white rounded-xl p-6 border border-nature-green-200">
                    <h4 className="font-semibold text-nature-green-800 mb-3">Что нужно сообщить:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-nature-green-500 rounded-full mr-3"></div>
                        Желаемые даты заезда и выезда
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-nature-green-500 rounded-full mr-3"></div>
                        Количество гостей
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-nature-green-500 rounded-full mr-3"></div>
                        Тип номера
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Режим работы */}
              <div className="bg-white rounded-xl p-6 border border-nature-green-200 mt-6">
                <h4 className="font-semibold text-nature-green-800 mb-4">
                  Режим работы
                </h4>
                <div className="space-y-2 text-nature-green-700">
                  <div className="flex justify-between">
                    <span>Понедельник - Воскресенье:</span>
                    <span>9:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Заезд/выезд:</span>
                    <span>с 14:00 / до 14:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Contacts;
