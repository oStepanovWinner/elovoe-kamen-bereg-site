import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <Header />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-nature-green-800 mb-8">
            Договор оферты
          </h1>
          <div className="w-24 h-1 bg-nature-green-500 mb-12"></div>
          
          <div className="prose prose-lg max-w-none text-nature-green-700">
            <p className="mb-6">
              Настоящий договор-оферта определяет условия предоставления услуг размещения 
              на базе отдыха "Каменный берег".
            </p>

            <h2 className="text-2xl font-bold text-nature-green-800 mt-8 mb-4">
              1. Предмет договора
            </h2>
            <p className="mb-6">
              База отдыха предоставляет услуги временного размещения в номерах различных категорий, 
              а также дополнительные услуги согласно прайс-листу.
            </p>

            <h2 className="text-2xl font-bold text-nature-green-800 mt-8 mb-4">
              2. Бронирование и оплата
            </h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Бронирование осуществляется при внесении предоплаты в размере 30% от стоимости проживания</li>
              <li>Полная оплата производится при заселении</li>
              <li>Принимаются наличные и банковские карты</li>
              <li>При отказе от бронирования менее чем за 3 дня предоплата не возвращается</li>
            </ul>

            <h2 className="text-2xl font-bold text-nature-green-800 mt-8 mb-4">
              3. Заселение и выселение
            </h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Время заселения: 14:00</li>
              <li>Время выселения: 12:00</li>
              <li>Ранний заезд и поздний выезд возможны за дополнительную плату при наличии мест</li>
              <li>При заселении необходимо предъявить документ, удостоверяющий личность</li>
            </ul>

            <h2 className="text-2xl font-bold text-nature-green-800 mt-8 mb-4">
              4. Правила проживания
            </h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Соблюдение тишины с 23:00 до 08:00</li>
              <li>Запрещено курение в номерах</li>
              <li>Домашние животные допускаются за дополнительную плату</li>
              <li>Гости несут материальную ответственность за причиненный ущерб</li>
            </ul>

            <h2 className="text-2xl font-bold text-nature-green-800 mt-8 mb-4">
              5. Ответственность сторон
            </h2>
            <p className="mb-6">
              База отдыха не несет ответственности за ценности, оставленные гостями в номерах. 
              Для хранения ценностей рекомендуется использовать сейф на ресепшене.
            </p>

            <h2 className="text-2xl font-bold text-nature-green-800 mt-8 mb-4">
              6. Форс-мажор
            </h2>
            <p className="mb-6">
              В случае форс-мажорных обстоятельств стороны освобождаются от выполнения 
              обязательств по настоящему договору.
            </p>

            <h2 className="text-2xl font-bold text-nature-green-800 mt-8 mb-4">
              7. Контактная информация
            </h2>
            <p className="mb-6">
              База отдыха "Каменный берег"
              <br />Адрес: Тверская область, Осташковский район, д. Березовка, ул. Озерная, 15
              <br />Телефон: +7 (495) 123-45-67
              <br />Email: info@kamenny-bereg.ru
            </p>

            <p className="text-sm text-nature-green-600 mt-12">
              Договор вступает в силу с момента оформления бронирования
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
