import React, { useState } from 'react';
import Header from './components/Header';
import TabSelector from './components/TabSelector';
import MerchMockupGenerator from './components/MerchMockupGenerator';
import ImageEditor from './components/ImageEditor';
import ImageGenerator from './components/ImageGenerator';
import type { Tool } from './types';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>('merch');

  const renderTool = () => {
    switch (activeTool) {
      case 'merch':
        return <MerchMockupGenerator />;
      case 'image-editor':
        return <ImageEditor />;
      case 'image-generator':
        return <ImageGenerator />;
      default:
        return <MerchMockupGenerator />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <TabSelector activeTool={activeTool} onSelectTool={setActiveTool} />
        <div className="mt-8 bg-gray-800/50 rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
          {renderTool()}
        </div>
      </main>
    </div>
  );
};

export default App;