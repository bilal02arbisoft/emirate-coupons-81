// API service layer for coupon aggregator
const API_BASE_URL = 'https://coupon-backend-production-7f41.up.railway.app/api';

// Generic fetch function with error handling
const fetchAPI = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    throw error;
  }
};

// API endpoints
export const api = {
  // Categories
  getCategories: () => fetchAPI('/categories'),
  
  // Stores
  getStores: () => fetchAPI('/stores'),
  getStoresCount: () => fetchAPI('/stores/count'),
  
  // Coupons
  getCoupons: () => fetchAPI('/coupons'),
  getHotCoupons: () => fetchAPI('/coupons/hot'),
  getCouponsCount: () => fetchAPI('/coupons/count'),
  getExpiringCoupons: () => fetchAPI('/coupons/expiring'),
  getCouponsByStore: (storeId) => fetchAPI(`/coupons/store/${storeId}`),
  getCouponsByCategory: (categoryId) => fetchAPI(`/coupons/category/${categoryId}`),
  
  // Search functionality
  searchCoupons: async (query) => {
    // Since there's no search endpoint, we'll fetch all coupons and filter client-side
    const coupons = await fetchAPI('/coupons');
    const lowerQuery = query.toLowerCase();
    return coupons.filter(coupon =>
      coupon.title.toLowerCase().includes(lowerQuery) ||
      coupon.code.toLowerCase().includes(lowerQuery) ||
      coupon.categories.some(cat => cat.toLowerCase().includes(lowerQuery))
    );
  },

  // Banners
  getBanners: () => fetchAPI('/banners'),

  // About
  getAbout: () => fetchAPI('/about'),

  // Blogs
  getBlogs: () => fetchAPI('/blogs'),
  getBlogBySlug: async (slug) => {
    const blogs = await fetchAPI('/blogs');
    return blogs.find(b => b.slug === slug);
  }
};
