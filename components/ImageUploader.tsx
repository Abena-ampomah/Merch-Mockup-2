
import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onFileSelect: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onFileSelect }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        if (file.type.startsWith('image/')) {
          onFileSelect(file);
          setFileName(file.name);
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result as string);
          };
          reader.readAsDataURL(file);
        } else {
          alert('Please select a valid image file.');
        }
      }
    },
    [onFileSelect]
  );

  return (
    <div>
      <label
        htmlFor="logo-upload"
        className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors"
      >
        {preview ? (
          <img src={preview} alt="Logo Preview" className="object-contain h-full max-h-40 p-2" />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500">PNG, JPG, WEBP (transparent recommended)</p>
          </div>
        )}
        <input id="logo-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
      </label>
      {fileName && (
          <p className="text-sm text-gray-300 mt-2 text-center">
              Selected: <span className="font-medium text-cyan-400">{fileName}</span>
          </p>
      )}
    </div>
  );
};

export default ImageUploader;
