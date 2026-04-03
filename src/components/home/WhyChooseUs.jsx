import { motion } from 'framer-motion';
import { Truck, Shield, CreditCard, Headphones, Award, Package } from 'lucide-react';

const USPs = [
  {
    icon: Award,
    title: 'Authentic Products',
    description: 'Genuine handwoven and designer sarees sourced directly from weavers across India.',
  },
  {
    icon: CreditCard,
    title: 'Wholesale Pricing',
    description: 'Best-in-market wholesale rates with bulk order discounts and easy payment options.',
  },
  {
    icon: Truck,
    title: 'Pan-India Delivery',
    description: 'Fast, secure shipping across India. Free delivery on orders above ₹5,000.',
  },
  {
    icon: Shield,
    title: 'Quality Guarantee',
    description: '100% quality assurance with easy returns. GST invoiced on every order.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description: 'Personal relationship manager for wholesale clients. WhatsApp support available.',
  },
  {
    icon: Package,
    title: 'Secure Packaging',
    description: 'Premium packaging to ensure your orders arrive in perfect condition every time.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-accent font-medium text-sm tracking-widest uppercase">Our Promise</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mt-2 mb-4">
            Why Choose Shiv Gauri?
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        {/* USP Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {USPs.map((usp, index) => (
            <motion.div
              key={usp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 sm:p-8 bg-white rounded-2xl border border-gray-100 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/5 group-hover:bg-primary/10 flex items-center justify-center mb-5 transition-colors">
                <usp.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-gray-900 mb-2">
                {usp.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {usp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
