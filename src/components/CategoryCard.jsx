import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CategoryCard = ({ category }) => {
  return (
    <Link 
      to={`/category/${category.id}`}
      className="group block"
    >
      <div className="coupon-card p-6 text-center h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105">
        <div className="mb-4">
          <img 
            src={category.icon} 
            alt={category.name}
            className="w-12 h-12 md:w-16 md:h-16 mx-auto object-contain"
          />
        </div>
        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          {category.description}
        </p>
        <div className="flex items-center justify-center text-primary text-sm font-medium">
          <span>{category.store_count} stores</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;