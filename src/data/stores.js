// UAE-focused stores data for coupon aggregator
import electronicsIcon from '../assets/electronics-icon.png';
import fashionIcon from '../assets/fashion-icon.png';
import foodIcon from '../assets/food-icon.png';
import homeIcon from '../assets/home-icon.png';
import travelIcon from '../assets/travel-icon.png';
import healthIcon from '../assets/health-icon.png';

export const stores = [
  {
    id: "noon",
    name: "Noon.com",
    logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=120&h=120&fit=crop&crop=center",
    description: "The Middle East's leading online shopping destination offering millions of products across electronics, fashion, beauty, home, sports, and more. Shop with confidence knowing you'll get the best deals and fastest delivery across the UAE and Saudi Arabia.",
    website_url: "https://noon.com",
    affiliate_base_url: "https://noon.com",
    rating: 4.5,
    total_coupons: 45,
    categories: ["electronics", "fashion", "home"],
    social_links: {
      instagram: "@noon",
      twitter: "@noon"
    },
    established_year: 2017,
    headquarters: "Dubai, UAE",
    return_policy: "15-day return policy",
    shipping_info: "Free delivery on orders over AED 99"
  },
  {
    id: "amazon-ae",
    name: "Amazon.ae",
    logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=120&h=120&fit=crop&crop=center",
    description: "Your trusted online shopping destination in the UAE. From electronics and books to fashion and home essentials, find everything you need with fast delivery and excellent customer service. Prime members enjoy free shipping and exclusive deals.",
    website_url: "https://amazon.ae",
    affiliate_base_url: "https://amazon.ae",
    rating: 4.3,
    total_coupons: 38,
    categories: ["electronics", "books", "fashion", "home"],
    social_links: {
      instagram: "@amazonae",
      twitter: "@amazonae"
    },
    established_year: 2019,
    headquarters: "Dubai, UAE",
    return_policy: "30-day return policy",
    shipping_info: "Free delivery with Prime"
  },
  {
    id: "carrefour",
    name: "Carrefour UAE",
    logo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=120&h=120&fit=crop&crop=center",
    description: "Your neighborhood hypermarket offering fresh groceries, household essentials, electronics, and more at unbeatable prices. Shop online or visit our stores across the UAE for quality products and convenient shopping experience.",
    website_url: "https://carrefouruae.com",
    affiliate_base_url: "https://carrefouruae.com",
    rating: 4.2,
    total_coupons: 28,
    categories: ["grocery", "home", "electronics"],
    social_links: {
      instagram: "@carrefouruae",
      twitter: "@carrefouruae"
    },
    established_year: 1995,
    headquarters: "Dubai, UAE",
    return_policy: "14-day return policy",
    shipping_info: "Same-day delivery available"
  },
  {
    id: "namshi",
    name: "Namshi",
    logo: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=120&h=120&fit=crop&crop=center",
    description: "The ultimate fashion and lifestyle destination in the Middle East. Discover the latest trends in clothing, shoes, bags, and accessories for men, women, and kids from top international and regional brands.",
    website_url: "https://namshi.com",
    affiliate_base_url: "https://namshi.com",
    rating: 4.4,
    total_coupons: 52,
    categories: ["fashion", "beauty", "accessories"],
    social_links: {
      instagram: "@namshi",
      twitter: "@namshi"
    },
    established_year: 2011,
    headquarters: "Dubai, UAE",
    return_policy: "30-day return policy",
    shipping_info: "Free delivery on orders over AED 200"
  },
  {
    id: "ounass",
    name: "Ounass",
    logo: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=120&h=120&fit=crop&crop=center",
    description: "The ultimate luxury shopping destination in the Middle East. Discover exclusive designer collections from the world's most coveted fashion houses, premium beauty brands, and luxury lifestyle products with personalized styling services.",
    website_url: "https://ounass.ae",
    affiliate_base_url: "https://ounass.ae",
    rating: 4.6,
    total_coupons: 18,
    categories: ["fashion", "beauty", "luxury"],
    social_links: {
      instagram: "@ounass",
      twitter: "@ounass"
    },
    established_year: 2016,
    headquarters: "Dubai, UAE",
    return_policy: "14-day return policy",
    shipping_info: "Free delivery on orders over AED 500"
  },
  {
    id: "sharaf-dg",
    name: "Sharaf DG",
    logo: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=120&h=120&fit=crop&crop=center",
    description: "Your trusted electronics and technology partner in the UAE. From the latest smartphones and laptops to gaming consoles and smart home devices, find cutting-edge technology at competitive prices with expert advice and reliable after-sales service.",
    website_url: "https://sharafdg.com",
    affiliate_base_url: "https://sharafdg.com",
    rating: 4.1,
    total_coupons: 23,
    categories: ["electronics", "technology", "gaming"],
    social_links: {
      instagram: "@sharafdg",
      twitter: "@sharafdg"
    },
    established_year: 2005,
    headquarters: "Dubai, UAE",
    return_policy: "7-day return policy",
    shipping_info: "Free delivery on orders over AED 199"
  },
  {
    id: "talabat",
    name: "Talabat",
    logo: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=120&h=120&fit=crop&crop=center",
    description: "The Middle East's favorite food delivery app bringing you delicious meals from thousands of restaurants. From local favorites to international cuisines, groceries to pharmacy items - all delivered fresh to your doorstep in minutes.",
    website_url: "https://talabat.com",
    affiliate_base_url: "https://talabat.com",
    rating: 4.0,
    total_coupons: 35,
    categories: ["food", "delivery", "restaurants"],
    social_links: {
      instagram: "@talabat_uae",
      twitter: "@talabat_uae"
    },
    established_year: 2004,
    headquarters: "Dubai, UAE",
    return_policy: "Refund on app issues",
    shipping_info: "Fast delivery within 30-45 mins"
  },
  {
    id: "jumia",
    name: "Jumia UAE",
    logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=120&h=120&fit=crop&crop=center",
    description: "Your go-to online marketplace in the UAE for electronics, fashion, mobile phones, and lifestyle products. Discover great deals from trusted sellers with secure payment options and reliable delivery across the Emirates.",
    website_url: "https://jumia.ae",
    affiliate_base_url: "https://jumia.ae",
    rating: 4.2,
    total_coupons: 31,
    categories: ["electronics", "fashion", "mobile"],
    social_links: {
      instagram: "@jumiauae",
      twitter: "@jumiauae"
    },
    established_year: 2013,
    headquarters: "Dubai, UAE",
    return_policy: "15-day return policy",
    shipping_info: "Free delivery on orders over AED 150"
  }
];

// Categories with store mapping
export const categories = [
  {
    id: "electronics",
    name: "Electronics & Gadgets",
    icon: electronicsIcon,
    description: "Smartphones, laptops, gadgets & more",
    store_count: 6
  },
  {
    id: "fashion",
    name: "Fashion & Beauty",
    icon: fashionIcon,
    description: "Clothing, accessories, makeup & skincare",
    store_count: 5
  },
  {
    id: "food",
    name: "Food & Delivery",
    icon: foodIcon,
    description: "Restaurants, groceries & food delivery",
    store_count: 3
  },
  {
    id: "home",
    name: "Home & Garden",
    icon: homeIcon,
    description: "Furniture, decor & household items",
    store_count: 4
  },
  {
    id: "travel",
    name: "Travel & Hotels",
    icon: travelIcon,
    description: "Flights, hotels & travel packages",
    store_count: 2
  },
  {
    id: "health",
    name: "Health & Pharmacy",
    icon: healthIcon,
    description: "Medicines, healthcare & fitness",
    store_count: 1
  }
];