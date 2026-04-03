import { Helmet } from 'react-helmet-async';
import HeroBanner from '../components/home/HeroBanner';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import NewArrivals from '../components/home/NewArrivals';
import FestiveCollection from '../components/home/FestiveCollection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import TestimonialsCarousel from '../components/home/TestimonialsCarousel';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Shiv Gauri Saree | Premium Wholesale Sarees & Ethnic Wear</title>
        <meta name="description" content="India's finest wholesale saree collection. Shop Banarasi silk, Kanjivaram, cotton, georgette sarees, lehengas & kurtis at best wholesale prices." />
      </Helmet>

      <HeroBanner />
      <CategoryGrid />
      <FeaturedProducts />
      <FestiveCollection />
      <NewArrivals />
      <WhyChooseUs />
      <TestimonialsCarousel />
    </>
  );
}
