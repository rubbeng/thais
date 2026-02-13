import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Upload, X, Check, Camera, ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import { useCartStore } from '../store/cart';

export const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addItem, openCart } = useCartStore();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Product not found</h2>
          <Link to="/" className="text-sm uppercase tracking-widest border-b border-black pb-1">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      alert('Please select a size');
      return;
    }
    if (!selectedColor) {
      alert('Please select a color');
      return;
    }

    addItem({
      id: `${product.id}-${selectedSize}-${selectedColor}-${Date.now()}`,
      name: product.name,
      price: product.price,
      image: uploadedImage || product.image,
      customImage: uploadedImage || undefined,
    });
    
    openCart();
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] mb-12 hover:opacity-50 transition-opacity"
        >
          <ChevronLeft size={16} />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Images */}
          <div>
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-[3/4] bg-gray-50 mb-6 overflow-hidden"
            >
              <img
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-gray-50 overflow-hidden transition-all ${
                      selectedImage === idx ? 'ring-2 ring-black' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div>
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-4">
                {product.category}
              </p>
              <h1 className="text-[clamp(2rem,4vw,3rem)] font-serif tracking-tight mb-4">
                {product.name}
              </h1>
              <p className="text-2xl font-medium">€{product.price.toFixed(2)}</p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-8">{product.description}</p>

            {/* Features */}
            <div className="mb-10">
              <h3 className="text-sm uppercase tracking-widest font-medium mb-4">Features</h3>
              <ul className="space-y-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                    <Check size={16} className="flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Personalization Section */}
            <div className="mb-10 p-6 bg-gray-50 border border-gray-200">
              <div className="flex items-start gap-3 mb-4">
                <Camera size={20} className="flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm uppercase tracking-widest font-medium mb-2">
                    Add Your Image
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Upload your photo to see a preview. Our design team will review and optimize it for printing.
                  </p>
                </div>
              </div>

              {uploadedImage ? (
                <div className="relative group">
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="absolute top-2 right-2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                  <div className="absolute bottom-2 left-2 right-2 bg-black/80 text-white text-xs py-2 px-3 rounded">
                    ✓ Image uploaded successfully
                  </div>
                </div>
              ) : (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-gray-300 bg-white py-12 flex flex-col items-center justify-center gap-3 hover:border-black transition-colors group"
                  >
                    <Upload size={32} className="text-gray-400 group-hover:text-black transition-colors" />
                    <span className="text-sm uppercase tracking-widest text-gray-600 group-hover:text-black transition-colors">
                      Upload Image
                    </span>
                    <span className="text-xs text-gray-400">PNG, JPG up to 10MB</span>
                  </button>
                </div>
              )}
            </div>

            {/* Color Selection */}
            {product.colors && (
              <div className="mb-8">
                <label className="text-sm uppercase tracking-widest font-medium block mb-4">
                  Color: {selectedColor && <span className="font-normal text-gray-600">{selectedColor}</span>}
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 text-sm border-2 transition-all ${
                        selectedColor === color
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 hover:border-black'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && (
              <div className="mb-10">
                <label className="text-sm uppercase tracking-widest font-medium block mb-4">
                  Size: {selectedSize && <span className="font-normal text-gray-600">{selectedSize}</span>}
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 text-sm border-2 transition-all ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-5 text-sm uppercase tracking-[0.25em] font-medium hover:bg-gray-900 transition-colors mb-4"
            >
              Add to Bag
            </motion.button>

            <p className="text-xs text-gray-500 text-center">
              Free shipping on orders over €100 · Ships within 5-7 business days
            </p>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-32">
          <h2 className="text-3xl font-serif tracking-tight mb-12 text-center">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products
              .filter((p) => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group block"
                >
                  <div className="aspect-[3/4] bg-gray-50 mb-4 overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-serif text-lg mb-1">{relatedProduct.name}</h3>
                  <p className="text-sm text-gray-600">€{relatedProduct.price.toFixed(2)}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};