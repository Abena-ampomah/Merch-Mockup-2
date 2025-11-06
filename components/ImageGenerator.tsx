import React, { useState, useCallback } from 'react';
import { generateImage } from '../services/geminiService';
import ResultDisplay from './ResultDisplay';
import Spinner from './Spinner';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('A photorealistic image of an astronaut riding a horse on Mars.');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneration = useCallback(async () => {
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateImage(prompt);
      setGeneratedImage(result);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred during image generation.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Controls Column */}
      <div className="flex flex-col space-y-8">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-cyan-400 mb-4">1. Describe the Image You Want</h2>
             <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A cute cat wearing a wizard hat."
                className="w-full h-36 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                rows={5}
            />
        </div>

        <button
          onClick={handleGeneration}
          disabled={isLoading || !prompt}
          className="w-full flex justify-center items-center bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <Spinner />
              Generating Image...
            </>
          ) : (
            'Generate Image'
          )}
        </button>
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      </div>

      {/* Results Column */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg sticky top-8 h-fit">
        <h2 className="text-xl font-bold text-cyan-400 mb-4">Result</h2>
        <ResultDisplay
          isLoading={isLoading}
          generatedImage={generatedImage}
          baseImage={undefined}
          title={prompt.substring(0, 30)}
        />
      </div>
    </div>
  );
};

export default ImageGenerator;
