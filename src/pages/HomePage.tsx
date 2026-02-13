import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '../data/products';

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center grain">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=2400" 
          alt="Zappy Lifestyle" 
          className="w-full h-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>
      
      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-8"
        >
          <Sparkles size={14} className="text-white/80" />
          <span className="text-[11px] uppercase tracking-[0.3em] font-medium">Your Vision, Our Craft</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(3rem,8vw,7rem)] font-serif mb-6 tracking-tight leading-[0.95] font-medium"
        >
          Personalized
          <br />
          <span className="italic font-normal opacity-90">Perfection</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/90 text-lg mb-12 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Transform your memories into premium apparel and home goods. 
          <br className="hidden md:block" />
          Every piece is crafted with museum-quality printing.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a 
            href="#collection" 
            className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-gray-100 transition-all duration-500"
          >
            Shop Collection
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#" 
            className="group inline-flex items-center gap-3 border-2 border-white px-8 py-4 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-white hover:text-black transition-all duration-500"
          >
            <Camera size={16} /> 
            Create Custom
          </a>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/40"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};

const ProductCard = ({ product, index }: { product: any; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block cursor-pointer">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-6">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="absolute bottom-6 left-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <button className="w-full bg-white text-black py-4 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-gray-100">
              View Details
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400">{product.category}</p>
          <h3 className="font-serif text-xl tracking-tight">{product.name}</h3>
          <p className="text-sm text-gray-600 font-medium">€{product.price.toFixed(2)}</p>
        </div>
      </Link>
    </motion.div>
  );
};

const FeaturedCollection = () => {
  return (
    <section id="collection" className="py-32 px-8 max-w-[1400px] mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8"
      >
        <div className="max-w-xl">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 block mb-6 font-medium">Curated Selection</span>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-serif tracking-tight leading-[0.95] mb-4">
            The Essentials
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Each piece is a blank canvas for your creativity. Premium materials meet precision printing.
          </p>
        </div>
        <a 
          href="#" 
          className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-medium border-b-2 border-black pb-2 hover:opacity-50 transition-opacity"
        >
          View All Products
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const steps = [
    { number: "01", title: "Upload Your Image", description: "Share your photo or design with our secure platform" },
    { number: "02", title: "Choose Your Product", description: "Select from our curated collection of premium items" },
    { number: "03", title: "Review & Approve", description: "Our design team prepares a preview for your approval" },
    { number: "04", title: "Crafted & Delivered", description: "Handcrafted with care and shipped to your door" },
  ];

  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 block mb-6 font-medium">How It Works</span>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-serif tracking-tight leading-[0.95] mb-6">
            Crafted with <span className="italic">Intention</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            We don't just print. Every order is reviewed by our design team to ensure perfection.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="text-6xl font-serif text-gray-200 mb-6">{step.number}</div>
              <h3 className="text-xl font-medium mb-3 tracking-tight">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-6 w-12 h-[1px] bg-gray-200" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EditorialSection = () => {
  return (
    <section className="py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 block mb-6 font-medium">The Zappy Difference</span>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-serif mb-8 leading-[0.95] tracking-tight">
            Museum-Quality <br />
            <span className="italic text-gray-600">Printing</span>
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8 text-lg">
            We use archival-grade inks and premium materials that last for decades. 
            Your memories deserve nothing less than perfection.
          </p>
          <ul className="space-y-4 mb-10">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-black mt-2" />
              <span className="text-gray-700">Premium organic cotton and ceramic materials</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-black mt-2" />
              <span className="text-gray-700">Fade-resistant, archival-grade printing</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-black mt-2" />
              <span className="text-gray-700">Hand-inspected before shipping</span>
            </li>
          </ul>
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-medium border-b-2 border-black pb-2 hover:opacity-50 transition-opacity"
          >
            Our Process
            <ArrowRight size={14} />
          </a>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] lg:aspect-square"
        >
          <img 
            src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1200" 
            alt="Craftsmanship" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export const HomePage = () => {
  return (
    <main>
      <Hero />
      <FeaturedCollection />
      <ProcessSection />
      <EditorialSection />
    </main>
  );
};