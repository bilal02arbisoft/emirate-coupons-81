import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Grid, List, X } from 'lucide-react';
import CouponCard from '../components/CouponCard';
import CouponDetailModal from '../components/CouponDetailModal';
import StoreCard from '../components/StoreCard';
import { useCoupons, useStores, useCategories, useSearchCoupons } from '../hooks/useAPI';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [activeTab, setActiveTab] = useState('stores');
  const [sortBy, setSortBy] = useState('relevance');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStore, setFilterStore] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCouponClick = (coupon) => { setSelectedCoupon(coupon); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setSelectedCoupon(null); };

  // API hooks
  const { data: allCoupons, isLoading: couponsLoading, error: couponsError } = useCoupons();
  const { data: allStores, isLoading: storesLoading, error: storesError } = useStores();
  const { data: allCategories, isLoading: categoriesLoading, error: categoriesError } = useCategories();
  const { data: searchCouponsData, isLoading: searchLoading, error: searchError } = useSearchCoupons(query);

  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery && urlQuery !== query) {
      setQuery(urlQuery);
    }
  }, [searchParams]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return { coupons: [], stores: [] };

    const coupons = searchCouponsData || [];
    const storeResults = (allStores || []).filter(store =>
      store.name.toLowerCase().includes(query.toLowerCase()) ||
      store.description.toLowerCase().includes(query.toLowerCase()) ||
      store.categories.some(cat => cat.toLowerCase().includes(query.toLowerCase()))
    );

    return { coupons, stores: storeResults };
  }, [query, searchCouponsData, allStores]);

  const filteredResults = useMemo(() => {
    let filteredCoupons = searchResults.coupons || [];

    // Filter by category
    if (filterCategory !== 'all') {
      filteredCoupons = filteredCoupons.filter(coupon =>
        coupon.categories.includes(filterCategory)
      );
    }

    // Filter by store
    if (filterStore !== 'all') {
      filteredCoupons = filteredCoupons.filter(coupon =>
        coupon.store_id === filterStore
      );
    }

    // Sort results
    switch (sortBy) {
      case 'relevance':
        // Keep default order (most relevant first)
        break;
      case 'discount':
        filteredCoupons.sort((a, b) => b.discount_value - a.discount_value);
        break;
      case 'expiry':
        filteredCoupons.sort((a, b) => new Date(a.expiry_date) - new Date(b.expiry_date));
        break;
      case 'popular':
        filteredCoupons.sort((a, b) => b.usage_count - a.usage_count);
        break;
      default:
        break;
    }

    return { coupons: filteredCoupons, stores: searchResults.stores };
  }, [searchResults, filterCategory, filterStore, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query });
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSearchParams({});
    setFilterCategory('all');
    setFilterStore('all');
  };

  const storesInResults = (allStores || []).filter(store =>
    filteredResults.coupons.some(coupon => coupon.store_id === store.id)
  );

  return (
    <div className="min-h-screen">
      {/* Search Header */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search for coupons, stores, or categories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 border border-input bg-background rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </form>

          {query && (
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">
                Search results for "{query}"
              </h1>
              <p className="text-muted-foreground">
                Found {filteredResults.coupons.length} coupons and {filteredResults.stores.length} stores
              </p>
            </div>
          )}
        </div>
      </section>

      {/* No Query State */}
      {!query.trim() && (
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="text-6xl mb-6">🔍</div>
            <h2 className="text-3xl font-bold mb-4">What are you looking for?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Search for your favorite stores, products, or browse through our categories to find the best deals
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
              {(allCategories || []).map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setQuery(category.name);
                    setSearchParams({ q: category.name });
                  }}
                  className="p-6 border border-input rounded-lg hover:border-primary hover:text-primary transition-colors text-center"
                >
                  <div className="mb-3">
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="w-10 h-10 md:w-12 md:h-12 mx-auto object-contain"
                    />
                  </div>
                  <div className="text-sm md:text-base font-medium">{category.name}</div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      {query.trim() && (
        <>
          {/* Navigation Tabs */}
          <section className="py-6 border-b">
            <div className="container mx-auto px-4">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('stores')}
                  className={`pb-2 border-b-2 font-medium transition-colors ${
                    activeTab === 'stores'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Stores ({filteredResults.stores.length})
                </button>
                <button
                  onClick={() => setActiveTab('coupons')}
                  className={`pb-2 border-b-2 font-medium transition-colors ${
                    activeTab === 'coupons'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Coupons ({filteredResults.coupons.length})
                </button>
              </div>
            </div>
          </section>

          {/* Filters & Controls */}
          {activeTab === 'coupons' && (
            <section className="py-6 border-b">
              <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Filters:</span>
                    {(filterCategory !== 'all' || filterStore !== 'all') && (
                      <button
                        onClick={() => {
                          setFilterCategory('all');
                          setFilterStore('all');
                        }}
                        className="text-sm text-primary hover:text-primary-hover"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Category Filter */}
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="px-4 py-2 border border-input bg-background rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="all">All Categories</option>
                      {(allCategories || []).map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>

                    {/* Store Filter */}
                    <select
                      value={filterStore}
                      onChange={(e) => setFilterStore(e.target.value)}
                      className="px-4 py-2 border border-input bg-background rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="all">All Stores</option>
                      {storesInResults.map((store) => (
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
                      <option value="relevance">Most Relevant</option>
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

          {/* Results Content */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              {activeTab === 'coupons' ? (
                filteredResults.coupons.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">😔</div>
                    <h3 className="text-2xl font-bold mb-2">No coupons found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your search or filters
                    </p>
                    <button
                      onClick={clearSearch}
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-hover transition-colors"
                    >
                      Clear Search
                    </button>
                  </div>
                ) : (
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                      : 'grid-cols-1'
                  }`}>
                    {filteredResults.coupons.map((coupon) => (
                      <CouponCard 
                        key={coupon.id} 
                        coupon={coupon}
                        compact={viewMode === 'list'}
                        onCouponClick={handleCouponClick}
                      />
                    ))
                    }
                  </div>
                )
              ) : (
                filteredResults.stores.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🏪</div>
                    <h3 className="text-2xl font-bold mb-2">No stores found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try a different search term
                    </p>
                    <button
                      onClick={clearSearch}
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-hover transition-colors"
                    >
                      Clear Search
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredResults.stores.map((store) => (
                      <StoreCard key={store.id} store={store} />
                    ))}
                  </div>
                )
              )}
            </div>
          </section>
        </>
      )}
      <CouponDetailModal coupon={selectedCoupon} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default SearchPage;
