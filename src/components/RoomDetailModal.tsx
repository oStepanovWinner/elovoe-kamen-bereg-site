import React from 'react';
import { X, Users, Bed, Bath, Wifi, Car, Utensils, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RoomDetailModalProps {
  room: {
    id: number;
    name: string;
    price: string;
    capacity: string;
    features: string[];
    image: string;
    description?: string;
    amenities?: string[];
  };
  isOpen: boolean;
  onClose: () => void;
  onBook: () => void;
}

const RoomDetailModal: React.FC<RoomDetailModalProps> = ({ room, isOpen, onClose, onBook }) => {
  if (!isOpen) return null;

  const getFeatureIcon = (feature: string) => {
    if (feature.includes('спальн')) return <Bed size={16} />;
    if (feature.includes('ванна') || feature.includes('душ')) return <Bath size={16} />;
    if (feature.includes('Wi-Fi')) return <Wifi size={16} />;
    if (feature.includes('парковка')) return <Car size={16} />;
    if (feature.includes('кухн')) return <Utensils size={16} />;
    return <Home size={16} />;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Шапка модального окна */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-nature-green-800">{room.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Контент модального окна */}
        <div className="p-6">
          {/* Изображение номера */}
          <div className="relative h-80 mb-6 rounded-xl overflow-hidden">
            <img 
              src={room.image} 
              alt={room.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-nature-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
              <Users size={14} />
              <span>{room.capacity}</span>
            </div>
            <div className="absolute top-4 right-4 bg-nature-gold-500 text-nature-green-800 px-4 py-2 rounded-full text-lg font-bold">
              {room.price}
            </div>
          </div>

          {/* Описание */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-nature-green-800 mb-3">Описание</h3>
            <p className="text-nature-green-600 leading-relaxed">
              {room.description || `Комфортабельный номер "${room.name}" идеально подходит для проживания ${room.capacity.toLowerCase()}. Номер оборудован всем необходимым для комфортного отдыха на природе.`}
            </p>
          </div>

          {/* Удобства */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-nature-green-800 mb-4">Удобства</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {room.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-nature-green-50 rounded-lg">
                  <div className="text-nature-green-600">
                    {getFeatureIcon(feature)}
                  </div>
                  <span className="text-nature-green-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="flex flex-col sm:flex-row gap-4 sticky bottom-0 bg-white p-4 border-t border-gray-100">
            <Button
              onClick={onBook}
              className="flex-1 bg-nature-gold-500 hover:bg-nature-gold-600 text-nature-green-800 
              font-medium py-3 rounded-xl
              shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]
              transform hover:scale-102 active:scale-98
              transition-all duration-200 ease-in-out
              sm:order-1"
            >
              Забронировать номер
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-nature-green-300 text-nature-green-700 
              hover:bg-nature-green-50 font-medium py-3 rounded-xl
              transform hover:scale-102 active:scale-98
              transition-all duration-200 ease-in-out
              sm:order-2"
            >
              Закрыть
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailModal;
