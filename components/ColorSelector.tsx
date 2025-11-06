import React from 'react';
import type { ProductColor } from '../types';

interface ColorSelectorProps {
  colors: ProductColor[];
  selectedColor: ProductColor;
  onSelectColor: (color: ProductColor) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ colors, selectedColor, onSelectColor }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((color) => (
        <button
          key={color.name}
          onClick={() => onSelectColor(color)}
          className={`w-8 h-8 rounded-full border-2 transition-transform transform hover:scale-110 focus:outline-none ${
            selectedColor.hex === color.hex ? 'border-cyan-400 scale-110 ring-2 ring-cyan-400 ring-offset-2 ring-offset-gray-800' : 'border-gray-500'
          }`}
          style={{ backgroundColor: color.hex }}
          aria-label={`Select ${color.name} color`}
        >
          {/* Add a checkmark for the white color to make selection visible */}
          {selectedColor.hex === color.hex && color.hex.toUpperCase() === '#FFFFFF' && (
             <svg className="w-5 h-5 text-black mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
             </svg>
          )}
        </button>
      ))}
    </div>
  );
};

export default ColorSelector;
