// Comprehensive coupons data for UAE stores
export const coupons = [
  // Noon.com coupons
  {
    id: "noon-welcome25",
    title: "25% Off First Order + Free Delivery",
    store_id: "noon",
    code: "WELCOME25",
    discount_type: "percentage",
    discount_value: 25,
    original_price: 400,
    discounted_price: 300,
    currency: "AED",
    expiry_date: "2024-12-31T23:59:59Z",
    categories: ["electronics", "fashion", "home"],
    terms_conditions: "Valid on first purchase. Minimum order AED 200. Not valid with other offers.",
    usage_instructions: "1. Add items to cart 2. Enter code WELCOME25 at checkout 3. Enjoy savings!",
    minimum_order: 200,
    maximum_discount: 100,
    verified: true,
    success_rate: 0.95,
    usage_count: 2340,
    user_rating: 4.8,
    featured: true,
    deal_type: "hot",
    applicable_products: ["All products except gift cards"],
    exclusions: ["Gift cards", "Already discounted items"]
  },
  {
    id: "noon-electronics50",
    title: "Up to 50% Off Electronics",
    store_id: "noon",
    code: "TECH50",
    discount_type: "percentage",
    discount_value: 50,
    original_price: 1000,
    discounted_price: 500,
    currency: "AED",
    expiry_date: "2024-11-15T23:59:59Z",
    categories: ["electronics"],
    terms_conditions: "Valid on selected electronics. While stocks last.",
    usage_instructions: "Use code TECH50 on electronics category products",
    minimum_order: 300,
    maximum_discount: 500,
    verified: true,
    success_rate: 0.92,
    usage_count: 1856,
    user_rating: 4.6,
    featured: false,
    deal_type: "new",
    applicable_products: ["Smartphones", "Laptops", "Tablets"],
    exclusions: ["Apple products", "Gaming consoles"]
  },
  
  // Amazon.ae coupons
  {
    id: "amazon-prime20",
    title: "20% Off for Prime Members",
    store_id: "amazon-ae",
    code: "PRIME20",
    discount_type: "percentage",
    discount_value: 20,
    original_price: 250,
    discounted_price: 200,
    currency: "AED",
    expiry_date: "2024-11-30T23:59:59Z",
    categories: ["electronics", "books", "fashion"],
    terms_conditions: "Valid for Prime members only. Limited time offer.",
    usage_instructions: "Code automatically applied for Prime members",
    minimum_order: 100,
    maximum_discount: 200,
    verified: true,
    success_rate: 0.98,
    usage_count: 3245,
    user_rating: 4.9,
    featured: true,
    deal_type: "exclusive",
    applicable_products: ["Prime eligible items"],
    exclusions: ["Digital products", "Subscriptions"]
  },
  {
    id: "amazon-books15",
    title: "15% Off All Books",
    store_id: "amazon-ae",
    code: "BOOKS15",
    discount_type: "percentage",
    discount_value: 15,
    original_price: 150,
    discounted_price: 127.50,
    currency: "AED",
    expiry_date: "2024-12-25T23:59:59Z",
    categories: ["books"],
    terms_conditions: "Valid on physical and digital books",
    usage_instructions: "Enter BOOKS15 at checkout on book purchases",
    minimum_order: 50,
    maximum_discount: 75,
    verified: true,
    success_rate: 0.89,
    usage_count: 892,
    user_rating: 4.4,
    featured: false,
    deal_type: "verified",
    applicable_products: ["Physical books", "E-books", "Audiobooks"],
    exclusions: ["Magazines", "Newspapers"]
  },
  
  // Carrefour coupons
  {
    id: "carrefour-grocery30",
    title: "30% Off Grocery Shopping",
    store_id: "carrefour",
    code: "GROCERY30",
    discount_type: "percentage",
    discount_value: 30,
    original_price: 200,
    discounted_price: 140,
    currency: "AED",
    expiry_date: "2024-11-20T23:59:59Z",
    categories: ["grocery"],
    terms_conditions: "Valid on grocery items. Minimum spend AED 150.",
    usage_instructions: "Shop groceries worth AED 150+ and use code GROCERY30",
    minimum_order: 150,
    maximum_discount: 120,
    verified: true,
    success_rate: 0.94,
    usage_count: 1567,
    user_rating: 4.7,
    featured: true,
    deal_type: "hot",
    applicable_products: ["Fresh produce", "Packaged foods", "Beverages"],
    exclusions: ["Alcohol", "Tobacco", "Baby formula"]
  },
  
  // Namshi coupons
  {
    id: "namshi-fashion40",
    title: "40% Off Fashion & Accessories",
    store_id: "namshi",
    code: "FASHION40",
    discount_type: "percentage",
    discount_value: 40,
    original_price: 300,
    discounted_price: 180,
    currency: "AED",
    expiry_date: "2024-12-15T23:59:59Z",
    categories: ["fashion", "accessories"],
    terms_conditions: "Valid on selected fashion items and accessories",
    usage_instructions: "Browse fashion section and apply FASHION40 at checkout",
    minimum_order: 200,
    maximum_discount: 300,
    verified: true,
    success_rate: 0.91,
    usage_count: 2108,
    user_rating: 4.5,
    featured: true,
    deal_type: "new",
    applicable_products: ["Clothing", "Shoes", "Bags", "Accessories"],
    exclusions: ["Luxury brands", "Sale items"]
  },
  {
    id: "namshi-free-shipping",
    title: "Free Shipping on All Orders",
    store_id: "namshi",
    code: "FREESHIP",
    discount_type: "free_shipping",
    discount_value: 0,
    original_price: 25,
    discounted_price: 0,
    currency: "AED",
    expiry_date: "2024-12-31T23:59:59Z",
    categories: ["fashion", "beauty", "accessories"],
    terms_conditions: "Free shipping on any order value",
    usage_instructions: "Enter FREESHIP at checkout to remove shipping charges",
    minimum_order: 0,
    maximum_discount: 25,
    verified: true,
    success_rate: 0.99,
    usage_count: 4521,
    user_rating: 4.8,
    featured: false,
    deal_type: "verified",
    applicable_products: ["All items"],
    exclusions: ["Express delivery"]
  },
  
  // Ounass coupons
  {
    id: "ounass-luxury20",
    title: "20% Off Luxury Brands",
    store_id: "ounass",
    code: "LUXURY20",
    discount_type: "percentage",
    discount_value: 20,
    original_price: 1500,
    discounted_price: 1200,
    currency: "AED",
    expiry_date: "2024-11-25T23:59:59Z",
    categories: ["luxury", "fashion", "beauty"],
    terms_conditions: "Valid on selected luxury designer brands",
    usage_instructions: "Shop luxury brands and apply LUXURY20 for exclusive discount",
    minimum_order: 500,
    maximum_discount: 1000,
    verified: true,
    success_rate: 0.88,
    usage_count: 634,
    user_rating: 4.9,
    featured: true,
    deal_type: "exclusive",
    applicable_products: ["Designer clothing", "Luxury bags", "Premium beauty"],
    exclusions: ["Limited editions", "Jewelry"]
  },
  
  // Sharaf DG coupons
  {
    id: "sharaf-gaming25",
    title: "25% Off Gaming Gear",
    store_id: "sharaf-dg",
    code: "GAMING25",
    discount_type: "percentage",
    discount_value: 25,
    original_price: 800,
    discounted_price: 600,
    currency: "AED",
    expiry_date: "2024-12-10T23:59:59Z",
    categories: ["gaming", "electronics"],
    terms_conditions: "Valid on gaming consoles, accessories, and games",
    usage_instructions: "Browse gaming section and use GAMING25 at checkout",
    minimum_order: 300,
    maximum_discount: 400,
    verified: true,
    success_rate: 0.93,
    usage_count: 1234,
    user_rating: 4.6,
    featured: false,
    deal_type: "hot",
    applicable_products: ["Gaming consoles", "Controllers", "Games", "Headsets"],
    exclusions: ["Pre-orders", "Digital downloads"]
  },
  
  // Talabat coupons
  {
    id: "talabat-food50",
    title: "50 AED Off Food Orders",
    store_id: "talabat",
    code: "FOOD50",
    discount_type: "fixed",
    discount_value: 50,
    original_price: 150,
    discounted_price: 100,
    currency: "AED",
    expiry_date: "2024-11-18T23:59:59Z",
    categories: ["food", "delivery"],
    terms_conditions: "Valid on food orders above AED 100. Once per user.",
    usage_instructions: "Order food worth AED 100+ and apply FOOD50",
    minimum_order: 100,
    maximum_discount: 50,
    verified: true,
    success_rate: 0.96,
    usage_count: 3876,
    user_rating: 4.7,
    featured: true,
    deal_type: "new",
    applicable_products: ["Restaurant orders", "Groceries"],
    exclusions: ["Delivery charges", "Service fees"]
  },
  {
    id: "talabat-free-delivery",
    title: "Free Delivery on First Order",
    store_id: "talabat",
    code: "FIRSTFREE",
    discount_type: "free_shipping",
    discount_value: 0,
    original_price: 15,
    discounted_price: 0,
    currency: "AED",
    expiry_date: "2024-12-31T23:59:59Z",
    categories: ["food", "delivery"],
    terms_conditions: "Free delivery for new customers on first order",
    usage_instructions: "New users: Enter FIRSTFREE to waive delivery charges",
    minimum_order: 50,
    maximum_discount: 15,
    verified: true,
    success_rate: 0.97,
    usage_count: 2945,
    user_rating: 4.8,
    featured: false,
    deal_type: "verified",
    applicable_products: ["All restaurant orders"],
    exclusions: ["Service charges"]
  },
  
  // Jumia coupons
  {
    id: "jumia-mobile35",
    title: "35% Off Mobile Phones",
    store_id: "jumia",
    code: "MOBILE35",
    discount_type: "percentage",
    discount_value: 35,
    original_price: 2000,
    discounted_price: 1300,
    currency: "AED",
    expiry_date: "2024-11-28T23:59:59Z",
    categories: ["mobile", "electronics"],
    terms_conditions: "Valid on selected smartphone brands and models",
    usage_instructions: "Shop smartphones and apply MOBILE35 for instant savings",
    minimum_order: 500,
    maximum_discount: 700,
    verified: true,
    success_rate: 0.90,
    usage_count: 1456,
    user_rating: 4.4,
    featured: false,
    deal_type: "hot",
    applicable_products: ["Android phones", "Accessories", "Cases"],
    exclusions: ["iPhone", "Refurbished devices"]
  }
];

// Helper functions for filtering coupons
export const getFeaturedCoupons = () => {
  return coupons.filter(coupon => coupon.featured);
};

export const getCouponsByStore = (storeId) => {
  return coupons.filter(coupon => coupon.store_id === storeId);
};

export const getCouponsByCategory = (categoryId) => {
  return coupons.filter(coupon => coupon.categories.includes(categoryId));
};

export const getExpiringCoupons = (days = 7) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() + days);
  
  return coupons.filter(coupon => {
    const expiryDate = new Date(coupon.expiry_date);
    return expiryDate <= cutoffDate;
  });
};

export const searchCoupons = (query) => {
  const lowerQuery = query.toLowerCase();
  return coupons.filter(coupon => 
    coupon.title.toLowerCase().includes(lowerQuery) ||
    coupon.code.toLowerCase().includes(lowerQuery) ||
    coupon.categories.some(cat => cat.toLowerCase().includes(lowerQuery))
  );
};