import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  ExternalLink, 
  Filter, 
  Grid, 
  List, 
  ArrowLeft,
  Clock,
  Tag,
  CheckCircle,
  Globe,
  Instagram,
  Twitter
} from 'lucide-react';
import CouponCard from '../components/CouponCard';
import CouponDetailModal from '../components/CouponDetailModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useStore, useCouponsByStore } from '../hooks/useAPI';

const StorePage = () => {
  const { storeId } = useParams();
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCouponClick = (coupon) => { setSelectedCoupon(coupon); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setSelectedCoupon(null); };

  // API data fetching
  const { data: store, isLoading: storeLoading, error: storeError } = useStore(storeId);
  const { data: allCoupons = [], isLoading: couponsLoading, error: couponsError, refetch: refetchCoupons } = useCouponsByStore(storeId);

  // Scroll to top when component mounts or store changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [storeId]);

  const filteredAndSortedCoupons = useMemo(() => {
    let filtered = allCoupons;

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(coupon => coupon.discount_type === filterType);
    }

    // Sort coupons
    switch (sortBy) {
      case 'newest':
        // Mock newest by usage count (in real app, would use creation date)
        filtered.sort((a, b) => b.usage_count - a.usage_count);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount_value - a.discount_value);
        break;
      case 'expiry':
        filtered.sort((a, b) => new Date(a.expiry_date) - new Date(b.expiry_date));
        break;
      case 'popular':
        filtered.sort((a, b) => b.usage_count - a.usage_count);
        break;
      default:
        break;
    }

    return filtered;
  }, [allCoupons, filterType, sortBy]);

  if (storeLoading) {
    return <LoadingSpinner className="min-h-screen" />;
  }

  if (storeError || !store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Store not found</h1>
          <Link 
            to="/stores" 
            className="text-primary hover:text-primary-hover"
          >
            ← Back to stores
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/stores" className="hover:text-foreground">Stores</Link>
          <span>/</span>
          <span className="text-foreground">{store.name}</span>
        </nav>
      </div>

      {/* Store Header */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Store Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <img 
                  src={store.logo} 
                  alt={store.name}
                  className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(store.name)}&background=f1f5f9&color=64748b`;
                  }}
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{store.name}</h1>
                  <p className="text-muted-foreground mb-4">{store.description}</p>
                  
                  {/* Stats */}
                  <div className="flex flex-wrap gap-6 text-sm mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{store.rating}</span>
                      <span className="text-muted-foreground">rating</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Tag className="w-4 h-4 text-primary" />
                      <span className="font-medium">{store.total_coupons}</span>
                      <span className="text-muted-foreground">active coupons</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="font-medium">Verified</span>
                      <span className="text-muted-foreground">partner</span>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {store.categories.map((category) => (
                      <span 
                        key={category}
                        className="px-3 py-1 bg-primary-light text-primary text-sm rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center space-x-4">
                    <a 
                      href={store.website_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-primary hover:text-primary-hover"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Website</span>
                    </a>
                    {store.social_links?.instagram && (
                      <a 
                        href="#" 
                        className="flex items-center space-x-1 text-primary hover:text-primary-hover"
                      >
                        <Instagram className="w-4 h-4" />
                        <span>Instagram</span>
                      </a>
                    )}
                    {store.social_links?.twitter && (
                      <a 
                        href="#" 
                        className="flex items-center space-x-1 text-primary hover:text-primary-hover"
                      >
                        <Twitter className="w-4 h-4" />
                        <span>Twitter</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="w-full lg:w-auto">
              <a
                href={store.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full lg:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary-hover transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Visit Store
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Store Details */}
      <section className="py-6 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="font-semibold mb-1">Established</h3>
              <p className="text-muted-foreground">{store.established_year}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Return Policy</h3>
              <p className="text-muted-foreground">{store.return_policy}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Shipping</h3>
              <p className="text-muted-foreground">{store.shipping_info}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Controls */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <h2 className="text-2xl font-bold">Available Coupons ({filteredAndSortedCoupons.length})</h2>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Filter by type */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-input bg-background rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Types</option>
                <option value="percentage">Percentage Off</option>
                <option value="fixed">Fixed Amount</option>
                <option value="free_shipping">Free Shipping</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-input bg-background rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="newest">Newest First</option>
                <option value="discount">Highest Discount</option>
                <option value="expiry">Expiring Soon</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Coupons Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {couponsLoading && <LoadingSpinner />}
          {couponsError && <ErrorMessage error={couponsError} onRetry={refetchCoupons} />}
          {!couponsLoading && !couponsError && (
            filteredAndSortedCoupons.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🎫</div>
                <h3 className="text-2xl font-bold mb-2">No coupons found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filter criteria or check back later for new deals
                </p>
                <button
                  onClick={() => setFilterType('all')}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-hover transition-colors"
                >
                  Show All Coupons
                </button>
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1">
                {filteredAndSortedCoupons.map((coupon) => (
                  <CouponCard
                    key={coupon.id}
                    coupon={coupon}
                    compact={true}
                    onCouponClick={handleCouponClick}
                  />
                ))}
              </div>
            )
          )}
        </div>
      </section>
      <CouponDetailModal coupon={selectedCoupon} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default StorePage;
