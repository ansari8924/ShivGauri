import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';
import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../ui/Button';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();
  const { cartOpen, closeCart } = useUIStore();

  const total = getCartTotal();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-serif text-lg font-semibold text-gray-900">
                  Shopping Cart
                </h2>
                <span className="text-sm text-gray-400">({items.length})</span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                    <ShoppingBag className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-gray-800 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Explore our beautiful collection of sarees and start shopping!
                  </p>
                  <Button variant="primary" onClick={closeCart}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.sku}-${item.variantId}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4 p-3 bg-gray-50 rounded-xl"
                    >
                      {/* Product Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-24 object-cover rounded-lg"
                      />

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                        {item.color && (
                          <p className="text-xs text-gray-500 mt-0.5">{item.color}</p>
                        )}
                        <p className="text-sm font-bold text-primary mt-1">
                          {formatCurrency(item.unitPrice)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.sku, item.variantId, Math.max(1, item.quantity - 1))}
                              className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.sku, item.variantId, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.sku, item.variantId)}
                            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="text-xl font-bold text-primary">{formatCurrency(total)}</span>
                </div>
                <p className="text-xs text-gray-400">Shipping & taxes calculated at checkout</p>

                <Link to="/cart" onClick={closeCart}>
                  <Button variant="outline" fullWidth className="mb-2">
                    View Cart
                  </Button>
                </Link>
                <Link to="/checkout" onClick={closeCart}>
                  <Button variant="primary" fullWidth iconRight={ArrowRight}>
                    Checkout
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
