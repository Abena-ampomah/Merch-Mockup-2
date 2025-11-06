
import React from 'react';
import type { Tool } from '../types';
import { TshirtIcon } from './icons/TshirtIcon';
import { PhotoIcon } from './icons/PhotoIcon';
import { SparklesIcon } from './icons/SparklesIcon';


interface TabSelectorProps {
  activeTool: Tool;
  onSelectTool: (tool: Tool) => void;
}

const tools: { id: Tool; name: string; icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
  { id: 'merch', name: 'Merch Mockups', icon: TshirtIcon },
  { id: 'image-editor', name: 'Image Editor', icon: PhotoIcon },
  { id: 'image-generator', name: 'Image Generator', icon: SparklesIcon },
];

const TabSelector: React.FC<TabSelectorProps> = ({ activeTool, onSelectTool }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 bg-gray-800 p-2 rounded-xl">
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => onSelectTool(tool.id)}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 ${
            activeTool === tool.id
              ? 'bg-cyan-600 text-white shadow-lg scale-105'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
          }`}
        >
          <tool.icon className="w-5 h-5" />
          {tool.name}
        </button>
      ))}
    </div>
  );
};

export default TabSelector;