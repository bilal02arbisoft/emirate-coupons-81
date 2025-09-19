import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, ShoppingBag, Users, Award } from 'lucide-react';
import { useStores } from '../hooks/useAPI';

const StoresHeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // API data
  const { data: stores = [], isLoading: storesLoading } = useStores();
  
  // Get featured stores (top rated with most coupons)
  const featuredStores = React.useMemo(() => {
    return stores
      .filter(store => store.rating >= 4.2 && store.total_coupons >= 25)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
  }, [stores]);
  
  const totalSlides = featuredStores.length;

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000);
    
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

  if (storesLoading) {
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
          <h2 className="text-2xl font-bold mb-2">No Featured Stores</h2>
          <p className="text-white/80">Check back soon for amazing stores!</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-72 md:h-80 lg:h-96 rounded-2xl overflow-x-auto group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Carousel Container */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {featuredStores.map((store, index) => {
          return (
            <div
              key={store.id}
              className="w-full flex-shrink-0 relative bg-gradient-hero"
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 pattern-dots"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-2 sm:px-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-center">
                    {/* Left Side - Content */}
                    <div className="text-white space-y-3 lg:space-y-5">
                      <div className="flex items-center space-x-2 lg:space-x-3">
                        <img
                          src={store.logo}
                          alt={store.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-white p-1.5 shadow-lg"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(store.name)}&background=f1f5f9&color=64748b`;
                          }}
                        />
                        <div>
                          <h3 className="text-sm sm:text-base md:text-lg font-semibold">{store.name}</h3>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                            <span className="text-xs sm:text-sm font-medium">{store.rating}</span>
                            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                            <span className="text-xs sm:text-sm text-white/80">Est. {store.established_year}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs sm:text-sm md:text-base text-white/90 mb-2 md:mb-3 line-clamp-3">
                          {store.description}
                        </p>
                      </div>

                      <div className="hidden sm:grid grid-cols-3 gap-2 text-center">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                          <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1" />
                          <div className="font-bold text-base sm:text-lg">{store.total_coupons}</div>
                          <div className="text-xs text-white/80">Active Deals</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                          <Star className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-yellow-400 fill-current" />
                          <div className="font-bold text-base sm:text-lg">{store.rating}</div>
                          <div className="text-xs text-white/80">Rating</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                          <Award className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1" />
                          <div className="font-bold text-base sm:text-lg">UAE</div>
                          <div className="text-xs text-white/80">Trusted</div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <a
                          href={store?.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-white text-primary font-semibold rounded-xl hover:bg-white/95 transition-all duration-300 transform hover:scale-105 shadow-lg text-xs sm:text-sm md:text-base"
                        >
                          <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1.5 sm:mr-2" />
                          View Store Deals
                        </a>
                        <a
                          href={store.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 backdrop-blur-sm text-xs sm:text-sm md:text-base"
                        >
                          <Users className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1.5 sm:mr-2" />
                          Visit Website
                        </a>
                      </div>

                      {/* Store Features */}
                      <div className="flex flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm text-white/80">
                        <span className="bg-white/10 px-1.5 py-0.5 rounded-full border border-white/20">
                          {store.return_policy}
                        </span>
                        <span className="bg-white/10 px-1.5 py-0.5 rounded-full border border-white/20">
                          {store.shipping_info}
                        </span>
                      </div>
                    </div>

                    {/* Right Side - Visual Element */}
                    <div className="hidden lg:flex justify-center">
                      <div className="relative">
                        <div className="w-64 h-52 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center p-4">
                          <div className="text-center text-white mb-3">
                            <div className="text-4xl font-bold mb-1">
                              {store.total_coupons}+
                            </div>
                            <div className="text-lg font-semibold">
                              EXCLUSIVE DEALS
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-1 w-full">
                            {store.categories.slice(0, 3).map((category, idx) => (
                              <div key={idx} className="bg-white/30 rounded-lg p-1 text-center">
                                <div className="text-xs font-medium capitalize text-white">{category}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Floating trust badge */}
                        <div className="absolute -top-3 -right-3 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold animate-bounce-in flex items-center space-x-1">
                          <Star className="w-2 h-2 fill-current" />
                          <span>Verified</span>
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
        {featuredStores.map((_, index) => (
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
              width: `${((Date.now() % 6000) / 6000) * 100}%`,
              animation: isAutoPlaying ? 'progress 6s linear infinite' : 'none'
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default StoresHeroCarousel;