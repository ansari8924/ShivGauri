import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, ChevronDown, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { MOCK_CATEGORIES } from '../../data/mockCategories';
import Logo from '../ui/Logo';

const ANNOUNCEMENTS = [
  '🎉 Free Shipping on Orders Above ₹5,000',
  '🔥 New Arrivals: Wedding Collection 2026',
  '💎 Wholesale Prices Starting ₹999',
  '✨ GST Invoice Available on All Orders',
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const getItemCount = useCartStore(s => s.getItemCount);
  const openCart = useUIStore(s => s.openCart);
  const isLoggedIn = useAuthStore(s => s.isLoggedIn);
  const getWishlistCount = useWishlistStore(s => s.getWishlistCount);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex(i => (i + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const cartCount = getItemCount();

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary text-white text-center text-xs sm:text-sm py-2 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={announcementIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="font-medium tracking-wide"
          >
            {ANNOUNCEMENTS[announcementIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5'
          : 'bg-white'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Logo className="shrink-0" />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                to="/"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-lg hover:bg-primary/5 transition-all"
              >
                Home
              </Link>
              {MOCK_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(cat.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={`/category/${cat.slug}`}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-lg hover:bg-primary/5 transition-all"
                  >
                    {cat.name}
                    {cat.subcategories.length > 0 && <ChevronDown className="w-3.5 h-3.5" />}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {activeDropdown === cat.id && cat.subcategories.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl shadow-black/10 border border-gray-100 overflow-hidden"
                      >
                        <div className="p-2">
                          <Link
                            to={`/category/${cat.slug}`}
                            className="block px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 rounded-lg transition-colors"
                          >
                            All {cat.name}
                          </Link>
                          <div className="h-px bg-gray-100 my-1" />
                          {cat.subcategories.map((sub) => (
                            <Link
                              key={sub.id}
                              to={`/category/${sub.slug}`}
                              className="block px-4 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                            >
                              {sub.name}
                              <span className="text-gray-400 text-xs ml-2">({sub.count})</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-gray-700" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="hidden sm:flex p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 text-gray-700" />
                {getWishlistCount() > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white">
                    {getWishlistCount()}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={openCart}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5 text-gray-700" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {cartCount > 99 ? '99+' : cartCount}
                  </motion.span>
                )}
              </button>

              {/* User */}
              <Link
                to={isLoggedIn ? '/account' : '/login'}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5 text-gray-700" />
              </Link>
            </div>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-100 overflow-hidden"
            >
              <div className="max-w-2xl mx-auto px-4 py-4">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search sarees, lehengas, fabrics..."
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-lg"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 overflow-y-auto shadow-2xl"
            >
              <div className="p-6">
                {/* Mobile Logo */}
                <div className="flex items-center justify-between mb-8">
                  <Logo onClick={() => setMobileMenuOpen(false)} />
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Nav Links */}
                <nav className="space-y-1">
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-base font-medium text-gray-800 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors"
                  >
                    Home
                  </Link>
                  {MOCK_CATEGORIES.map((cat) => (
                    <div key={cat.id}>
                      <Link
                        to={`/category/${cat.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-3 text-base font-medium text-gray-800 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors"
                      >
                        {cat.name}
                      </Link>
                      {cat.subcategories.length > 0 && (
                        <div className="ml-4 space-y-0.5">
                          {cat.subcategories.map((sub) => (
                            <Link
                              key={sub.id}
                              to={`/category/${sub.slug}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block px-4 py-2 text-sm text-gray-500 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>

                <div className="h-px bg-gray-200 my-6" />

                {/* Mobile Quick Links */}
                <nav className="space-y-1">
                  <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-primary/5 rounded-lg">
                    <Heart className="w-5 h-5" /> Wishlist
                  </Link>
                  <Link to={isLoggedIn ? '/account' : '/login'} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-primary/5 rounded-lg">
                    <User className="w-5 h-5" /> {isLoggedIn ? 'My Account' : 'Login / Register'}
                  </Link>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
