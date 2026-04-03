import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

export default function OrderConfirmation() {
  const orderNumber = `SGS-${Date.now().toString().slice(-8)}`;

  return (
    <>
      <Helmet><title>Order Confirmed | Shiv Gauri Saree</title></Helmet>
      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle className="w-14 h-14 text-secondary" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
            Order Confirmed! 🎉
          </h1>
          <p className="text-gray-500 text-lg mb-2">Thank you for your order!</p>
          <p className="text-gray-400 text-sm mb-8">
            Order #{orderNumber} has been placed successfully.
          </p>

          <div className="bg-surface rounded-2xl p-6 sm:p-8 mb-8 text-left space-y-4">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-900">Estimated Delivery</p>
                <p className="text-sm text-gray-500">3-5 business days</p>
              </div>
            </div>
            <div className="h-px bg-gray-200" />
            <p className="text-sm text-gray-500">
              We'll send you a confirmation email with order details and tracking information once your order ships.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button variant="primary" size="lg" iconRight={ArrowRight}>Continue Shopping</Button>
            </Link>
            <Link to="/account/orders">
              <Button variant="outline" size="lg">View Orders</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
