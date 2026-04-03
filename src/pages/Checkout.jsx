import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, CreditCard, CheckCircle, ArrowRight, ArrowLeft, Shield } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCartStore } from '../store/cartStore';
import { formatCurrency } from '../utils/formatCurrency';

const STEPS = [
  { id: 'shipping', label: 'Shipping', icon: MapPin },
  { id: 'review', label: 'Review', icon: CreditCard },
  { id: 'confirm', label: 'Confirm', icon: CheckCircle },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '',
    address: '', city: '', state: '', pincode: '',
    notes: '',
  });

  const total = getCartTotal();
  const shipping = total >= 500000 ? 0 : 9900;
  const grandTotal = total + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    clearCart();
    navigate('/checkout/success');
  };

  if (items.length === 0 && currentStep < 2) {
    return (
      <>
        <Helmet><title>Checkout | Shiv Gauri Saree</title></Helmet>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">Your cart is empty</h1>
          <Link to="/category/sarees" className="text-primary font-medium hover:underline">Continue Shopping</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet><title>Checkout | Shiv Gauri Saree</title></Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Steps */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {STEPS.map((step, i) => (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  i <= currentStep ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  {i < currentStep ? <CheckCircle className="w-5 h-5" /> : <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />}
                </div>
                <span className={`hidden sm:block text-sm font-medium ${i <= currentStep ? 'text-primary' : 'text-gray-400'}`}>
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-12 sm:w-20 h-0.5 mx-2 sm:mx-4 ${i < currentStep ? 'bg-primary' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form Area */}
          <div className="lg:col-span-3">
            {currentStep === 0 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="Enter full name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                      <input name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="+91 XXXXX XXXXX" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" placeholder="Street address, building, flat number" />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                      <input name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="City" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                      <input name="state" value={formData.state} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="State" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                      <input name="pincode" value={formData.pincode} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="XXXXXX" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order Notes (Optional)</label>
                    <textarea name="notes" value={formData.notes} onChange={handleChange} rows={2} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" placeholder="Any special instructions..." />
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                  <Link to="/cart">
                    <Button variant="ghost" icon={ArrowLeft}>Back to Cart</Button>
                  </Link>
                  <Button variant="primary" iconRight={ArrowRight} onClick={() => setCurrentStep(1)}>
                    Continue to Review
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">Review Order</h2>

                {/* Shipping Info */}
                <div className="bg-gray-50 rounded-xl p-5 mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Shipping To</h4>
                  <p className="text-sm text-gray-600">{formData.fullName}</p>
                  <p className="text-sm text-gray-600">{formData.address}</p>
                  <p className="text-sm text-gray-600">{formData.city}, {formData.state} - {formData.pincode}</p>
                  <p className="text-sm text-gray-600">{formData.phone}</p>
                </div>

                {/* Order Items */}
                <div className="space-y-3 mb-8">
                  {items.map(item => (
                    <div key={`${item.sku}-${item.variantId}`} className="flex gap-3 p-3 bg-white border border-gray-100 rounded-xl">
                      <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity} {item.color && `• ${item.color}`}</p>
                        <p className="text-sm font-bold text-primary mt-1">{formatCurrency(item.unitPrice * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between">
                  <Button variant="ghost" icon={ArrowLeft} onClick={() => setCurrentStep(0)}>Back</Button>
                  <Button variant="primary" size="lg" onClick={handlePlaceOrder} icon={Shield}>
                    Place Order — {formatCurrency(grandTotal)}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
              <h3 className="font-serif text-base font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-secondary' : ''}`}>
                    {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                  </span>
                </div>
                <div className="h-px bg-gray-200" />
                <div className="flex justify-between text-base">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-primary">{formatCurrency(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
