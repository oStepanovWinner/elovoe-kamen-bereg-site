
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface BookingFormProps {
  trigger: React.ReactNode;
}

const BookingForm: React.FC<BookingFormProps> = ({ trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    comment: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Форма отправлена:', formData);
    setIsOpen(false);
    setFormData({ name: '', phone: '', comment: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-nature-green-800 text-center">
            Бронирование номера
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-nature-green-700 mb-2">
              Имя *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-nature-green-300 rounded-lg focus:ring-2 focus:ring-nature-green-500 focus:border-transparent"
              placeholder="Введите ваше имя"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-nature-green-700 mb-2">
              Телефон *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-nature-green-300 rounded-lg focus:ring-2 focus:ring-nature-green-500 focus:border-transparent"
              placeholder="+7 (999) 123-45-67"
            />
          </div>
          
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-nature-green-700 mb-2">
              Комментарий
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-nature-green-300 rounded-lg focus:ring-2 focus:ring-nature-green-500 focus:border-transparent resize-none"
              placeholder="Дополнительные пожелания или вопросы..."
            />
          </div>

          <div className="bg-nature-green-50 p-4 rounded-lg">
            <p className="text-sm text-nature-green-700 mb-2">
              <strong>Телефон базы отдыха:</strong>
            </p>
            <a 
              href="tel:+79525129738" 
              className="text-nature-green-800 font-semibold hover:text-nature-green-900 transition-colors"
            >
              +7-952-512-97-38
            </a>
          </div>
          
          <div className="flex space-x-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Отмена
            </Button>
            <Button 
              type="submit"
              className="flex-1 bg-nature-gold-500 hover:bg-nature-gold-600 text-nature-green-800"
            >
              Отправить заявку
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
