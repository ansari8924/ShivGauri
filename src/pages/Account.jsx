import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { User, Package, MapPin, Heart, LogOut, ChevronRight, ShoppingBag, Settings } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuthStore } from '../store/authStore';
import Button from '../components/ui/Button';

const menuItems = [
  { icon: Package, label: 'My Orders', description: 'Track and manage your orders', badge: '3' },
  { icon: Heart, label: 'Wishlist', description: 'Your saved products', badge: '12' },
  { icon: MapPin, label: 'Addresses', description: 'Manage shipping addresses' },
  { icon: Settings, label: 'Profile Settings', description: 'Update your account details' },
];

export default function Account() {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuthStore();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  if (!isLoggedIn) {
    return (
      <>
        <Helmet><title>Account | Shiv Gauri Saree</title></Helmet>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-gray-800 mb-3">Sign in to your Account</h1>
          <p className="text-gray-500 text-sm mb-8">Access your orders, wishlist, and more.</p>
          <div className="flex gap-3 justify-center">
            <Link to="/login"><Button variant="primary" size="lg">Sign In</Button></Link>
            <Link to="/register"><Button variant="outline" size="lg">Create Account</Button></Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet><title>My Account | Shiv Gauri Saree</title></Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-6 sm:p-8 text-white mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-serif font-bold">
              {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold">
                {user?.displayName || 'Welcome!'}
              </h1>
              <p className="text-white/70 text-sm">{user?.email}</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { value: '3', label: 'Orders', icon: Package },
            { value: '12', label: 'Wishlist', icon: Heart },
            { value: '2', label: 'Addresses', icon: MapPin },
          ].map(({ value, label, icon: Icon }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">{value}</div>
              <div className="text-xs text-gray-500">{label}</div>
            </div>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-3 mb-8">
          {menuItems.map((item) => (
            <motion.button
              key={item.label}
              whileHover={{ x: 4 }}
              className="w-full flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 text-sm">{item.label}</span>
                  {item.badge && (
                    <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </motion.button>
          ))}
        </div>

        {/* Logout */}
        <Button variant="ghost" className="text-red-500 hover:bg-red-50" icon={LogOut} onClick={handleLogout}>
          Sign Out
        </Button>
      </div>
    </>
  );
}
