import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutGrid } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import Breadcrumb from '../components/ui/Breadcrumb';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { getCategoryBySlug, MOCK_CATEGORIES } from '../data/mockCategories';

const FABRICS = ['Pure Silk', 'Cotton', 'Cotton Silk', 'Georgette', 'Chiffon', 'Velvet', 'Net', 'Crepe Silk', 'Raw Silk'];
const OCCASIONS = ['Wedding', 'Festive', 'Party', 'Casual', 'Daily', 'Custom'];
const PRICE_RANGES = [
  { label: 'Under ₹2,000', min: 0, max: 200000 },
  { label: '₹2,000 - ₹5,000', min: 200000, max: 500000 },
  { label: '₹5,000 - ₹10,000', min: 500000, max: 1000000 },
  { label: '₹10,000 - ₹25,000', min: 1000000, max: 2500000 },
  { label: 'Above ₹25,000', min: 2500000, max: Infinity },
];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'discount', label: 'Highest Discount' },
];

export default function Catalog() {
  const { slug } = useParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [gridCols, setGridCols] = useState(3);

  const category = getCategoryBySlug(slug);
  const categoryName = category?.name || 'All Products';

  const filteredProducts = useMemo(() => {
    let products = [...MOCK_PRODUCTS];

    // Filter by category slug
    if (slug) {
      products = products.filter(p => p.category === slug || p.subcategory === slug);
    }

    // Apply filters
    if (selectedFabrics.length > 0) {
      products = products.filter(p => selectedFabrics.includes(p.fabric));
    }
    if (selectedOccasions.length > 0) {
      products = products.filter(p => selectedOccasions.includes(p.occasion));
    }
    if (selectedPriceRange !== null) {
      const range = PRICE_RANGES[selectedPriceRange];
      products = products.filter(p => p.wholesalePrice >= range.min && p.wholesalePrice < range.max);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.wholesalePrice - b.wholesalePrice);
        break;
      case 'price-high':
        products.sort((a, b) => b.wholesalePrice - a.wholesalePrice);
        break;
      case 'popular':
        products.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'discount':
        products.sort((a, b) => b.discount - a.discount);
        break;
      default:
        products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return products;
  }, [slug, sortBy, selectedFabrics, selectedOccasions, selectedPriceRange]);

  const toggleFilter = (arr, setArr, value) => {
    setArr(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const clearFilters = () => {
    setSelectedFabrics([]);
    setSelectedOccasions([]);
    setSelectedPriceRange(null);
  };

  const activeFilterCount = selectedFabrics.length + selectedOccasions.length + (selectedPriceRange !== null ? 1 : 0);

  const breadcrumbItems = [];
  if (category?.parentCategory) {
    breadcrumbItems.push({ label: category.parentCategory.name, href: `/category/${category.parentCategory.slug}` });
  }
  breadcrumbItems.push({ label: categoryName });

  const FilterSection = ({ title, children }) => {
    const [open, setOpen] = useState(true);
    return (
      <div className="border-b border-gray-100 pb-4 mb-4">
        <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full text-left mb-3">
          <span className="font-medium text-gray-900 text-sm">{title}</span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && children}
      </div>
    );
  };

  const FilterContent = () => (
    <>
      <FilterSection title="Fabric">
        <div className="space-y-2">
          {FABRICS.map(fabric => (
            <label key={fabric} className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-gray-900">
              <input
                type="checkbox"
                checked={selectedFabrics.includes(fabric)}
                onChange={() => toggleFilter(selectedFabrics, setSelectedFabrics, fabric)}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              {fabric}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Occasion">
        <div className="space-y-2">
          {OCCASIONS.map(occasion => (
            <label key={occasion} className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-gray-900">
              <input
                type="checkbox"
                checked={selectedOccasions.includes(occasion)}
                onChange={() => toggleFilter(selectedOccasions, setSelectedOccasions, occasion)}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              {occasion}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="space-y-2">
          {PRICE_RANGES.map((range, i) => (
            <label key={i} className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-gray-900">
              <input
                type="radio"
                name="price"
                checked={selectedPriceRange === i}
                onChange={() => setSelectedPriceRange(selectedPriceRange === i ? null : i)}
                className="w-4 h-4 border-gray-300 text-primary focus:ring-primary"
              />
              {range.label}
            </label>
          ))}
        </div>
      </FilterSection>

      {activeFilterCount > 0 && (
        <button onClick={clearFilters} className="text-primary text-sm font-medium hover:underline">
          Clear All Filters
        </button>
      )}
    </>
  );

  return (
    <>
      <Helmet>
        <title>{categoryName} | Shiv Gauri Saree</title>
        <meta name="description" content={`Shop ${categoryName} at wholesale prices. Shiv Gauri Saree offers authentic Indian ethnic wear.`} />
      </Helmet>

      {/* Category Hero */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="pb-8">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-2">
              {categoryName}
            </h1>
            <p className="text-gray-500 text-sm">
              {category?.description || `Showing ${filteredProducts.length} products`}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <h3 className="font-serif text-lg font-semibold text-gray-900 mb-6">Filters</h3>
              <FilterContent />
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                <span className="text-sm text-gray-500">
                  {filteredProducts.length} products
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Grid Toggle */}
                <div className="hidden sm:flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setGridCols(3)}
                    className={`p-2 ${gridCols === 3 ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-50'}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setGridCols(4)}
                    className={`p-2 ${gridCols === 4 ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-50'}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filter Tags */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedFabrics.map(f => (
                  <span key={f} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/5 text-primary text-xs rounded-full font-medium">
                    {f}
                    <button onClick={() => toggleFilter(selectedFabrics, setSelectedFabrics, f)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {selectedOccasions.map(o => (
                  <span key={o} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/5 text-primary text-xs rounded-full font-medium">
                    {o}
                    <button onClick={() => toggleFilter(selectedOccasions, setSelectedOccasions, o)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {selectedPriceRange !== null && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/5 text-primary text-xs rounded-full font-medium">
                    {PRICE_RANGES[selectedPriceRange].label}
                    <button onClick={() => setSelectedPriceRange(null)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={`grid grid-cols-2 ${gridCols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-4 sm:gap-6`}>
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-serif text-xl font-semibold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or browse a different category.</p>
                <button onClick={clearFilters} className="text-primary font-medium hover:underline">Clear all filters</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setFilterOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 overflow-y-auto shadow-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-lg font-semibold">Filters</h3>
                <button onClick={() => setFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
