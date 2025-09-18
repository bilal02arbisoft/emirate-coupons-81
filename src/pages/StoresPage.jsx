import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import StoreCard from '../components/StoreCard';
import StoresHeroCarousel from '../components/StoresHeroCarousel';
import LoadingSpinner from '../components/LoadingSpinner';
import { useStores, useCategories } from '../hooks/useAPI';

const StoresPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');

  // Fetch data from API
  const { data: storesData, isLoading: storesLoading, error: storesError } = useStores();
  const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useCategories();

  // Debug logging
  console.log('StoresPage Debug:', {
    storesData,
    storesLoading,
    storesError,
    categoriesData,
    categoriesLoading,
    categoriesError,
    storesCount: storesData?.length || 0,
    categoriesCount: categoriesData?.length || 0
  });

  // Detailed data structure logging
  if (storesData && storesData.length > 0) {
    console.log('Sample Store Data Structure:', {
      firstStore: storesData[0],
      firstStoreCategories: storesData[0]?.categories,
      firstStoreCategoriesType: typeof storesData[0]?.categories,
      firstStoreCategoriesLength: storesData[0]?.categories?.length
    });

    // Log all unique categories from stores
    const allStoreCategories = storesData.flatMap(store => store.categories || []);
    const uniqueStoreCategories = [...new Set(allStoreCategories)];
    console.log('All unique categories from stores:', uniqueStoreCategories);
  }

  if (categoriesData && categoriesData.length > 0) {
    console.log('Sample Category Data Structure:', {
      firstCategory: categoriesData[0],
      firstCategoryId: categoriesData[0]?.id,
      firstCategoryIdType: typeof categoriesData[0]?.id
    });

    // Log all category IDs
    const allCategoryIds = categoriesData.map(cat => cat.id);
    console.log('All category IDs from API:', allCategoryIds);
  }

  // Set data variables
  const stores = storesData || [];
  const categories = categoriesData || [];

  // Create a mapping from category names to IDs for normalization
  const categoryNameToIdMap = categories.reduce((map, category) => {
    map[category.name] = category.id;
    return map;
  }, {});

  // Normalize store categories to match category IDs
  const normalizedStores = stores.map(store => ({
    ...store,
    categories: store.categories?.map(categoryName => {
      // Try to find exact match first
      if (categoryNameToIdMap[categoryName]) {
        return categoryNameToIdMap[categoryName];
      }

      // Fallback: normalize common patterns
      const normalized = categoryName
        .toLowerCase()
        .replace(/\s*&\s*/g, '_') // Replace " & " with "_"
        .replace(/\s+/g, '_') // Replace spaces with "_"
        .replace(/[^a-z0-9_]/g, ''); // Remove special characters

      return normalized;
    }) || []
  }));

  console.log('Category normalization map:', categoryNameToIdMap);
  console.log('Sample normalized store categories:', normalizedStores[0]?.categories);

  const filteredAndSortedStores = useMemo(() => {
    console.log('useMemo Debug:', {
      stores: normalizedStores,
      storesLength: normalizedStores?.length,
      searchQuery,
      selectedCategory,
      sortBy
    });

    let filtered = normalizedStores;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(store =>
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      console.log('Filtering by category:', selectedCategory);
      console.log('Before category filter:', filtered.length, 'stores');

      filtered = filtered.filter(store => {
        const hasCategory = store.categories && store.categories.includes(selectedCategory);
        if (!hasCategory) {
          console.log('Store', store.name, 'does not have category', selectedCategory, '- categories:', store.categories);
        }
        return hasCategory;
      });

      console.log('After category filter:', filtered.length, 'stores');
    }

    // Sort stores
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.total_coupons - a.total_coupons);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    console.log('Filtered stores result:', filtered);
    return filtered;
  }, [normalizedStores, searchQuery, selectedCategory, sortBy]);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle loading and error states
  if (storesLoading || categoriesLoading) {
    return <LoadingSpinner />;
  }

  if (storesError || categoriesError) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-2xl font-bold mb-2">Error loading data</h3>
        <p className="text-muted-foreground">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <StoresHeroCarousel />
        </div>
      </section>

      {/* Header */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            All Partner Stores
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through {normalizedStores.length}+ trusted partners and discover exclusive deals from your favorite brands
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search stores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-input bg-background rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-input bg-background rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name A-Z</option>
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

      {/* Results */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              {filteredAndSortedStores.length} stores found
            </p>
          </div>

          {filteredAndSortedStores.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No stores found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-hover transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredAndSortedStores.map((store) => (
                <StoreCard 
                  key={store.id} 
                  store={store}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default StoresPage;