import React from 'react';
import type { Model } from '../types';

interface ModelSelectorProps {
  models: Model[];
  selectedModel: Model | null;
  onSelectModel: (model: Model | null) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ models, selectedModel, onSelectModel }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {/* "None" option */}
      <div
        onClick={() => onSelectModel(null)}
        className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 flex items-center justify-center h-24 sm:h-32 bg-gray-700 ${
          selectedModel === null ? 'border-cyan-500 scale-105 shadow-lg' : 'border-gray-600 hover:border-cyan-600'
        }`}
      >
        <p className="text-center p-2 text-sm font-medium">None</p>
      </div>

      {/* Model options */}
      {models.map((model) => (
        <div
          key={model.id}
          onClick={() => onSelectModel(model)}
          className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
            selectedModel?.id === model.id ? 'border-cyan-500 scale-105 shadow-lg' : 'border-gray-700 hover:border-cyan-600'
          }`}
        >
          <img src={model.imageUrl} alt={model.name} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
};

export default ModelSelector;