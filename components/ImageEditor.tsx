import React, { useState, useCallback } from 'react';
import { editImage } from '../services/geminiService';
import ImageUploader from './ImageUploader';
import ResultDisplay from './ResultDisplay';
import Spinner from './Spinner';

const ImageEditor: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState<string>('Add a retro, vintage filter to the image.');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [baseImagePreview, setBaseImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = (file: File) => {
    setImageFile(file);
    setGeneratedImage(null);
    setBaseImagePreview(URL.createObjectURL(file));
  }

  const handleGeneration = useCallback(async () => {
    if (!imageFile) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await editImage(imageFile, prompt);
      setGeneratedImage(result);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred during image editing.');
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, prompt]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Controls Column */}
      <div className="flex flex-col space-y-8">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">1. Upload Image to Edit</h2>
          <ImageUploader onFileSelect={handleFileSelected} />
        </div>
        
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-cyan-400 mb-4">2. Describe Your Edit</h2>
             <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Make the background black and white."
                className="w-full h-24 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                rows={3}
            />
        </div>

        <button
          onClick={handleGeneration}
          disabled={isLoading || !imageFile}
          className="w-full flex justify-center items-center bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <Spinner />
              Editing Image...
            </>
          ) : (
            'Apply Edit'
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
          baseImage={baseImagePreview ?? undefined}
          title={"Image Edit"}
        />
      </div>
    </div>
  );
};

export default ImageEditor;