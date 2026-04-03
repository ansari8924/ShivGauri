import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <>
      <Helmet><title>404 — Page Not Found | Shiv Gauri Saree</title></Helmet>
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="text-8xl font-serif font-bold text-primary/20 mb-4">404</div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-500 mb-8">
            The page you're looking for doesn't exist or has been moved. Let us help you find what you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button variant="primary" size="lg" icon={Home}>Go Home</Button>
            </Link>
            <Link to="/category/sarees">
              <Button variant="outline" size="lg">Browse Sarees</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
