import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useCategories, useStores, useCouponsByCategory } from '../hooks/useAPI';

const CategoriesPage = () => {
  // API data fetching
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError, refetch: refetchCategories } = useCategories();
  const { data: stores = [], isLoading: storesLoading } = useStores();
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-hero text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Shop by Category
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Discover amazing deals across all your favorite product categories. 
            From fashion to electronics, we've got you covered!
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {categoriesLoading && <LoadingSpinner />}
          {categoriesError && <ErrorMessage error={categoriesError} onRetry={refetchCategories} />}
          {categories.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => {
                const categoryStores = stores.filter(store => 
                  store.categories.some(cat => cat.toLowerCase().includes(category.name.toLowerCase()) || cat === category.id)
                );
                
                return (
                  <Link 
                    key={category.id}
                    to={`/category/${category.id}`}
                    className="group block"
                  >
                    <div className="coupon-card p-8 text-center h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                      <div className="mb-6">
                        <img 
                          src={category.icon} 
                          alt={category.name}
                          className="w-16 h-16 md:w-20 md:h-20 mx-auto object-contain"
                        />
                      </div>
                      <h3 className="font-bold text-2xl mb-3 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {category.description}
                      </p>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center justify-center text-primary">
                          <span className="font-semibold">{categoryStores.length} stores</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center text-primary font-medium">
                        <span>Browse deals</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>

                      {/* Sample stores preview */}
                      <div className="mt-6 pt-6 border-t">
                        <p className="text-xs text-muted-foreground mb-3">Popular stores:</p>
                        <div className="flex justify-center space-x-2">
                          {categoryStores.slice(0, 3).map((store) => (
                            <img
                              key={store.id}
                              src={store.logo}
                              alt={store.name}
                              className="w-8 h-8 rounded object-cover"
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(store.name)}&background=f1f5f9&color=64748b&size=32`;
                              }}
                            />
                          ))}
                          {categoryStores.length > 3 && (
                            <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground font-medium">
                              +{categoryStores.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Browse all our partner stores or use our search feature to find exactly what you need
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/stores"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-hover transition-colors"
            >
              View All Stores
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoriesPage;