import React from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black text-white pt-32 pb-12 px-8">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-32">
        <div className="lg:col-span-2">
          <div className="text-3xl font-serif tracking-[0.15em] font-medium mb-8">ZAPPY</div>
          <p className="text-white/60 leading-relaxed max-w-sm mb-8">
            Elevating everyday objects through bespoke design and museum-quality craftsmanship.
          </p>
          <div className="flex gap-6">
            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
              <span className="text-sm">In</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
              <span className="text-sm">Ig</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
              <span className="text-sm">Tw</span>
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-medium mb-8 text-white/40">Shop</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li><a href="#" className="hover:text-white transition-colors">T-Shirts & Apparel</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Mugs & Cups</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Home Goods</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Gift Sets</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-medium mb-8 text-white/40">Company</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Quality Promise</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-medium mb-8 text-white/40">Support</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-[1400px] mx-auto pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">© 2026 Zappy Studio. All Rights Reserved.</p>
        <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] text-white/40">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
};