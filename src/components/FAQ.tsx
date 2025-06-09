import React, { useState, useEffect } from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [faqData, setFaqData] = useState<FAQItem[]>([]);
  const [contacts, setContacts] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch('/faq.json')
      .then(res => res.json())
      .then(setFaqData);
  }, []);

  useEffect(() => {
    fetch('/contacts.json')
      .then(res => res.json())
      .then((arr) => {
        const obj = Object.fromEntries(arr.map(i => [i.key, i.value]));
        setContacts(obj);
      });
  }, []);

  const toggleFAQ = (id: string) => {
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
            {contacts.phone && (
              <a href={`tel:${contacts.phone}`} className="inline-flex items-center space-x-2 bg-white text-nature-green-600 px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-200 font-medium">
                <Phone size={18} />
                <span>Позвонить</span>
              </a>
            )}
            {contacts.email && (
              <a href={`mailto:${contacts.email}`} className="inline-flex items-center space-x-2 bg-white text-nature-green-600 px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-200 font-medium">
                <Mail size={18} />
                <span>Написать</span>
              </a>
            )}
            {contacts.social_tg && (
              <a href={contacts.social_tg} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 bg-white text-nature-green-600 px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-200 font-medium">
                <MessageCircle size={18} />
                <span>Telegram</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
