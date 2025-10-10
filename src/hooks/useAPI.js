// Custom React Query hooks for API data fetching
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

// Categories hooks
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Stores hooks
export const useStores = () => {
  return useQuery({
    queryKey: ['stores'],
    queryFn: api.getStores,
    staleTime: 5 * 60 * 1000,
  });
};

export const useStoresCount = () => {
  return useQuery({
    queryKey: ['stores', 'count'],
    queryFn: api.getStoresCount,
    staleTime: 5 * 60 * 1000,
  });
};

// Coupons hooks
export const useCoupons = () => {
  return useQuery({
    queryKey: ['coupons'],
    queryFn: api.getCoupons,
    staleTime: 2 * 60 * 1000, // 2 minutes for more frequent updates
  });
};

export const useHotCoupons = () => {
  return useQuery({
    queryKey: ['coupons', 'hot'],
    queryFn: api.getHotCoupons,
    staleTime: 2 * 60 * 1000, // 2 minutes for more frequent updates
  });
};

export const useCouponsCount = () => {
  return useQuery({
    queryKey: ['coupons', 'count'],
    queryFn: api.getCouponsCount,
    staleTime: 2 * 60 * 1000,
  });
};

export const useCouponsByStore = (storeId) => {
  return useQuery({
    queryKey: ['coupons', 'store', storeId],
    queryFn: () => api.getCouponsByStore(storeId),
    enabled: !!storeId, // Only fetch if storeId exists
    staleTime: 2 * 60 * 1000,
  });
};

export const useCouponsByCategory = (categoryId) => {
  return useQuery({
    queryKey: ['coupons', 'category', categoryId],
    queryFn: () => api.getCouponsByCategory(categoryId),
    enabled: !!categoryId, // Only fetch if categoryId exists
    staleTime: 2 * 60 * 1000,
  });
};

export const useSearchCoupons = (query) => {
  return useQuery({
    queryKey: ['coupons', 'search', query],
    queryFn: () => api.searchCoupons(query),
    enabled: !!query && query.length > 0, // Only search if query exists
    staleTime: 1 * 60 * 1000, // 1 minute for search results
  });
};

// Banners hooks
export const useBanners = () => {
  return useQuery({
    queryKey: ['banners'],
    queryFn: api.getBanners,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// About hooks
export const useAbout = () => {
  return useQuery({
    queryKey: ['about'],
    queryFn: api.getAbout,
    staleTime: 10 * 60 * 1000, // 10 minutes for static content
  });
};

// Blogs hooks
export const useBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: api.getBlogs,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Helper hooks for featured coupons (filter from all coupons)
export const useFeaturedCoupons = () => {
  return useQuery({
    queryKey: ['coupons', 'featured'],
    queryFn: async () => {
      const coupons = await api.getCoupons();
      return coupons.filter(coupon => coupon.featured);
    },
    staleTime: 2 * 60 * 1000,
  });
};

// Helper hook to find store by ID
export const useStore = (storeId) => {
  const { data: stores, ...rest } = useStores();
  
  const store = stores?.find(store => store.id === storeId);
  
  return {
    ...rest,
    data: store,
  };
};

// Helper hook to find category by ID  
export const useCategory = (categoryId) => {
  const { data: categories, ...rest } = useCategories();
  
  const category = categories?.find(category => category.id === categoryId);
  
  return {
    ...rest,
    data: category,
  };
};