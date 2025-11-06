import React, { useState, useCallback, useEffect } from 'react';
import { generateVideo } from '../services/geminiService';
import ImageUploader from './ImageUploader';
import ResultDisplay from './ResultDisplay';
import Spinner from './Spinner';

type AspectRatio = '16:9' | '9:16';

const VideoGenerator: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState<string>('The scene comes to life, with subtle motion in the background and the main subject gently moving.');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [baseImagePreview, setBaseImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isKeySelected, setIsKeySelected] = useState<boolean>(false);

  useEffect(() => {
    const checkKey = async () => {
      try {
        if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
          const hasKey = await window.aistudio.hasSelectedApiKey();
          setIsKeySelected(hasKey);
        }
      } catch (e) {
        console.error("Error checking for API key:", e);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    try {
        if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
            await window.aistudio.openSelectKey();
            // Assume success to avoid race conditions. If key is invalid, API call will fail.
            setIsKeySelected(true);
        }
    } catch (e) {
        console.error("Error opening API key selection:", e);
        setError("Could not open API key selection dialog.");
    }
  };

  const handleFileSelected = (file: File) => {
    setImageFile(file);
    setGeneratedVideo(null);
    setBaseImagePreview(URL.createObjectURL(file));
  };

  const handleGeneration = useCallback(async () => {
    if (!imageFile) {
      setError('Please upload a starting image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedVideo(null);

    try {
      const result = await generateVideo(imageFile, prompt, aspectRatio, setLoadingMessage);
      setGeneratedVideo(result);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred during video generation.';
      setError(errorMessage);
      if (errorMessage.includes("Requested entity was not found") || errorMessage.includes("API key not valid")) {
        setError("API Key error. Please select your key again.");
        setIsKeySelected(false);
      }
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [imageFile, prompt, aspectRatio]);

  if (!isKeySelected) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-800 rounded-2xl">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">API Key Required for Video Generation</h2>
        <p className="max-w-md mb-6 text-gray-300">
          The Veo video generation model requires you to use your own Google AI Studio API key. 
          Please select a key to continue.
        </p>
        <button
          onClick={handleSelectKey}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
        >
          Select Your API Key
        </button>
        <p className="text-xs text-gray-500 mt-4">
          For more information on billing, please visit the{' '}
          <a
            href="https://ai.google.dev/gemini-api/docs/billing"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-cyan-400"
          >
            official documentation
          </a>.
        </p>
         {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Controls Column */}
      <div className="flex flex-col space-y-8">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">1. Upload a Starting Image</h2>
          <ImageUploader onFileSelect={handleFileSelected} />
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">2. Choose Aspect Ratio</h2>
          <div className="flex gap-4">
            {(['16:9', '9:16'] as AspectRatio[]).map((ratio) => (
              <button
                key={ratio}
                onClick={() => setAspectRatio(ratio)}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                  aspectRatio === ratio ? 'bg-cyan-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {ratio === '16:9' ? `Landscape (${ratio})` : `Portrait (${ratio})`}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-cyan-400 mb-4">3. Describe the Video</h2>
             <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A gentle breeze rustles the leaves."
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
              Generating Video...
            </>
          ) : (
            'Generate Video'
          )}
        </button>
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      </div>

      {/* Results Column */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg sticky top-8 h-fit">
        <h2 className="text-xl font-bold text-cyan-400 mb-4">Result</h2>
        <ResultDisplay
          isLoading={isLoading}
          loadingMessage={loadingMessage}
          generatedVideo={generatedVideo}
          baseImage={baseImagePreview ?? undefined}
          title={"Video Result"}
        />
      </div>
    </div>
  );
};

export default VideoGenerator;
