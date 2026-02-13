import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '../store/cart';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { items, toggleCart } = useCartStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-white/95 backdrop-blur-xl py-4 shadow-sm border-b border-gray-100' : 'bg-transparent py-6'}`}>
      <div className="max-w-[1400px] mx-auto px-8 flex justify-between items-center">
        <div className="hidden md:flex space-x-10 text-[11px] uppercase tracking-[0.25em] font-medium">
          <Link to="/" className={`hover:opacity-50 transition-opacity ${isScrolled ? 'text-black' : 'text-white drop-shadow-lg'}`}>Apparel</Link>
          <Link to="/" className={`hover:opacity-50 transition-opacity ${isScrolled ? 'text-black' : 'text-white drop-shadow-lg'}`}>Home</Link>
          <Link to="/" className={`hover:opacity-50 transition-opacity ${isScrolled ? 'text-black' : 'text-white drop-shadow-lg'}`}>Bespoke</Link>
        </div>

        <Link to="/" className={`text-[32px] font-serif tracking-[0.15em] font-medium ${isScrolled ? 'text-black' : 'text-white drop-shadow-2xl'}`}>
          ZAPPY
        </Link>

        <div className="flex items-center space-x-6">
          <Search size={20} className={`cursor-pointer hover:opacity-50 transition-opacity hidden md:block ${isScrolled ? 'text-black' : 'text-white drop-shadow-lg'}`} />
          <div className="relative cursor-pointer group" onClick={toggleCart}>
            <ShoppingBag size={20} className={`hover:opacity-50 transition-opacity ${isScrolled ? 'text-black' : 'text-white drop-shadow-lg'}`} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[9px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-medium">
                {itemCount}
              </span>
            )}
          </div>
          <Menu 
            size={24} 
            className={`md:hidden cursor-pointer ${isScrolled ? 'text-black' : 'text-white drop-shadow-lg'}`} 
          />
        </div>
      </div>
    </nav>
  );
};