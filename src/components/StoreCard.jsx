import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Tag } from 'lucide-react';

const StoreCard = ({ store }) => {
  return (
    <Link 
      to={`/store/${store.id}`}
      className="group block"
    >
      <div className="coupon-card p-6 h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105">
        <div className="flex items-start justify-between mb-4">
          <img 
            src={store.logo} 
            alt={store.name}
            className="w-18 h-18 md:w-20 md:h-20 rounded-xl object-cover shadow-md"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(store.name)}&background=f1f5f9&color=64748b`;
            }}
          />
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{store.rating}</span>
          </div>
        </div>
        
        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
          {store.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {store.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-primary">
            <Tag className="w-4 h-4" />
            <span className="text-sm font-medium">{store.total_coupons} coupons</span>
          </div>
          
          <div className="flex items-center text-primary text-sm font-medium">
            <span>View deals</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
        
        {/* Categories */}
        <div className="flex flex-wrap gap-1 mt-3">
          {store.categories.slice(0, 3).map((category) => (
            <span 
              key={category}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
            >
              {category}
            </span>
          ))}
          {store.categories.length > 3 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
              +{store.categories.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;