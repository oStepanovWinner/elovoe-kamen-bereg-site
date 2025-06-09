import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | 'rules';
}

const typeToFile = {
  privacy: 'privacy',
  terms: 'offer',
  rules: 'rules',
};

const typeToTitle = {
  privacy: 'Политика конфиденциальности',
  terms: 'Договор оферты',
  rules: 'Правила проживания',
};

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setHtml('');
    fetch(`/${typeToFile[type]}.html`).then(res => res.text()).then(setHtml);
  }, [type, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Шапка модального окна */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-nature-green-800">{typeToTitle[type]}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Контент модального окна */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {html ? (
            <div
              className="prose prose-nature max-w-none text-nature-green-700"
              dangerouslySetInnerHTML={{ __html: html }}
              style={{
                lineHeight: '1.6',
                fontSize: '16px',
              }}
            />
          ) : (
            <div>Загрузка...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
