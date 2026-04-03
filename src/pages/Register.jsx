import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, Building2, Eye, EyeOff } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../services/firebase';
import Button from '../components/ui/Button';
import Logo from '../components/ui/Logo';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', businessName: '', password: '', confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const cred = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(cred.user, { displayName: formData.name });
      navigate('/account');
    } catch (err) {
      setError(err.code === 'auth/email-already-in-use' ? 'Email already registered' : 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'name', label: 'Full Name', icon: User, type: 'text', placeholder: 'Your full name', required: true },
    { name: 'email', label: 'Email', icon: Mail, type: 'email', placeholder: 'you@example.com', required: true },
    { name: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', placeholder: '+91 XXXXX XXXXX', required: true },
    { name: 'businessName', label: 'Business Name (Optional)', icon: Building2, type: 'text', placeholder: 'Your store or business name', required: false },
  ];

  return (
    <>
      <Helmet><title>Create Account | Shiv Gauri Saree</title></Helmet>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="grid lg:grid-cols-2 max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl shadow-black/5">
          {/* Decorative Side */}
          <div className="hidden lg:flex relative bg-gradient-to-br from-secondary to-secondary-dark p-12 flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
            <div className="relative z-10 -ml-2">
              <Logo variant="light" />
            </div>
            <div className="relative z-10">
              <h2 className="text-white font-serif text-3xl font-bold leading-tight mb-4">
                Join India's Largest<br />Wholesale Saree Network
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Get access to exclusive wholesale pricing, bulk discounts, and our curated collection of 5000+ products.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 sm:p-12"
          >
            <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-500 text-sm mb-8">Join us for the best wholesale deals</p>

            {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map(({ name, label, icon: Icon, type, placeholder, required }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <div className="relative">
                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      name={name}
                      type={type}
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      placeholder={placeholder}
                      required={required}
                    />
                  </div>
                </div>
              ))}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-11 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      placeholder="Min 6 characters"
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      placeholder="Re-enter password"
                      required
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" variant="primary" fullWidth size="lg" loading={loading}>
                Create Account
              </Button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">Sign In</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
