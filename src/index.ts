// Export all components
export { default as CouponCard } from './components/CouponCard';
export { default as CouponDetailModal } from './components/CouponDetailModal';
export { default as StoreCard } from './components/StoreCard';
export { default as Header } from './components/Header';
export { default as Footer } from './components/Footer';
export { default as HeroCarousel } from './components/HeroCarousel';
export { default as CategoryHeroCarousel } from './components/CategoryHeroCarousel';
export { default as StoresHeroCarousel } from './components/StoresHeroCarousel';
export { default as CategoryCard } from './components/CategoryCard';
export { default as LoadingSpinner } from './components/LoadingSpinner';
export { default as ErrorMessage } from './components/ErrorMessage';

// Export hooks
export { useStores, useStore, useCoupons, useCoupon } from './hooks/useAPI';

// Export data (if needed)
export { stores } from './data/stores';
export { coupons } from './data/coupons';

// Export styles
import './index.css';
