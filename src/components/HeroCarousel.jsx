import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Clock, Copy, ExternalLink } from 'lucide-react';
import { useCoupons, useStores } from '../hooks/useAPI';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [copiedCode, setCopiedCode] = useState(null);
  
  // API data
  const { data: allCoupons = [], isLoading: couponsLoading } = useCoupons();
  const { data: stores = [] } = useStores();
  
  // Get one coupon per store (max 6) for homepage carousel
  const featuredCoupons = React.useMemo(() => {
    const storeMap = new Map();
    const result = [];
    
    // Group coupons by store and pick the best one per store
    allCoupons.forEach(coupon => {
      if (result.length >= 6) return;
      
      if (!storeMap.has(coupon.store_id)) {
        storeMap.set(coupon.store_id, true);
        result.push(coupon);
      }
    });
    
    return result;
  }, [allCoupons]);
  
  const totalSlides = featuredCoupons.length;

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [totalSlides, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const copyCode = (code, couponId) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(couponId);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getStore = (storeId) => stores.find(store => store.id === storeId);

  const formatTimeLeft = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffInHours = Math.floor((expiry - now) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return `${diffInHours}h left`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d left`;
    return 'Limited time';
  };

  const getDealBadge = (dealType) => {
    const badges = {
      hot: { text: 'Hot Deal', class: 'deal-badge-hot' },
      new: { text: 'New', class: 'deal-badge-new' },
      exclusive: { text: 'Exclusive', class: 'deal-badge-exclusive' },
      verified: { text: 'Verified', class: 'deal-badge-verified' }
    };
    
    return badges[dealType] || badges.verified;
  };

  if (couponsLoading) {
    return (
      <div className="w-full h-80 md:h-96 lg:h-[450px] bg-gradient-hero rounded-2xl flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  if (totalSlides === 0) {
    return (
      <div className="w-full h-80 md:h-96 lg:h-[450px] bg-gradient-hero rounded-2xl flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-2">No Featured Deals</h2>
          <p className="text-white/80">Check back soon for amazing offers!</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-80 md:h-96 lg:h-[450px] rounded-2xl overflow-hidden group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Carousel Container */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {featuredCoupons.map((coupon, index) => {
          const store = getStore(coupon.store_id);
          const badge = getDealBadge(coupon.deal_type);
          
          return (
            <div
              key={coupon.id}
              className="w-full flex-shrink-0 relative bg-gradient-hero"
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 pattern-dots"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                    {/* Left Side - Content */}
                    <div className="text-white space-y-4 lg:space-y-6">
                      <div className="flex items-center space-x-3 lg:space-x-4">
                        <img 
                          src={store?.logo} 
                          alt={store?.name}
                          className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-white p-2 shadow-lg"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(store?.name || 'Store')}&background=f1f5f9&color=64748b`;
                          }}
                        />
                        <div>
                          <h3 className="text-base md:text-lg font-semibold">{store?.name}</h3>
                          <div className="flex items-center space-x-2">
                            <span className={badge.class}>{badge.text}</span>
                            <CheckCircle className="w-4 h-4 text-success" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-shadow">
                          {coupon.title}
                        </h1>
                        <p className="text-sm md:text-base lg:text-lg text-white/90 mb-3 lg:mb-4">
                          Save up to {coupon.currency} {coupon.discount_type === 'percentage' ? `${coupon.discount_value}%` : coupon.discount_value} 
                          {coupon.minimum_order > 0 && ` on orders above ${coupon.currency} ${coupon.minimum_order}`}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3 lg:gap-4 text-xs md:text-sm text-white/80">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatTimeLeft(coupon.expiry_date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4" />
                          <span>{Math.round(coupon.success_rate * 100)}% Success</span>
                        </div>
                        <div>
                          <span>{coupon.usage_count.toLocaleString()} used</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => copyCode(coupon.code, coupon.id)}
                          className="flex items-center justify-center px-4 py-2 md:px-6 md:py-3 bg-white text-primary font-semibold rounded-xl hover:bg-white/95 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base"
                        >
                          {copiedCode === coupon.id ? (
                            <>
                              <CheckCircle className="w-5 h-5 mr-2 text-success" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                              Copy {coupon.code}
                            </>
                          )}
                        </button>
                        <button className="flex items-center justify-center px-4 py-2 md:px-6 md:py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 backdrop-blur-sm text-sm md:text-base">
                          <ExternalLink className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                          Shop Now
                        </button>
                      </div>
                    </div>

                    {/* Right Side - Visual Element */}
                    <div className="hidden lg:flex justify-center">
                      <div className="relative">
                        <div className="w-80 h-64 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="text-6xl font-bold mb-2">
                              {coupon.discount_type === 'percentage' ? `${coupon.discount_value}%` : `${coupon.discount_value}`}
                            </div>
                            <div className="text-xl font-semibold">
                              {coupon.discount_type === 'percentage' ? 'OFF' : 'AED OFF'}
                            </div>
                            {coupon.discount_type === 'free_shipping' && (
                              <div className="text-lg mt-2">FREE SHIPPING</div>
                            )}
                          </div>
                        </div>
                        {/* Floating savings indicator */}
                        {coupon.original_price && coupon.discounted_price && (
                          <div className="absolute -top-4 -right-4 bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-semibold animate-bounce-in">
                            Save {coupon.currency} {(coupon.original_price - coupon.discounted_price).toFixed(0)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Progress Dots */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {featuredCoupons.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Auto-play Progress Bar */}
      {isAutoPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div 
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{ 
              width: `${((Date.now() % 5000) / 5000) * 100}%`,
              animation: isAutoPlaying ? 'progress 5s linear infinite' : 'none'
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default HeroCarousel;