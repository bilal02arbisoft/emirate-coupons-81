import React, { useState } from 'react';
import { X, Copy, ExternalLink, CheckCircle, Star, Users, Tag } from 'lucide-react';
import { useStore } from '../hooks/useAPI';

const CouponDetailModal = ({ coupon, isOpen, onClose }) => {
  const [copiedCode, setCopiedCode] = useState(false);

  const hasCode = !!coupon?.code;

  // Fetch store data from API
  const { data: store } = useStore(coupon?.store_id);

  if (!isOpen || !coupon) return null;

  const copyCode = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-background rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div 
          className="relative p-6 text-white rounded-t-2xl"
          style={{
            background: 'linear-gradient(135deg, #FF6B35 0%, #8B5CF6 100%)'
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-4 mb-4">
            <img 
              src={store?.logo} 
              alt={store?.name}
              className="w-16 h-16 rounded-xl bg-white p-2"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(store?.name || 'Store')}&background=f1f5f9&color=64748b`;
              }}
            />
            <div>
              <h3 className="text-lg font-semibold">{store?.name}</h3>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Verified Store</span>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-2">{coupon.title}</h2>
          <div className="text-4xl font-bold mb-2">{getDiscountDisplay()}</div>

          {coupon.minimum_order > 0 && (
            <p className="text-white/90">
              On orders above {coupon.currency} {coupon.minimum_order}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-muted/30 rounded-xl">
              <Star className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
              <div className="font-semibold text-sm">{Math.round(coupon.success_rate * 100)}% Success</div>
            </div>
            <div className="p-4 bg-muted/30 rounded-xl">
              <Users className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <div className="font-semibold text-sm">{coupon.usage_count.toLocaleString()} Used</div>
            </div>
          </div>

          {/* Coupon Code or Offer Message */}
          {hasCode ? (
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">Coupon Code</div>
              <div className="flex items-center justify-center space-x-3">
                <div className="px-6 py-3 bg-muted rounded-xl font-mono text-xl font-bold tracking-wider">
                  {coupon.code}
                </div>
                <button
                  onClick={copyCode}
                  className="flex items-center px-4 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
                >
                  {copiedCode ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 mr-2" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">Special Offer</div>
              <div className="px-6 py-3 bg-muted rounded-xl text-lg font-semibold">
                This is a special offer - no code required! Just visit the store to redeem.
              </div>
            </div>
          )}

          {/* Categories */}
          {coupon.categories && coupon.categories.length > 0 && (
            <div>
              <div className="text-sm font-semibold mb-2">Categories</div>
              <div className="flex flex-wrap gap-2">
                {coupon.categories.map((category, index) => (
                  <span key={index} className="px-3 py-1 bg-muted rounded-full text-sm flex items-center">
                    <Tag className="w-3 h-3 mr-1" />
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Terms */}
          {coupon.terms_conditions && (
            <div>
              <div className="text-sm font-semibold mb-2">Terms & Conditions</div>
              <div className="text-sm text-muted-foreground">
                {coupon.terms_conditions}
              </div>
            </div>
          )}

          {/* Usage Instructions */}
          {coupon.usage_instructions && (
            <div>
              <div className="text-sm font-semibold mb-2">How to Use</div>
              <div className="text-sm text-muted-foreground">
                {coupon.usage_instructions}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {hasCode ? (
              <button
                onClick={copyCode}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-semibold"
              >
                {copiedCode ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Code Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 mr-2" />
                    Copy & Shop Now
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => window.open(store?.website_url, '_blank', 'noopener,noreferrer')}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-semibold"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Redeem Offer
              </button>
            )}
            <a
              href={store?.website_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center px-6 py-3 border border-border rounded-xl hover:bg-muted transition-colors"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Visit Store
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponDetailModal;