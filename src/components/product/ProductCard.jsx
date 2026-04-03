import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import Badge from '../ui/Badge';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useUIStore } from '../../store/uiStore';

export default function ProductCard({ product, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const addItem = useCartStore(s => s.addItem);
  const openCart = useUIStore(s => s.openCart);
  const toggleWishlist = useWishlistStore(s => s.toggleWishlist);
  const isWishlisted = useWishlistStore(s => s.isInWishlist(product.id));

  const savePercent = product.discount;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      sku: product.sku,
      variantId: product.variants?.[0]?.id || 'default',
      name: product.name,
      image: product.images[0],
      unitPrice: product.wholesalePrice,
      quantity: product.moq || 1,
      color: product.color,
    });
    openCart();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/product/${product.slug}`}
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Hover second image */}
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={product.name}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && <Badge variant="new">New</Badge>}
            {product.isBestseller && <Badge variant="bestseller">Bestseller</Badge>}
            {savePercent > 0 && <Badge variant="sale">{savePercent}% Off</Badge>}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
              isWishlisted
                ? 'bg-red-500 text-white'
                : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          {/* Quick Actions Overlay */}
          <motion.div
            initial={false}
            animate={{ y: isHovered ? 0 : 80, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 p-3 flex gap-2 z-10"
          >
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-xl hover:bg-white transition-colors"
            >
              <Eye className="w-4 h-4 text-gray-700" />
            </button>
          </motion.div>

          {/* Stock Status — hides on hover when Add to Cart appears */}
          {product.stock < 10 && product.stock > 0 && (
            <motion.div
              initial={false}
              animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? 10 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-3 left-3 right-3 z-0"
            >
              <div className="bg-orange-500/90 backdrop-blur-sm text-white text-xs font-medium py-1.5 px-3 rounded-lg text-center">
                Only {product.stock} left!
              </div>
            </motion.div>
          )}
        </div>

        {/* Product Info */}
        <div className="px-1">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            {product.fabric} • {product.origin}
          </p>
          <h3 className="font-medium text-gray-900 text-sm sm:text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Color Variants */}
          {product.variants?.length > 1 && (
            <div className="flex items-center gap-1.5 mb-2">
              {product.variants.slice(0, 4).map((v) => (
                <div
                  key={v.id}
                  className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: v.colorHex }}
                  title={v.color}
                />
              ))}
              {product.variants.length > 4 && (
                <span className="text-xs text-gray-400">+{product.variants.length - 4}</span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">
              {formatCurrency(product.wholesalePrice)}
            </span>
            {product.mrp > product.wholesalePrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatCurrency(product.mrp)}
              </span>
            )}
          </div>

          {/* MOQ */}
          {product.moq > 1 && (
            <p className="text-xs text-gray-400 mt-1">MOQ: {product.moq} pcs</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
