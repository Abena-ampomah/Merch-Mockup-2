import React from 'react';
import type { Product } from '../types';

interface ProductSelectorProps {
  products: Product[];
  selectedProduct: Product;
  onSelectProduct: (product: Product) => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({ products, selectedProduct, onSelectProduct }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => onSelectProduct(product)}
          className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
            selectedProduct.id === product.id ? 'border-cyan-500 scale-105 shadow-lg' : 'border-gray-700 hover:border-cyan-600'
          }`}
        >
          <img src={product.imageUrl} alt={product.name} className="w-full h-24 sm:h-32 object-cover" />
          <p className="text-center p-2 bg-gray-700 text-sm font-medium">{product.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductSelector;