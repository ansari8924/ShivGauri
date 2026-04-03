import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Globe, MessageCircle, Share2, Video } from 'lucide-react';
import { MOCK_CATEGORIES } from '../../data/mockCategories';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-white font-serif text-2xl sm:text-3xl font-bold mb-2">
                Stay in Style
              </h3>
              <p className="text-white/80 text-sm sm:text-base">
                Subscribe for exclusive wholesale deals, new arrivals & festive offers.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full md:w-auto max-w-md"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-0 px-5 py-3 rounded-l-xl text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold text-sm rounded-r-xl transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <span className="text-white font-serif text-2xl font-bold">शिव गौरी</span>
              <p className="text-accent text-xs tracking-[0.2em] uppercase mt-1">Saree Collection</p>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Premium wholesale saree destination since 1995. We bring you the finest handwoven and designer sarees from across India at the best wholesale prices.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                <span>Varanasi, Uttar Pradesh, India</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href="mailto:info@shivgauri.com" className="hover:text-white transition-colors">info@shivgauri.com</a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-base mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Contact Us', 'Track Order', 'Bulk Order Inquiry', 'Size Guide', 'Care Instructions'].map((link) => (
                <li key={link}>
                  <Link
                    to="#"
                    className="text-sm text-gray-400 hover:text-accent hover:pl-1 transition-all duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold text-base mb-5">Categories</h4>
            <ul className="space-y-3">
              {MOCK_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="text-sm text-gray-400 hover:text-accent hover:pl-1 transition-all duration-200"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/category/sarees" className="text-sm text-gray-400 hover:text-accent hover:pl-1 transition-all duration-200">
                  Wedding Collection
                </Link>
              </li>
              <li>
                <Link to="/category/sarees" className="text-sm text-gray-400 hover:text-accent hover:pl-1 transition-all duration-200">
                  Festive Special
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold text-base mb-5">Customer Service</h4>
            <ul className="space-y-3">
              {['Shipping Policy', 'Return & Exchange', 'Privacy Policy', 'Terms & Conditions', 'FAQ', 'GST Information'].map((link) => (
                <li key={link}>
                  <Link
                    to="#"
                    className="text-sm text-gray-400 hover:text-accent hover:pl-1 transition-all duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>© {currentYear} Shiv Gauri Saree. All rights reserved.</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">GSTIN: 09ABCDE1234F1ZH</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Globe, href: '#', label: 'Facebook' },
                { icon: MessageCircle, href: '#', label: 'Instagram' },
                { icon: Share2, href: '#', label: 'Twitter' },
                { icon: Video, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
