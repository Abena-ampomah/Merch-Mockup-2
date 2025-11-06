import React, { useState, useCallback } from 'react';
import type { Product, Model, ProductColor } from '../types';
import { PRODUCTS, MODELS } from '../constants';
import { generateMerchMockup, removeLogoBackground } from '../services/geminiService';
import ImageUploader from './ImageUploader';
import ProductSelector from './ProductSelector';
import ResultDisplay from './ResultDisplay';
import Spinner from './Spinner';
import ModelSelector from './ModelSelector';
import ColorSelector from './ColorSelector';

const PREDEFINED_PROMPTS = [
  "Place the logo on the center of the t-shirt, making it look like a high-quality print.",
  "Place the logo on the left chest of the t-shirt, giving it a subtle, embroidered look.",
  "Place the logo prominently on the front of the coffee mug, making it appear like a high-quality decal.",
  "Integrate the logo subtly into the design of the tote bag, as if it's part of the fabric pattern.",
  "Position the logo on the back of the hoodie, large and centered, with a distressed print effect.",
  "Create a realistic vinyl sticker of the logo, placed on a clean surface.",
  "Apply the logo as a full wrap design on a water bottle, with reflections consistent with the material.",
];

const MerchMockupGenerator: React.FC = () => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [prompt, setPrompt] = useState<string>(PREDEFINED_PROMPTS[0]); // Default to first predefined prompt
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [removeBackground, setRemoveBackground] = useState<boolean>(true);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [quality, setQuality] = useState<'standard' | 'high'>('standard');
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    PRODUCTS[0].colors?.[0] ?? null
  );

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setSelectedColor(product.colors?.[0] ?? null);
  };

  const handleGeneration = useCallback(async () => {
    if (!logoFile || !selectedProduct) {
      setError('Please upload a logo and select a product first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      let logoForMockup: File | null = logoFile;

      if (removeBackground && logoFile) {
        setLoadingMessage('Removing logo background...');
        logoForMockup = await removeLogoBackground(logoFile);
      }
      
      if (!logoForMockup) {
        throw new Error("Logo file is missing after processing.");
      }
      
      let finalPrompt: string;
      const productNameWithColor = selectedColor 
        ? `${selectedColor.name} ${selectedProduct.name}` 
        : selectedProduct.name;


      if (selectedModel) {
          finalPrompt = `You are provided with three images: a person (model), a product (${productNameWithColor}), and a logo. Your task is to create a photorealistic mockup.
          1. Place the logo onto the product. The product should be the color specified in the product name.
          2. Then, place the product (with the logo on it) onto the model, making it look like they are wearing/using it naturally.
          3. Ensure the final image has realistic lighting, shadows, and perspective consistent with the model's original photo. The lighting on the product and logo should seamlessly match the ambient lighting of the model's environment. Create natural-looking shadows cast by the product on the model.
          The user-provided instruction for placement is: "${prompt}"`;
      } else {
          finalPrompt = `You are provided with two images: a product (${productNameWithColor}) and a logo. Your task is to create a photorealistic mockup.
          1. Place the logo onto the product. The product should be the color specified in the product name.
          2. The final image should be a high-quality product shot.
          3. Generate realistic lighting and shadows that match the product's material and shape. The lighting should look natural and create a sense of depth. If the product is on a surface, it should cast a subtle, realistic shadow.
          The user-provided instruction for placement is: "${prompt}"`;
      }


      if (quality === 'high') {
        finalPrompt += "\n\nIMPORTANT: Generate the image at the highest possible photorealistic quality. Pay close attention to fabric textures, realistic lighting, and subtle shadows. The final result should be indistinguishable from a professional product photoshoot.";
      }

      setLoadingMessage('Generating mockup...');
      const result = await generateMerchMockup(
        selectedProduct.imageUrl, 
        logoForMockup, 
        finalPrompt,
        selectedModel?.imageUrl
      );
      setGeneratedImage(result);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred during image generation.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [logoFile, selectedProduct, prompt, removeBackground, selectedModel, quality, selectedColor]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Controls Column */}
      <div className="flex flex-col space-y-8">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">1. Upload Your Logo</h2>
          <ImageUploader onFileSelect={setLogoFile} />
           <div className="flex items-center mt-4 justify-center">
            <input
              id="remove-bg-checkbox"
              type="checkbox"
              checked={removeBackground}
              onChange={(e) => setRemoveBackground(e.target.checked)}
              className="w-4 h-4 text-cyan-600 bg-gray-700 border-gray-500 rounded focus:ring-cyan-600 ring-offset-gray-800 focus:ring-2"
            />
            <label htmlFor="remove-bg-checkbox" className="ml-2 text-sm font-medium text-gray-300">
              Automatically remove background
            </label>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">2. Choose a Product</h2>
          <ProductSelector
            products={PRODUCTS}
            selectedProduct={selectedProduct}
            onSelectProduct={handleProductSelect}
          />
           {selectedProduct.colors && selectedProduct.colors.length > 0 && selectedColor && (
            <div className="mt-6">
              <h3 className="text-md font-semibold text-gray-200 mb-3">Color</h3>
              <ColorSelector
                colors={selectedProduct.colors}
                selectedColor={selectedColor}
                onSelectColor={setSelectedColor}
              />
            </div>
          )}
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">3. Choose a Model (Optional)</h2>
          <ModelSelector
            models={MODELS}
            selectedModel={selectedModel}
            onSelectModel={setSelectedModel}
          />
        </div>
        
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-cyan-400 mb-4">4. Describe Placement</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {PREDEFINED_PROMPTS.map((p, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(p)}
                  className={`py-2 px-3 rounded-lg text-xs font-medium text-left transition-colors ${
                    prompt === p ? 'bg-cyan-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  }`}
                  title={p}
                >
                  {p.length > 50 ? p.substring(0, 47) + '...' : p}
                </button>
              ))}
            </div>
             <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Place the logo on the front of the mug."
                className="w-full h-24 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                rows={3}
            />
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">5. Output Quality</h2>
          <div className="flex gap-4">
            <button
                onClick={() => setQuality('standard')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                    quality === 'standard' ? 'bg-cyan-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
                }`}
            >
                Standard
            </button>
            <button
                onClick={() => setQuality('high')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                    quality === 'high' ? 'bg-cyan-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
                }`}
            >
                High
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">High quality may take longer to generate.</p>
        </div>

        <button
          onClick={handleGeneration}
          disabled={isLoading || !logoFile || !selectedProduct}
          className="w-full flex justify-center items-center bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <Spinner />
              Generating...
            </>
          ) : (
            'Generate Mockup'
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
          generatedImage={generatedImage}
          baseImage={selectedModel?.imageUrl ?? selectedProduct?.imageUrl}
          title={selectedProduct?.name}
        />
      </div>
    </div>
  );
};

export default MerchMockupGenerator;