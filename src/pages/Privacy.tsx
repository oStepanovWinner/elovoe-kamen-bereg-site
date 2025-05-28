
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <Header />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-nature-green-800 mb-8">
            Политика конфиденциальности
          </h1>
          <div className="w-24 h-1 bg-nature-gold-500 mb-12"></div>
          
          <div className="prose prose-lg max-w-none text-nature-green-700">
            <p className="mb-6">
              Настоящая Политика конфиденциальности определяет порядок обработки персональных данных 
              пользователей сайта базы отдыха "Каменный берег".
            </p>

            <h2 className="text-2xl font-bold text-nature-green-800 mt-8 mb-4">
              1. Общие положения
            </h2>
            <p className="mb-6">
              Администрация сайта обязуется соблюдать конфиденциальность персональных данных пользователей. 
              Персональные данные обрабатываются в соответствии с Федеральным законом «О персональных данных» № 152-ФЗ.
            </p>

            <h2 className="text-2xl font-bold text-nature-green-800 mt-8 mb-4">
              2. Какие данные мы собираем
            </h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Имя и фамилия</li>
              <li>Номер телефона</li>
              <li>Электронная почта</li>
              <li>Комментарии и дополнительные пожелания</li>
            </ul>

            <h2 className="text-2xl font-bold text-nature-green-800 mt-8 mb-4">
              3. Цели обработки данных
            </h2>
            <p className="mb-6">
              Персональные данные используются исключительно для:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Обработки заявок на бронирование</li>
              <li>Связи с клиентами</li>
              <li>Предоставления информации об услугах</li>
              <li>Улучшения качества обслуживания</li>
            </ul>

            <h2 className="text-2xl font-bold text-nature-green-800 mt-8 mb-4">
              4. Безопасность данных
            </h2>
            <p className="mb-6">
              Мы принимаем необходимые технические и организационные меры для защиты персональных данных 
              от неправомерного доступа, изменения, раскрытия или уничтожения.
            </p>

            <h2 className="text-2xl font-bold text-nature-green-800 mt-8 mb-4">
              5. Права пользователей
            </h2>
            <p className="mb-6">
              Пользователь имеет право на доступ к своим персональным данным, их изменение, 
              удаление или отзыв согласия на обработку.
            </p>

            <h2 className="text-2xl font-bold text-nature-green-800 mt-8 mb-4">
              6. Контактная информация
            </h2>
            <p className="mb-6">
              По вопросам обработки персональных данных обращайтесь:
              <br />Телефон: +7 (495) 123-45-67
              <br />Email: info@kamenny-bereg.ru
            </p>

            <p className="text-sm text-nature-green-600 mt-12">
              Последнее обновление: 25 мая 2025 года
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
