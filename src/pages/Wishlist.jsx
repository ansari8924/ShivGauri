import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import Breadcrumb from '../components/ui/Breadcrumb';
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { useWishlistStore } from '../store/wishlistStore';

export default function Wishlist() {
  const { isLoggedIn } = useAuthStore();
  const wishlistItems = useWishlistStore(s => s.items);
  const clearWishlist = useWishlistStore(s => s.clearWishlist);

  if (!isLoggedIn) {
    return (
      <>
        <Helmet><title>Wishlist | Shiv Gauri Saree</title></Helmet>
        <div className="max-w-7xl mx-auto px-4 py-32 text-center">
          <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Save Your Favorites</h1>
          <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
            Create an account or sign in to save your favorite sarees to your wishlist and easily access them later.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/login"><Button variant="primary" size="lg" className="w-40">Sign In</Button></Link>
            <Link to="/register"><Button variant="outline" size="lg" className="w-40">Register</Button></Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet><title>My Wishlist | Shiv Gauri Saree</title></Helmet>
      
      {/* Decorative Header */}
      <div className="bg-primary/5 py-12 mb-8 border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'My Wishlist' }]} />
          <div className="mt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">My Wishlist</h1>
              <p className="text-gray-600">Curated collection of your favorite items ({wishlistItems.length} saved)</p>
            </div>
            {wishlistItems.length > 0 && (
              <Button onClick={clearWishlist} variant="outline" icon={Trash2} className="text-red-500 hover:bg-red-50 hover:border-red-200">
                Clear Wishlist
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {wishlistItems.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-dashed border-gray-200 rounded-3xl">
            <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">Your Wishlist is Empty</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Explore our latest collection of premium ethnic wear and save your favorites here.
            </p>
            <Link to="/category/sarees">
              <Button variant="primary" size="lg" icon={ShoppingBag}>Start Shopping</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
