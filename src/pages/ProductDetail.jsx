import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Share2, Star, Truck, Shield, RotateCcw, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import QuantitySelector from '../components/ui/QuantitySelector';
import Breadcrumb from '../components/ui/Breadcrumb';
import ProductCard from '../components/product/ProductCard';
import { getProductBySlug, MOCK_PRODUCTS } from '../data/mockProducts';
import { formatCurrency } from '../utils/formatCurrency';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useUIStore } from '../store/uiStore';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const addItem = useCartStore(s => s.addItem);
  const openCart = useUIStore(s => s.openCart);
  
  const toggleWishlist = useWishlistStore(s => s.toggleWishlist);
  const isWishlisted = useWishlistStore(s => product ? s.isInWishlist(product.id) : false);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(product?.moq || 1);
  const [activeTab, setActiveTab] = useState('description');

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return MOCK_PRODUCTS
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-serif font-bold text-gray-800 mb-4">Product Not Found</h1>
        <p className="text-gray-500 mb-6">The product you're looking for doesn't exist.</p>
        <Link to="/category/sarees" className="text-primary font-medium hover:underline">Browse Products</Link>
      </div>
    );
  }

  const currentVariant = product.variants[selectedVariant];
  const savings = product.mrp - product.wholesalePrice;

  const handleAddToCart = () => {
    addItem({
      sku: product.sku,
      variantId: currentVariant?.id || 'default',
      name: product.name,
      image: product.images[0],
      unitPrice: product.wholesalePrice,
      quantity,
      color: currentVariant?.color,
    });
    openCart();
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'shipping', label: 'Shipping & Returns' },
  ];

  return (
    <>
      <Helmet>
        <title>{product.name} | Shiv Gauri Saree</title>
        <meta name="description" content={product.shortDescription} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: product.category.charAt(0).toUpperCase() + product.category.slice(1), href: `/category/${product.category}` },
          { label: product.name },
        ]} />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 pb-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Image */}
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 mb-4 relative group">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && <Badge variant="new" size="md">New</Badge>}
                {product.isBestseller && <Badge variant="bestseller" size="md">Bestseller</Badge>}
                {product.discount > 0 && <Badge variant="sale" size="md">{product.discount}% Off</Badge>}
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-primary shadow-lg' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:py-4"
          >
            <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">
              SKU: {product.sku} • {product.fabric} • {product.origin}
            </p>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-5 mb-6">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-3xl font-bold text-primary">{formatCurrency(product.wholesalePrice)}</span>
                {product.mrp > product.wholesalePrice && (
                  <span className="text-lg text-gray-400 line-through">{formatCurrency(product.mrp)}</span>
                )}
              </div>
              {savings > 0 && (
                <p className="text-sm text-secondary font-medium">You save {formatCurrency(savings)} ({product.discount}% off)</p>
              )}
              <p className="text-xs text-gray-400 mt-1">Inclusive of GST</p>
            </div>

            {/* Bulk Pricing */}
            {product.bulkPricing.length > 1 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Bulk Pricing</h4>
                <div className="grid grid-cols-3 gap-2">
                  {product.bulkPricing.map((tier, i) => (
                    <div key={i} className={`p-3 rounded-lg text-center border ${quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty) ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                      <div className="text-xs text-gray-500 mb-1">
                        {tier.minQty}{tier.maxQty ? `-${tier.maxQty}` : '+'} pcs
                      </div>
                      <div className="text-sm font-bold text-primary">{formatCurrency(tier.price)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Color Variants */}
            {product.variants.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Color: <span className="text-gray-500 font-normal">{currentVariant.color}</span>
                </h4>
                <div className="flex gap-3">
                  {product.variants.map((variant, i) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(i)}
                      className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedVariant === i ? 'border-primary scale-110 shadow-lg' : 'border-gray-200 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: variant.colorHex }}
                      title={variant.color}
                    >
                      {selectedVariant === i && (
                        <div className="w-3 h-3 rounded-full bg-white shadow border border-gray-200" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Quantity {product.moq > 1 && <span className="text-gray-400 font-normal">(MOQ: {product.moq})</span>}
              </h4>
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                min={product.moq}
                max={currentVariant.stock}
              />
              <p className="text-xs text-gray-400 mt-2">{currentVariant.stock} available</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <Button
                variant="primary"
                size="lg"
                icon={ShoppingBag}
                className="flex-1"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all ${
                  isWishlisted ? 'border-red-500 bg-red-50 text-red-500' : 'border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              <button className="w-12 h-12 rounded-lg border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'On orders above ₹5,000' },
                { icon: Shield, label: 'Quality Assured', sub: '100% genuine products' },
                { icon: RotateCcw, label: 'Easy Returns', sub: '7-day return policy' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-xl">
                  <Icon className="w-5 h-5 text-primary mb-1.5" />
                  <span className="text-xs font-medium text-gray-900">{label}</span>
                  <span className="text-[10px] text-gray-400">{sub}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-100 pt-8 pb-16">
          <div className="flex gap-0 border-b border-gray-200 mb-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="max-w-3xl">
            {activeTab === 'description' && (
              <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
                <p>{product.description}</p>
              </div>
            )}
            {activeTab === 'specifications' && (
              <div className="space-y-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex items-start py-3 border-b border-gray-100">
                    <span className="w-40 text-sm font-medium text-gray-500 shrink-0">{key}</span>
                    <span className="text-sm text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'shipping' && (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Shipping</h4>
                  <p>Free shipping on orders above ₹5,000. Standard delivery takes 3-5 business days across India. Express delivery available at extra cost.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Returns & Exchange</h4>
                  <p>We offer 7-day hassle-free returns for unused items in original packaging. Exchange available for different colors/sizes within 14 days.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">GST Invoice</h4>
                  <p>GST invoice provided on all orders. Tax-compliant billing for wholesale and retail purchasers.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-100 pt-12 pb-16">
            <h2 className="text-2xl font-serif font-bold text-primary mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
