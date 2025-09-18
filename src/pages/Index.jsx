import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, Zap, ArrowRight } from 'lucide-react';
import HeroCarousel from '../components/HeroCarousel';
import CouponCard from '../components/CouponCard';
import CouponDetailModal from '../components/CouponDetailModal';
import CategoryCard from '../components/CategoryCard';
import StoreCard from '../components/StoreCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { 
  useCoupons, 
  useStores, 
  useCategories, 
  useExpiringCoupons,
  useStoresCount,
  useCouponsCount
} from '../hooks/useAPI';

const Index = () => {
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // API data fetching
  const { data: coupons = [], isLoading: couponsLoading, error: couponsError } = useCoupons();
  const { data: stores = [], isLoading: storesLoading, error: storesError } = useStores();
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useCategories();
  const { data: expiringCoupons = [], isLoading: expiringLoading } = useExpiringCoupons();
  const { data: storesCount } = useStoresCount();
  const { data: couponsCount } = useCouponsCount();

  // Get different types of coupons for homepage sections
  const trendingCoupons = coupons
    .filter(coupon => coupon.usage_count > 1000)
    .sort((a, b) => b.usage_count - a.usage_count)
    .slice(0, 6);
    
  const topStores = stores
    .sort((a, b) => b.total_coupons - a.total_coupons)
    .slice(0, 8);

  const handleCouponClick = (coupon) => {
    setSelectedCoupon(coupon);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCoupon(null);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Save Big with Verified Coupons
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover thousands of exclusive deals and discount codes from top UAE stores. 
            Start saving money on your favorite brands today!
          </p>
        </div>
        <HeroCarousel />
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">{storesCount?.total_stores || stores.length}+</div>
              <div className="text-muted-foreground">Partner Stores</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">{couponsCount?.total_coupons || coupons.length}+</div>
              <div className="text-muted-foreground">Active Coupons</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">2M+</div>
              <div className="text-muted-foreground">Money Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Coupons */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">Trending Deals</h2>
            </div>
            <Link 
              to="/deals" 
              className="flex items-center space-x-2 text-primary hover:text-primary-hover font-medium"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {couponsLoading && <LoadingSpinner />}
          {couponsError && <ErrorMessage error={couponsError} />}
          {trendingCoupons.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingCoupons.map((coupon) => (
                <CouponCard 
                  key={coupon.id} 
                  coupon={coupon} 
                  onCouponClick={handleCouponClick}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Expiring Soon */}
      {expiringCoupons.length > 0 && (
        <section className="py-16 bg-warning-light">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <Clock className="w-8 h-8 text-warning" />
                <div>
                  <h2 className="text-3xl font-bold">Expiring Soon</h2>
                  <p className="text-muted-foreground">Don't miss these limited-time offers!</p>
                </div>
              </div>
            </div>
            
            {expiringLoading && <LoadingSpinner />}
            {!expiringLoading && expiringCoupons.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {expiringCoupons.slice(0, 4).map((coupon) => (
                  <CouponCard 
                    key={coupon.id} 
                    coupon={coupon} 
                    compact 
                    onCouponClick={handleCouponClick}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
              <p className="text-muted-foreground">Find deals in your favorite categories</p>
            </div>
            <Link 
              to="/categories" 
              className="flex items-center space-x-2 text-primary hover:text-primary-hover font-medium"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {categoriesLoading && <LoadingSpinner />}
          {categoriesError && <ErrorMessage error={categoriesError} />}
          {categories.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Top Stores */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Popular Stores</h2>
              <p className="text-muted-foreground">Shop from UAE's most loved brands</p>
            </div>
            <Link 
              to="/stores" 
              className="flex items-center space-x-2 text-primary hover:text-primary-hover font-medium"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {storesLoading && <LoadingSpinner />}
          {storesError && <ErrorMessage error={storesError} />}
          {topStores.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topStores.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div 
            className="max-w-4xl mx-auto text-center rounded-2xl p-8 md:p-12 text-white"
            style={{
              background: 'linear-gradient(135deg, #FF6B35 0%, #8B5CF6 100%)'
            }}
          >
            <Zap className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Never Miss a Deal Again!</h2>
            <p className="text-xl mb-8 text-white/90">
              Get exclusive coupons and early access to sales delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <button className="px-6 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-white/95 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-white/70 mt-4">
              Join 50,000+ smart shoppers. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Coupon Detail Modal */}
      <CouponDetailModal 
        coupon={selectedCoupon}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;