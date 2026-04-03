import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { MOCK_TESTIMONIALS } from '../../data/mockCategories';

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % MOCK_TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-accent font-medium text-sm tracking-widest uppercase">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mt-2 mb-4">
            What Our Clients Say
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        {/* Carousel */}
        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-surface rounded-3xl p-8 sm:p-12 text-center relative"
            >
              <Quote className="w-10 h-10 text-accent/30 mx-auto mb-6" />

              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < MOCK_TESTIMONIALS[current].rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8 italic">
                "{MOCK_TESTIMONIALS[current].comment}"
              </p>

              {/* Avatar & Info */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-serif text-lg font-bold mb-3">
                  {MOCK_TESTIMONIALS[current].avatar}
                </div>
                <div className="font-serif font-semibold text-gray-900">
                  {MOCK_TESTIMONIALS[current].name}
                </div>
                <div className="text-sm text-gray-500">
                  {MOCK_TESTIMONIALS[current].role} • {MOCK_TESTIMONIALS[current].location}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrent((c) => (c - 1 + MOCK_TESTIMONIALS.length) % MOCK_TESTIMONIALS.length)}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {MOCK_TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((c) => (c + 1) % MOCK_TESTIMONIALS.length)}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
