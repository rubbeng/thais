import React from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cart';

import { createCheckout } from '../lib/shopify';
import { SHOPIFY_CONFIG } from '../config';

export const Cart = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();
  const [isRedirecting, setIsRedirecting] = React.useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 8.50;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (SHOPIFY_CONFIG.storefrontAccessToken === 'YOUR_STOREFRONT_ACCESS_TOKEN') {
      alert('Shopify integration is in "Demo Mode". To enable real checkout, please add your Storefront API token in src/config.ts');
      return;
    }

    setIsRedirecting(true);
    const checkoutUrl = await createCheckout(items);
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      alert('There was an error creating your checkout. Please try again.');
      setIsRedirecting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-serif tracking-tight">Your Bag</h2>
                <button onClick={closeCart} className="hover:opacity-50 transition-opacity">
                  <X size={24} />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </p>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-8">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-400 mb-4">Your bag is empty</p>
                  <button
                    onClick={closeCart}
                    className="text-sm uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500 mb-3">€{item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              item.quantity > 1
                                ? updateQuantity(item.id, item.quantity - 1)
                                : removeItem(item.id)
                            }
                            className="w-7 h-7 border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-black transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 p-8">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : `€${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {subtotal < 100 && (
                    <p className="text-xs text-gray-500">
                      Spend €{(100 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                  <div className="flex justify-between text-lg font-medium pt-3 border-t border-gray-100">
                    <span>Total</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={handleCheckout}
                  disabled={isRedirecting}
                  className="w-full bg-black text-white py-4 text-sm uppercase tracking-widest font-medium hover:bg-gray-900 transition-colors disabled:bg-gray-400"
                >
                  {isRedirecting ? 'Redirecting to Shopify...' : 'Checkout'}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};