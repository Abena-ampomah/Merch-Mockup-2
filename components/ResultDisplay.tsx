import React from 'react';
import Spinner from './Spinner';
import { DownloadIcon } from './icons/DownloadIcon';

interface ResultDisplayProps {
  isLoading: boolean;
  loadingMessage?: string;
  generatedImage?: string | null;
  generatedVideo?: string | null;
  baseImage: string | undefined;
  title: string | undefined;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, generatedImage, generatedVideo, baseImage, title, loadingMessage }) => {
  const downloadMedia = () => {
    if (!generatedImage && !generatedVideo) return;
    const link = document.createElement('a');
    link.href = generatedImage || generatedVideo!;
    
    if (generatedImage) {
        link.download = `${title?.toLowerCase().replace(/\s+/g, '-') || 'result'}.png`;
    } else {
        link.download = `${title?.toLowerCase().replace(/\s+/g, '-') || 'result'}.mp4`;
    }
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hasMedia = generatedImage || generatedVideo;

  return (
    <div className="w-full aspect-square bg-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-10 text-center p-4">
          <Spinner />
          <p className="mt-4 text-lg">{loadingMessage || 'Generating your masterpiece...'}</p>
        </div>
      )}
      {generatedImage ? (
        <img src={generatedImage} alt="Generated Result" className="w-full h-full object-contain" />
      ) : generatedVideo ? (
        <video src={generatedVideo} controls autoPlay loop className="w-full h-full object-contain" />
      ) : baseImage ? (
        <img src={baseImage} alt={title} className="w-full h-full object-cover opacity-50" />
      ) : (
        <p className="text-gray-400">Your result will appear here</p>
      )}

      {hasMedia && !isLoading && (
        <button
          onClick={downloadMedia}
          className="absolute bottom-4 right-4 bg-cyan-600 text-white p-3 rounded-full hover:bg-cyan-700 transition-colors shadow-lg"
          aria-label="Download Media"
        >
          <DownloadIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default ResultDisplay;
