import React, { useState, useEffect } from 'react';
import LegalModal from './LegalModal';

const Footer = () => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | 'rules' | null>(null);
  const [contacts, setContacts] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch('/contacts.json')
      .then(res => res.json())
      .then((arr) => {
        const obj = Object.fromEntries(arr.map(i => [i.key, i.value]));
        setContacts(obj);
      });
  }, []);

  const scrollToFAQ = () => {
    const element = document.getElementById('faq');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <footer className="bg-nature-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Логотип и описание */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex items-end justify-center">
                  <div className="relative">
                    {/* Большая крыша */}
                    <div className="w-0 h-0 border-l-[16px] border-r-[16px] border-b-[12px] border-transparent border-b-nature-green-500"></div>
                    {/* Дом */}
                    <div className="w-8 h-6 bg-nature-green-600 mx-auto"></div>
                  </div>
                </div>
                <div className="text-xl font-semibold">Каменный берег</div>
              </div>
              <p className="text-nature-green-200 mb-6 leading-relaxed">
                Уютная база отдыха на берегу чистого озера в живописном уголке озера Еловое. 
                Идеальное место для семейного отдыха и восстановления сил.
              </p>
            </div>

            {/* Контакты */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Контакты</h3>
              <div className="space-y-3 text-nature-green-200">
                <div>
                  <p className="text-sm text-nature-green-300">Адрес:</p>
                  <p>{contacts.address || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-nature-green-300">Телефон:</p>
                  <a href={`tel:${contacts.phone || ''}`} className="hover:text-white transition-colors">
                    {contacts.phone || '—'}
                  </a>
                  {contacts.work_time_phone && (
                    <div className="text-xs text-nature-green-300">{contacts.work_time_phone}</div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-nature-green-300">Email:</p>
                  <a href={`mailto:${contacts.email || ''}`} className="hover:text-white transition-colors">
                    {contacts.email || '—'}
                  </a>
                </div>
              </div>
            </div>

            {/* Информация */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Информация</h3>
              <ul className="space-y-2 text-nature-green-200">
                <li>
                  <button onClick={() => setLegalModal('terms')} className="hover:text-white transition-colors text-left">
                    Договор оферты
                  </button>
                </li>
                <li>
                  <button onClick={() => setLegalModal('privacy')} className="hover:text-white transition-colors text-left">
                    Политика конфиденциальности
                  </button>
                </li>
                <li>
                  <button onClick={() => setLegalModal('rules')} className="hover:text-white transition-colors text-left">
                    Правила проживания
                  </button>
                </li>
                <li>
                  <button onClick={scrollToFAQ} className="hover:text-white transition-colors text-left">
                    Часто задаваемые вопросы
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Социальные сети */}
          <div className="border-t border-nature-green-200 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex space-x-6 mb-4 md:mb-0">
                {contacts.social_vk && (
                  <a href={contacts.social_vk} target="_blank" rel="noopener noreferrer" className="text-nature-green-300 hover:text-white transition-colors transform hover:scale-110 duration-200" aria-label="VKontakte">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1.01-1.49-.9-1.49.114v1.496c0 .4-.129.643-1.188.643-1.922 0-4.054-1.16-5.565-3.334-2.305-3.35-2.936-5.835-2.936-6.371 0-.24.097-.463.324-.463h1.744c.24 0 .33.1.423.33.972 2.652 2.608 4.966 3.28 4.966.255 0 .372-.117.372-.76v-2.914c-.07-1.186-.695-1.287-.695-1.71 0-.2.16-.4.42-.4h2.742c.203 0 .28.106.28.424v3.917c0 .204.093.285.15.285.255 0 .47-.117 1.147-.781 1.112-1.085 1.908-2.742 1.908-2.742.106-.22.27-.43.556-.43h1.744c.66 0 .8.34.66.8-.445 1.118-2.936 4.125-2.936 4.125-.18.22-.125.32 0 .525.093.14 1.017 1.003 1.5 1.608.24.304.378.604.123.804z" />
                    </svg>
                  </a>
                )}
                {contacts.social_tg && (
                  <a href={contacts.social_tg} target="_blank" rel="noopener noreferrer" className="text-nature-green-300 hover:text-white transition-colors transform hover:scale-110 duration-200" aria-label="Telegram">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </a>
                )}
              </div>
              <div className="text-nature-green-300 text-sm">© 2025 База отдыха "Каменный берег". Все права защищены.</div>
            </div>
          </div>
        </div>
      </footer>

      {/* Модальные окна */}
      {legalModal && (
        <LegalModal 
          isOpen={!!legalModal} 
          onClose={() => setLegalModal(null)} 
          type={legalModal} 
        />
      )}
    </>
  );
};

export default Footer;
