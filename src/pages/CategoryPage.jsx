import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, Grid, List, ArrowLeft } from 'lucide-react';
import CouponCard from '../components/CouponCard';
import StoreCard from '../components/StoreCard';
import CouponDetailModal from '../components/CouponDetailModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useCategory, useStores, useCouponsByCategory } from '../hooks/useAPI';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [activeTab, setActiveTab] = useState('coupons');
  const [sortBy, setSortBy] = useState('newest');
  const [filterStore, setFilterStore] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCouponClick = (coupon) => { setSelectedCoupon(coupon); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setSelectedCoupon(null); };

  // API data fetching
  const { data: category, isLoading: categoryLoading, error: categoryError } = useCategory(categoryId);
  const { data: stores = [], isLoading: storesLoading } = useStores();
  const { data: categoryCoupons = [], isLoading: couponsLoading, error: couponsError, refetch: refetchCoupons } = useCouponsByCategory(categoryId);

  // Scroll to top when component mounts or category changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  // Filter stores by category
  const categoryStores = useMemo(() => {
    if (!category) return [];
    return stores.filter(store => 
      store.categories.some(cat => 
        cat.toLowerCase().includes(category.name.toLowerCase()) || 
        cat === category.id
      )
    );
  }, [stores, category]);

  const filteredAndSortedCoupons = useMemo(() => {
    let filtered = categoryCoupons;

    // Filter by store
    if (filterStore !== 'all') {
      filtered = filtered.filter(coupon => coupon.store_id === filterStore);
    }

    // Sort coupons
    switch (sortBy) {
      case 'newest':
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
  }, [categoryCoupons, filterStore, sortBy]);

  if (categoryLoading) {
    return <LoadingSpinner className="min-h-screen" />;
  }

  if (categoryError || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <Link 
            to="/categories" 
            className="text-primary hover:text-primary-hover"
          >
            ← Back to categories
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
          <Link to="/categories" className="hover:text-foreground">Categories</Link>
          <span>/</span>
          <span className="text-foreground">{category.name}</span>
        </nav>
      </div>

      {/* Category Header */}
      <section className="py-12 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <img 
              src={category.icon} 
              alt={category.name}
              className="w-16 h-16 md:w-20 md:h-20 mx-auto object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {category.name}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            {category.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-white">{categoryStores.length}</div>
              <div className="text-white/80 text-sm md:text-base">Partner Stores</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-white">{categoryCoupons.length}</div>
              <div className="text-white/80 text-sm md:text-base">Active Coupons</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-white">
                {categoryCoupons.length > 0 ? Math.round(categoryCoupons.reduce((acc, coupon) => acc + coupon.discount_value, 0) / categoryCoupons.length) : 0}%
              </div>
              <div className="text-white/80 text-sm md:text-base">Avg. Savings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('coupons')}
              className={`pb-2 border-b-2 font-medium transition-colors ${
                activeTab === 'coupons' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Coupons ({categoryCoupons.length})
            </button>
            <button
              onClick={() => setActiveTab('stores')}
              className={`pb-2 border-b-2 font-medium transition-colors ${
                activeTab === 'stores' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Stores ({categoryStores.length})
            </button>
          </div>
        </div>
      </section>

      {/* Filters & Controls */}
      {activeTab === 'coupons' && (
        <section className="py-6 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
              <h2 className="text-xl font-semibold">
                {filteredAndSortedCoupons.length} coupons available
              </h2>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* Filter by store */}
                <select
                  value={filterStore}
                  onChange={(e) => setFilterStore(e.target.value)}
                  className="px-4 py-2 border border-input bg-background rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All Stores</option>
                  {categoryStores.map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.name}
                    </option>
                  ))}
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
      )}

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {activeTab === 'coupons' ? (
            <>
              {couponsLoading && <LoadingSpinner />}
              {couponsError && <ErrorMessage error={couponsError} onRetry={refetchCoupons} />}
              {!couponsLoading && !couponsError && (
                filteredAndSortedCoupons.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🎫</div>
                    <h3 className="text-2xl font-bold mb-2">No coupons found</h3>
                    <p className="text-muted-foreground mb-6">
                      Can't find what you're looking for? Browse all our partner stores or use our search feature to find exactly what you need
                    </p>
                    <Link
                      to="/stores"
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-hover transition-colors"
                    >
                      View All Stores
                    </Link>
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
            </>
          ) : (
            <>
              {storesLoading && <LoadingSpinner />}
              {!storesLoading && (
                categoryStores.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🏪</div>
                    <h3 className="text-2xl font-bold mb-2">No stores found</h3>
                    <p className="text-muted-foreground">
                      We're working on adding more stores in this category
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categoryStores.map((store) => (
                      <StoreCard key={store.id} store={store} />
                    ))}
                  </div>
                )
              )}
            </>
          )}
        </div>
      </section>
      <CouponDetailModal coupon={selectedCoupon} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default CategoryPage;