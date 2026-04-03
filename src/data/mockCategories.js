export const MOCK_CATEGORIES = [
  {
    id: 'sarees',
    name: 'Sarees',
    slug: 'sarees',
    description: 'Discover our exquisite collection of handwoven and designer sarees from across India.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
    productCount: 156,
    subcategories: [
      { id: 'silk-sarees', name: 'Silk Sarees', slug: 'silk-sarees', count: 42, image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80' },
      { id: 'cotton-sarees', name: 'Cotton Sarees', slug: 'cotton-sarees', count: 38, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80' },
      { id: 'georgette-sarees', name: 'Georgette Sarees', slug: 'georgette-sarees', count: 45, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80' },
      { id: 'chiffon-sarees', name: 'Chiffon Sarees', slug: 'chiffon-sarees', count: 31, image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80' },
    ],
  },
  {
    id: 'lehengas',
    name: 'Lehengas',
    slug: 'lehengas',
    description: 'Stunning bridal and party wear lehengas crafted with exquisite detailing.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80',
    productCount: 48,
    subcategories: [
      { id: 'bridal-lehengas', name: 'Bridal Lehengas', slug: 'bridal-lehengas', count: 22, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80' },
      { id: 'party-lehengas', name: 'Party Wear', slug: 'party-lehengas', count: 26, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80' },
    ],
  },
  {
    id: 'kurtis',
    name: 'Kurtis',
    slug: 'kurtis',
    description: 'Elegant and comfortable kurtis for everyday and festive wear.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    productCount: 72,
    subcategories: [],
  },
  {
    id: 'fabrics',
    name: 'Fabrics',
    slug: 'fabrics',
    description: 'Premium quality fabrics for custom tailoring. Sold by the meter.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
    productCount: 35,
    subcategories: [],
  },
];

export const MOCK_BANNERS = [
  {
    id: 1,
    title: 'New Wedding Collection',
    subtitle: 'Handwoven Silk Sarees',
    description: 'Discover our latest wedding collection featuring exquisite Banarasi and Kanjivaram silk sarees.',
    cta: 'Shop Now',
    ctaLink: '/category/silk-sarees',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&q=80',
    gradient: 'from-primary/80 to-primary-dark/90',
  },
  {
    id: 2,
    title: 'Festive Special',
    subtitle: 'Up to 50% Off',
    description: 'Celebrate the season with our premium collection of designer sarees and lehengas.',
    cta: 'Explore Collection',
    ctaLink: '/category/sarees',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200&q=80',
    gradient: 'from-secondary/80 to-secondary-dark/90',
  },
  {
    id: 3,
    title: 'Wholesale Deals',
    subtitle: 'Bulk Orders Welcome',
    description: 'Best wholesale prices. Minimum order quantities start from just 1 piece for premium items.',
    cta: 'View Catalog',
    ctaLink: '/category/sarees',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&q=80',
    gradient: 'from-accent-dark/80 to-primary/90',
  },
];

export const MOCK_TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Delhi',
    rating: 5,
    comment: 'Exceptional quality Banarasi sarees! The zari work is exquisite and the colors are vibrant. My customers absolutely love them.',
    avatar: 'PS',
    role: 'Boutique Owner',
  },
  {
    id: 2,
    name: 'Rajesh Patel',
    location: 'Ahmedabad',
    rating: 5,
    comment: 'Best wholesale prices I\'ve found anywhere. The Patola and Bandhani collection is outstanding. Quick delivery too!',
    avatar: 'RP',
    role: 'Textile Retailer',
  },
  {
    id: 3,
    name: 'Anita Krishnan',
    location: 'Chennai',
    rating: 4,
    comment: 'The Kanjivaram sarees are authentic and beautifully crafted. Great communication and professional packaging.',
    avatar: 'AK',
    role: 'Saree Showroom',
  },
  {
    id: 4,
    name: 'Mohammed Irfan',
    location: 'Hyderabad',
    rating: 5,
    comment: 'We\'ve been sourcing georgette and chiffon sarees for 2 years now. Consistent quality and excellent bulk pricing.',
    avatar: 'MI',
    role: 'Wholesale Dealer',
  },
  {
    id: 5,
    name: 'Kavita Desai',
    location: 'Mumbai',
    rating: 5,
    comment: 'The lehenga collection is breathtaking. My bridal clients are always impressed with the craftsmanship. Highly recommended!',
    avatar: 'KD',
    role: 'Bridal Store',
  },
];

export const getCategoryBySlug = (slug) => {
  for (const cat of MOCK_CATEGORIES) {
    if (cat.slug === slug) return cat;
    const sub = cat.subcategories.find(s => s.slug === slug);
    if (sub) return { ...sub, parentCategory: cat };
  }
  return null;
};
