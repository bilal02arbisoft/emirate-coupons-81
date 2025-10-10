import React, { useState } from 'react';
import { Filter, Grid, List, TrendingUp } from 'lucide-react';
import CouponCard from '../components/CouponCard';
import CouponDetailModal from '../components/CouponDetailModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useHotCoupons } from '../hooks/useAPI';

const DealsPage = () => {
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // API data fetching
  const { data: allCoupons = [], isLoading: couponsLoading, error: couponsError } = useHotCoupons();

  const handleCouponClick = (coupon) => {
    setSelectedCoupon(coupon);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCoupon(null);
  };

  // Filter and sort coupons
  const filteredAndSortedCoupons = React.useMemo(() => {
    let filtered = [...allCoupons];

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(coupon => {
        if (filterType === 'hot') return coupon.deal_type === 'hot';
        if (filterType === 'new') return coupon.deal_type === 'new';
        if (filterType === 'verified') return coupon.verified === true;
        if (filterType === 'expiring') {
          const now = new Date();
          const expiry = new Date(coupon.expiry_date);
          const diffInDays = Math.floor((expiry - now) / (1000 * 60 * 60 * 24));
          return diffInDays <= 7;
        }
        return coupon.discount_type === filterType;
      });
    }

    // Sort coupons
    switch (sortBy) {
      case 'trending':
        filtered.sort((a, b) => b.usage_count - a.usage_count);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount_value - a.discount_value);
        break;
      case 'expiry':
        filtered.sort((a, b) => new Date(a.expiry_date) - new Date(b.expiry_date));
        break;
      case 'newest':
        filtered.sort((a, b) => b.usage_count - a.usage_count); // Using usage_count as proxy for newest
        break;
      case 'rating':
        filtered.sort((a, b) => b.user_rating - a.user_rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [allCoupons, filterType, sortBy]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-12 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <TrendingUp className="w-10 h-10 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">All Deals</h1>
          </div>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Browse through all available coupons and deals from top UAE stores. Find the perfect discount for your next purchase!
          </p>
        </div>
      </section>

      {/* Filters & Controls */}
      <section className="py-6 border-b bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <h2 className="text-2xl font-bold">
              All Coupons ({filteredAndSortedCoupons.length})
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Filter by type */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-input bg-background rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Deals</option>
                <option value="hot">🔥 Hot Deals</option>
                <option value="new">✨ New Deals</option>
                <option value="verified">✓ Verified</option>
                <option value="expiring">⏰ Expiring Soon</option>
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
                <option value="trending">Most Popular</option>
                <option value="discount">Highest Discount</option>
                <option value="expiry">Expiring Soon</option>
                <option value="newest">Newest First</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* View Mode */}
              <div className="flex border border-input rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 text-sm ${
                    viewMode === 'grid' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-background hover:bg-muted'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 text-sm ${
                    viewMode === 'list' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-background hover:bg-muted'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coupons Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {couponsLoading && <LoadingSpinner />}
          {couponsError && <ErrorMessage error={couponsError} />}
          {!couponsLoading && !couponsError && (
            filteredAndSortedCoupons.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🎫</div>
                <h3 className="text-2xl font-bold mb-2">No deals found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filter criteria to see more results
                </p>
                <button
                  onClick={() => {
                    setFilterType('all');
                    setSortBy('trending');
                  }}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-hover transition-colors"
                >
                  Show All Deals
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredAndSortedCoupons.map((coupon) => (
                  <CouponCard 
                    key={coupon.id} 
                    coupon={coupon}
                    compact={viewMode === 'list'}
                    onCouponClick={handleCouponClick}
                  />
                ))}
              </div>
            )
          )}
        </div>
      </section>

      <CouponDetailModal 
        coupon={selectedCoupon}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default DealsPage;