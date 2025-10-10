import React, { useState, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Percent } from 'lucide-react';
import { useStores, useCoupons, useCategories } from '../hooks/useAPI';

const Header = () => {
  const navigate = useNavigate();
  const { data: stores = [] } = useStores();
  const { data: coupons = [] } = useCoupons();
  const { data: categories = [] } = useCategories();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const lowerQuery = searchQuery.toLowerCase();

    const storeSuggestions = stores
      .filter(store => store.name.toLowerCase().includes(lowerQuery))
      .slice(0, 3)
      .map(store => ({
        type: 'store',
        name: store.name,
        id: store.id,
        route: `/store/${store.id}`
      }));

    const categorySuggestions = categories
      .filter(cat => cat.name.toLowerCase().includes(lowerQuery))
      .slice(0, 3)
      .map(cat => ({
        type: 'category',
        name: cat.name,
        id: cat.id,
        route: `/category/${cat.id}`
      }));

    const couponSuggestions = coupons
      .filter(coupon =>
        coupon.title.toLowerCase().includes(lowerQuery) ||
        coupon.code.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 3)
      .map(coupon => ({
        type: 'coupon',
        name: `${coupon.title.substring(0, 30)}${coupon.title.length > 30 ? '...' : ''} (${coupon.code})`,
        id: coupon.id,
        route: `/store/${coupon.store_id}`
      }));

    return [...storeSuggestions, ...categorySuggestions, ...couponSuggestions];
  }, [searchQuery, stores, categories, coupons]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (route) => {
    setShowSuggestions(false);
    setSearchQuery('');
    navigate(route);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // For now, navigate to first suggestion or could create search page
      if (suggestions.length > 0) {
        navigate(suggestions[0].route);
      }
      setShowSuggestions(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg gradient-primary">
              <Percent className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent whitespace-nowrap">
              Discount-Code
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link
              to="/stores"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/stores') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Stores
            </Link>
            <Link
              to="/categories"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/categories') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Categories
            </Link>
            <Link
              to="/deals"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/deals') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Hot Deals
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-sm xl:max-w-md mx-4 xl:mx-8 relative">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search coupons, stores, or categories..."
                value={searchQuery}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setShowSuggestions(false);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>
            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-input rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={`${suggestion.type}-${suggestion.id}-${index}`}
                    onClick={() => handleSuggestionClick(suggestion.route)}
                    className="w-full px-4 py-3 text-left hover:bg-muted flex items-center space-x-3 border-b border-input last:border-b-0"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium">{suggestion.name}</div>
                      <div className="text-xs text-muted-foreground capitalize">{suggestion.type}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop CTA */}


          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground flex-shrink-0"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-4 relative">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search coupons, stores, or categories..."
              value={searchQuery}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setShowSuggestions(false);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>
          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="mt-2 bg-background border border-input rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={`${suggestion.type}-${suggestion.id}-${index}`}
                  onClick={() => handleSuggestionClick(suggestion.route)}
                  className="w-full px-4 py-3 text-left hover:bg-muted flex items-center space-x-3 border-b border-input last:border-b-0"
                >
                  <div className="flex-1">
                    <div className="text-sm font-medium">{suggestion.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">{suggestion.type}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-background/95 backdrop-blur">
            <nav className="py-4 space-y-4">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/') ? 'text-primary bg-primary-light' : 'text-muted-foreground'
                }`}
              >
                Home
              </Link>
              <Link
                to="/stores"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/stores') ? 'text-primary bg-primary-light' : 'text-muted-foreground'
                }`}
              >
                Stores
              </Link>
              <Link
                to="/categories"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/categories') ? 'text-primary bg-primary-light' : 'text-muted-foreground'
                }`}
              >
                Categories
              </Link>
              <Link
                to="/deals"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/deals') ? 'text-primary bg-primary-light' : 'text-muted-foreground'
                }`}
              >
                Hot Deals
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;