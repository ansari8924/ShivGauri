import { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search as SearchIcon } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import Breadcrumb from '../components/ui/Breadcrumb';
import { searchProducts } from '../data/mockProducts';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchProducts(query);
  }, [query]);

  return (
    <>
      <Helmet><title>{query ? `Search: ${query}` : 'Search'} | Shiv Gauri Saree</title></Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: `Search: "${query}"` }]} />

        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">
            {query ? `Results for "${query}"` : 'Search'}
          </h1>
          <p className="text-gray-500 text-sm">
            {results.length} {results.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-16">
            {results.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <SearchIcon className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="font-serif text-xl font-semibold text-gray-800 mb-2">
              {query ? 'No products found' : 'Start searching'}
            </h2>
            <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
              {query
                ? `We couldn't find any products matching "${query}". Try different keywords.`
                : 'Use the search bar to find sarees, lehengas, and more.'
              }
            </p>
            <Link to="/category/sarees" className="text-primary font-medium hover:underline">Browse all products</Link>
          </div>
        )}
      </div>
    </>
  );
}
