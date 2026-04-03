import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { MOCK_CATEGORIES } from '../../data/mockCategories';

export default function CategoryGrid() {
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
          <span className="text-accent font-medium text-sm tracking-widest uppercase">Explore</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mt-2 mb-4">
            Shop by Category
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {MOCK_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Link
                to={`/category/${category.slug}`}
                className="group relative block aspect-[3/4] rounded-2xl overflow-hidden"
              >
                {/* Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-white/70 text-sm mb-3">{category.productCount}+ Products</p>
                  <div className="flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all">
                    <span>Shop Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Hover border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/50 rounded-2xl transition-colors duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
