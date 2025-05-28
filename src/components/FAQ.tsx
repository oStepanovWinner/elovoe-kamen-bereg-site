import React, { useState } from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqData = [
    {
      id: 1,
      question: 'Как забронировать номер?',
      answer: 'Вы можете забронировать номер несколькими способами: через форму на сайте, по телефону +7 (495) 123-45-67, через наш Telegram-бот или по электронной почте. Мы работаем ежедневно с 9:00 до 21:00.'
    },
    {
      id: 2,
      question: 'Какие способы оплаты вы принимаете?',
      answer: 'Мы принимаем оплату наличными при заезде, банковскими картами, переводом на карту или расчетный счет. Предоплата составляет 30% от стоимости проживания, остальную сумму можно доплатить при заезде.'
    },
    {
      id: 3,
      question: 'Можно ли приехать с домашними животными?',
      answer: 'Да, мы рады гостям с домашними животными! При бронировании обязательно укажите, что планируете приехать с питомцем. Доплата составляет 500 рублей в сутки. Животное должно быть привито и иметь ветеринарный паспорт.'
    },
    {
      id: 4,
      question: 'Есть ли Wi-Fi на территории?',
      answer: 'Да, бесплатный Wi-Fi доступен во всех номерах и на общих территориях базы отдыха. Скорость интернета достаточна для работы и видеосвязи.'
    },
    {
      id: 5,
      question: 'Предоставляете ли вы питание?',
      answer: 'В номерах есть мини-холодильники и чайники. На территории работает кафе, где можно заказать завтрак, обед и ужин. Также есть оборудованные мангальные зоны для самостоятельного приготовления пищи.'
    },
    {
      id: 6,
      question: 'Какое время заезда и выезда?',
      answer: 'Стандартное время заезда — 14:00, выезда — 12:00. При наличии свободных номеров возможен ранний заезд или поздний выезд за дополнительную плату.'
    },
    {
      id: 7,
      question: 'Можно ли отменить бронирование?',
      answer: 'Да, бронирование можно отменить бесплатно за 7 дней до заезда. При отмене за 3-7 дней — удерживается 50% предоплаты, при отмене менее чем за 3 дня — предоплата не возвращается.'
    },
    {
      id: 8,
      question: 'Есть ли трансфер от станции/аэропорта?',
      answer: 'Да, мы организуем трансфер от ж/д станции Осташков или других удобных точек. Стоимость зависит от расстояния и количества пассажиров. Заказать трансфер можно при бронировании.'
    },
    {
      id: 9,
      question: 'Какие развлечения доступны зимой?',
      answer: 'Зимой доступны: русская баня, прогулки по заснеженному лесу, подледная рыбалка (при наличии льда), катание на лыжах, настольные игры в номерах, мангальные зоны работают круглый год.'
    },
    {
      id: 10,
      question: 'Есть ли аптечка или медицинская помощь?',
      answer: 'На базе есть аптечка первой помощи. Ближайшая больница находится в Осташкове (25 км). При серьезных проблемах мы поможем вызвать скорую помощь.'
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section id="faq" className="section-padding bg-nature-green-50 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-nature-green-800 mb-6">
            Часто задаваемые вопросы
          </h2>
          <div className="w-24 h-1 bg-nature-gold-500 mx-auto mb-8"></div>
        </div>

        {/* Список вопросов */}
        <div className="space-y-4">
          {faqData.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button 
                onClick={() => toggleFAQ(item.id)} 
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-nature-green-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-nature-green-800 pr-4">
                  {item.question}
                </h3>
                <div className={`transform transition-transform duration-200 ${openFAQ === item.id ? 'rotate-180' : ''} text-nature-green-600`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {openFAQ === item.id && (
                <div className="px-6 pb-5">
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-nature-green-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Дополнительная помощь */}
        <div className="mt-16 bg-nature-green-600 text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Не нашли ответ на свой вопрос?
          </h3>
          <p className="text-lg opacity-90 mb-6">
            Свяжитесь с нами любым удобным способом, и мы с радостью поможем вам!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+79525129738" className="inline-flex items-center space-x-2 bg-white text-nature-green-600 px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-200 font-medium">
              <Phone size={18} />
              <span>Позвонить</span>
            </a>
            <a href="mailto:chestem@mail.ru" className="inline-flex items-center space-x-2 bg-white text-nature-green-600 px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-200 font-medium">
              <Mail size={18} />
              <span>Написать</span>
            </a>
            <a href="https://t.me/kamenniy_bereg" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 bg-white text-nature-green-600 px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-200 font-medium">
              <MessageCircle size={18} />
              <span>Telegram</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
