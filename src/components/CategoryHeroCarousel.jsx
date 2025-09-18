import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Clock, Copy, ExternalLink } from 'lucide-react';
import { useCouponsByCategory, useStores } from '../hooks/useAPI';

const CategoryHeroCarousel = ({ categoryId }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [copiedCode, setCopiedCode] = useState(null);
  
  // API data
  const { data: allCoupons = [], isLoading: couponsLoading } = useCouponsByCategory(categoryId);
  const { data: stores = [] } = useStores();
  
  const categoryCoupons = allCoupons.filter(coupon => coupon.featured);
  const totalSlides = categoryCoupons.length;

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoPlaying || totalSlides === 0) return;
    
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
      <div className="w-full h-80 md:h-96 rounded-2xl bg-gradient-hero flex items-center justify-center mb-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  if (totalSlides === 0) {
    return null; // Don't render if no featured coupons
  }

  return (
    <div 
      className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden group mb-8"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Carousel Container */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {categoryCoupons.map((coupon, index) => {
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                    {/* Left Side - Content */}
                    <div className="text-white space-y-4">
                      <div className="flex items-center space-x-3">
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
                        <p className="text-sm md:text-base lg:text-lg text-white/90 mb-3">
                          Save up to {coupon.currency} {coupon.discount_type === 'percentage' ? `${coupon.discount_value}%` : coupon.discount_value} 
                          {coupon.minimum_order > 0 && ` on orders above ${coupon.currency} ${coupon.minimum_order}`}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-white/80">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatTimeLeft(coupon.expiry_date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4" />
                          <span>{Math.round(coupon.success_rate * 100)}% Success</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => copyCode(coupon.code, coupon.id)}
                          className="flex items-center justify-center px-4 py-2 md:px-6 md:py-3 bg-white text-primary font-semibold rounded-xl hover:bg-white/95 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base"
                        >
                          {copiedCode === coupon.id ? (
                            <>
                              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2 text-success" />
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
                        <div className="w-64 h-48 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="text-5xl font-bold mb-2">
                              {coupon.discount_type === 'percentage' ? `${coupon.discount_value}%` : `${coupon.discount_value}`}
                            </div>
                            <div className="text-lg font-semibold">
                              {coupon.discount_type === 'percentage' ? 'OFF' : 'AED OFF'}
                            </div>
                          </div>
                        </div>
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
      {totalSlides > 1 && (
        <>
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
            {categoryCoupons.map((_, index) => (
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
        </>
      )}

      {/* Auto-play Progress Bar */}
      {isAutoPlaying && totalSlides > 1 && (
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

export default CategoryHeroCarousel;