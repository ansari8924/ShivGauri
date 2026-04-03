import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../product/ProductCard';
import { getFeaturedProducts } from '../../data/mockProducts';

export default function FeaturedProducts() {
  const products = getFeaturedProducts().slice(0, 8);

  return (
    <section className="py-6 sm:py-8 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-6 gap-4"
        >
          <div>
            <span className="text-accent font-medium text-sm tracking-widest uppercase">Curated For You</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mt-2">
              Featured Collection
            </h2>
          </div>
          <Link
            to="/category/sarees"
            className="flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
