import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Trash2, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import QuantitySelector from '../components/ui/QuantitySelector';
import Button from '../components/ui/Button';
import Breadcrumb from '../components/ui/Breadcrumb';
import { useCartStore } from '../store/cartStore';
import { formatCurrency } from '../utils/formatCurrency';

export default function Cart() {
  const { items, removeItem, updateQuantity, getCartTotal, clearCart } = useCartStore();
  const total = getCartTotal();
  const shipping = total >= 500000 ? 0 : 9900;
  const grandTotal = total + shipping;

  if (items.length === 0) {
    return (
      <>
        <Helmet><title>Cart | Shiv Gauri Saree</title></Helmet>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-accent" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-800 mb-3">Your Cart is Empty</h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet. Explore our beautiful saree collection!
          </p>
          <Link to="/category/sarees">
            <Button variant="primary" size="lg" icon={ArrowLeft}>Continue Shopping</Button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet><title>{`Cart (${items.length}) | Shiv Gauri Saree`}</title></Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Shopping Cart' }]} />

        <h1 className="text-3xl font-serif font-bold text-primary mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8 pb-16">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div
                key={`${item.sku}-${item.variantId}`}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="flex gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-28 sm:w-32 sm:h-36 object-cover rounded-xl"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm sm:text-base">{item.name}</h3>
                      {item.color && <p className="text-xs text-gray-400 mt-0.5">{item.color}</p>}
                    </div>
                    <button
                      onClick={() => removeItem(item.sku, item.variantId)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-lg font-bold text-primary mt-2">{formatCurrency(item.unitPrice)}</p>
                  <div className="flex items-center justify-between mt-3">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(qty) => updateQuantity(item.sku, item.variantId, qty)}
                      min={1}
                      size="sm"
                    />
                    <p className="text-sm font-semibold text-gray-700">
                      {formatCurrency(item.unitPrice * item.quantity)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="flex justify-between items-center pt-4">
              <Link to="/category/sarees" className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                <ArrowLeft className="w-4 h-4" /> Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-sm text-gray-400 hover:text-red-500 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <h3 className="font-serif text-lg font-semibold text-gray-900 mb-6">Order Summary</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal ({items.length} items)</span>
                  <span className="font-medium">{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-secondary' : ''}`}>
                    {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-accent">Add {formatCurrency(500000 - total)} more for free shipping!</p>
                )}
                <div className="h-px bg-gray-100 my-2" />
                <div className="flex justify-between text-base">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-primary text-xl">{formatCurrency(grandTotal)}</span>
                </div>
                <p className="text-xs text-gray-400">Inclusive of all taxes</p>
              </div>

              <Link to="/checkout" className="block mt-6">
                <Button variant="primary" fullWidth size="lg" iconRight={ArrowRight}>
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
