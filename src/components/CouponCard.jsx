import React, { useState } from 'react';
import { Clock, Copy, CheckCircle, ExternalLink, Star, Users } from 'lucide-react';
import { useStores } from '../hooks/useAPI';

const CouponCard = ({ coupon, compact = false, onCouponClick }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Fetch stores data from API
  const { data: stores = [] } = useStores();
  const store = stores.find(s => s.id === coupon.store_id);
  
  const copyCode = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };
  
  const formatTimeLeft = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffInHours = Math.floor((expiry - now) / (1000 * 60 * 60));
    
    if (diffInHours < 0) return 'Expired';
    if (diffInHours < 24) return `${diffInHours}h left`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d left`;
    return 'Valid';
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
  
  const getDiscountDisplay = () => {
    if (coupon.discount_type === 'percentage') {
      return `${coupon.discount_value}% OFF`;
    } else if (coupon.discount_type === 'fixed') {
      return `${coupon.currency} ${coupon.discount_value} OFF`;
    } else if (coupon.discount_type === 'free_shipping') {
      return 'FREE SHIPPING';
    }
    return 'SPECIAL OFFER';
  };

  const timeLeft = formatTimeLeft(coupon.expiry_date);
  const isExpiring = timeLeft.includes('h left') || timeLeft.includes('1d left');
  const badge = getDealBadge(coupon.deal_type);

  if (compact) {
    return (
      <div 
        className={`coupon-card p-4 cursor-pointer transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onCouponClick?.(coupon)}
      >
        <div className="flex items-center justify-between mb-3 gap-3">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <img 
              src={store?.logo} 
              alt={store?.name}
              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(store?.name || 'Store')}&background=f1f5f9&color=64748b`;
              }}
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-sm truncate">{coupon.title}</h4>
              <p className="text-xs text-muted-foreground truncate">{store?.name}</p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">

            <div className="text-xs text-muted-foreground whitespace-nowrap">{timeLeft}</div>
          </div>
        </div>
        
        <button
          onClick={(e) => { e.stopPropagation(); copyCode(); }}
          className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
        >
          {copiedCode ? 'Copied!' : `Get Code: ${coupon.code}`}
        </button>
      </div>
    );
  }

  return (
    <div 
      className={`coupon-card p-6 cursor-pointer transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onCouponClick?.(coupon)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4 gap-4">
        <div className="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
          <img 
            src={store?.logo} 
            alt={store?.name}
            className="w-12 h-12 md:w-14 md:h-14 rounded-xl object-cover shadow-md flex-shrink-0"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(store?.name || 'Store')}&background=f1f5f9&color=64748b`;
            }}
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-base md:text-lg mb-1 truncate">{coupon.title}</h3>
            <p className="text-muted-foreground text-xs md:text-sm truncate">{store?.name}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`${badge.class} text-xs`}>{badge.text}</span>
              {coupon.verified && <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-success flex-shrink-0" />}
            </div>
          </div>
        </div>
        
        <div className="text-right flex-shrink-0">
          {isExpiring && (
            <div className="text-xs text-warning font-semibold bg-warning-light px-2 py-1 rounded whitespace-nowrap">
              ⏰ {timeLeft}
            </div>
          )}
        </div>
      </div>

      {/* Savings Display */}
      {coupon.original_price && coupon.discounted_price && (
        <div className="flex items-center space-x-4 mb-4 p-3 bg-success-light rounded-lg">
          <div className="text-sm">
            <span className="text-muted-foreground line-through">{coupon.currency} {coupon.original_price}</span>
            <span className="ml-2 font-semibold text-success">{coupon.currency} {coupon.discounted_price}</span>
          </div>
          <div className="ml-auto">
            <span className="bg-success text-success-foreground px-2 py-1 rounded text-xs font-semibold">
              Save {coupon.currency} {(coupon.original_price - coupon.discounted_price).toFixed(0)}
            </span>
          </div>
        </div>
      )}

      {/* Terms Preview */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {coupon.terms_conditions}
        </p>
        {coupon.minimum_order > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            Minimum order: {coupon.currency} {coupon.minimum_order}
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>{coupon.user_rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>{coupon.usage_count.toLocaleString()} used</span>
          </div>
          <div className="flex items-center space-x-1">
            <CheckCircle className="w-3 h-3 text-success" />
            <span>{Math.round(coupon.success_rate * 100)}% success</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>{timeLeft}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={(e) => { e.stopPropagation(); copyCode(); }}
          className="flex-1 flex items-center justify-center px-4 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary-hover transition-all duration-300 transform hover:scale-105"
        >
          {copiedCode ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Get Code
            </>
          )}
        </button>
        <button onClick={(e) => e.stopPropagation()} className="sm:w-auto px-4 py-3 border border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center">
          <ExternalLink className="w-4 h-4" />
          <span className="ml-2 sm:hidden">Visit Store</span>
        </button>
      </div>

      {/* Success Message */}
      {copiedCode && (
        <div className="mt-3 p-2 bg-success-light text-success text-sm text-center rounded-lg animate-fade-up">
          Code copied! Redirecting to {store?.name}...
        </div>
      )}
    </div>
  );
};

export default CouponCard;