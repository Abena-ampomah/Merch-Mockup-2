
import React, { useState } from 'react';
import Spinner from './Spinner';
import { DownloadIcon } from './icons/DownloadIcon';

interface ResultDisplayProps {
  isLoading: boolean;
  loadingMessage?: string;
  generatedImage?: string | null;
  generatedVideo?: string | null; // Keep for now as it's still conditionally used in render
  baseImage: string | undefined;
  title: string | undefined;
}

const IMAGE_FORMAT_OPTIONS = [
  { label: 'PNG', value: 'png', mimeType: 'image/png' },
  { label: 'JPG', value: 'jpeg', mimeType: 'image/jpeg' },
  { label: 'WebP', value: 'webp', mimeType: 'image/webp' },
];

const IMAGE_SIZE_OPTIONS = [
  { label: 'Original', value: 'original' },
  { label: 'Large (max 1920px)', value: 'large' },
  { label: 'Medium (max 1280px)', value: 'medium' },
  { label: 'Small (max 800px)', value: 'small' },
];

const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, generatedImage, generatedVideo, baseImage, title, loadingMessage }) => {
  const [selectedFormat, setSelectedFormat] = useState<'png' | 'jpeg' | 'webp'>('png');
  const [selectedSize, setSelectedSize] = useState<'original' | 'large' | 'medium' | 'small'>('original');

  const processImageForDownload = async (dataUrl: string, format: 'png' | 'jpeg' | 'webp', size: 'original' | 'large' | 'medium' | 'small'): Promise<{ dataUrl: string, mimeType: string, extension: string }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        let targetWidth = img.width;
        let targetHeight = img.height;

        if (size !== 'original') {
          const maxWidth = size === 'large' ? 1920 : size === 'medium' ? 1280 : 800;
          if (img.width > maxWidth || img.height > maxWidth) {
            if (img.width > img.height) {
              targetWidth = maxWidth;
              targetHeight = (img.height / img.width) * targetWidth;
            } else {
              targetHeight = maxWidth;
              targetWidth = (img.width / img.height) * targetHeight;
            }
          }
        }

        canvas.width = targetWidth;
        canvas.height = targetHeight;
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        const mimeType = IMAGE_FORMAT_OPTIONS.find(opt => opt.value === format)?.mimeType || 'image/png';
        const extension = format; // 'png', 'jpeg', 'webp'
        const quality = format === 'jpeg' || format === 'webp' ? 0.9 : 1; // Default quality for lossy formats

        try {
          const processedDataUrl = canvas.toDataURL(mimeType, quality);
          resolve({ dataUrl: processedDataUrl, mimeType, extension });
        } catch (e) {
          reject(e);
        }
      };
      img.onerror = (e) => reject(e);
      img.src = dataUrl;
    });
  };

  const downloadMedia = async () => {
    // Only handle image download now that video generation is removed.
    if (generatedImage) {
      try {
        const { dataUrl, mimeType, extension } = await processImageForDownload(generatedImage, selectedFormat, selectedSize);
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${title?.toLowerCase().replace(/\s+/g, '-') || 'result'}.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (e) {
        console.error("Error processing image for download:", e);
        alert("Failed to prepare image for download.");
      }
    }
  };

  const hasMedia = generatedImage; // No longer checking generatedVideo
  const isImageResult = !!generatedImage;

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
      ) : baseImage ? (
        <img src={baseImage} alt={title} className="w-full h-full object-cover opacity-50" />
      ) : (
        <p className="text-gray-400">Your result will appear here</p>
      )}

      {hasMedia && !isLoading && (
        <div className="absolute bottom-4 right-4 flex flex-col items-end space-y-2">
          {/* Only image options are displayed */}
          {isImageResult && (
            <>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value as typeof selectedFormat)}
                className="bg-gray-700 text-white text-sm p-2 rounded-md focus:ring-cyan-500 focus:border-cyan-500 border border-gray-600 shadow-sm"
                aria-label="Select download image format"
              >
                {IMAGE_FORMAT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value as typeof selectedSize)}
                className="bg-gray-700 text-white text-sm p-2 rounded-md focus:ring-cyan-500 focus:border-cyan-500 border border-gray-600 shadow-sm"
                aria-label="Select download image size"
              >
                {IMAGE_SIZE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </>
          )}
          <button
            onClick={downloadMedia}
            className="bg-cyan-600 text-white p-3 rounded-full hover:bg-cyan-700 transition-colors shadow-lg"
            aria-label="Download Media"
          >
            <DownloadIcon className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;