import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../product/ProductCard';
import { getNewArrivals } from '../../data/mockProducts';

export default function NewArrivals() {
  const products = getNewArrivals().slice(0, 4);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="text-accent font-medium text-sm tracking-widest uppercase">Just Landed</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mt-2">
              New Arrivals
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
